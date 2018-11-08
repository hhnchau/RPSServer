var log = require('./log');
var KEY = require('./key');
var room = require('./room');
var storage = require('./storage');
var timer;
var settings = require('./settings');
var db = require('./db');
var io = require('socket.io').listen(process.env.PORT ||settings.listenPort);
log.write("Server", "Server is listening at port "+settings.listenPort+" <-----");

/*
* Start Connection
*/
io.sockets.on("connection", function(socket){
  //Log
  log.write("Server: -----> IP: ", socket.handshake.address + " - ID_Socket: " + socket.id + " <<<-CONNECT->>>");

  //disconnect
  socket.on("disconnect", function(reason){

      //Delete User In Waiting Room
      room.deleteRoom(socket.id, function(){
        //Log
        log.write("Server: -----> IP: ", socket.handshake.address + " - ID_Socket: " + socket.id + " <<<-DISCONNECT->>>");
      });

      //Emit User In battle_room
      storage.getIdSocketInRoom(socket.id, function(idSocket, idDevice, room){
        log.write("Get idSocket In Room: ", idSocket + " - " + idDevice + " - " + room);
          //Emit
        socket.to(idSocket).emit(KEY.DISCONNECT, {"idDevice": idDevice, "room": room });
        /*
        / Update Score
        */
        storage.getIdDeviceFromRoom(idDevice, room, function(idDeviceOther){
          db.updateWinScore(idDevice);
          db.updateLostScore(idDeviceOther);
        });
      });
  });

  /*
  * get General Settings
  */
  socket.on(KEY.SETTINGS, function(params){
    //Check Exist
    db.findIdDevice(params.idDevice, function(exist){
      if (!exist){
        socket.emit(KEY.SETTINGS, {"version":settings.version, "exist":false, "bonus":0, "currentTime":0});
      }else {
        var timestamp = new Date().getTime();

        db.getBonus(params.idDevice, function(bonus){
          db.getInfoMarket(function(infoMarket, err){
            if (err){

              socket.emit(KEY.SERVER_ERROR, "Server dang bao tri");

            }else{

              db.getMessageChat(params.room, "GLOBAL", function(messageChat, err){
                if (err){

                  socket.emit(KEY.SERVER_ERROR, "Server dang bao tri");

                }else {

                  socket.emit(KEY.SETTINGS, {"version":settings.version, "exist":true, "bonus":bonus, "currentTime":timestamp, infoMarket, messageChat});

                }
              });
            }
          });
        });
      }
    });
  });

  /*
  * Register
  */
  socket.on(KEY.REGISTER, function(params){
    db.insertUser(params.idDevice, params.nickName, params.address, function(result){
      if (result) {
        //Ok
        socket.emit(KEY.REGISTER, {"status":settings.RESULT_SUCCESS});
      }else{
        //Fail
        socket.emit(KEY.REGISTER, {"status":settings.RESULT_EXIST});
      }
    });
  });

  /*
  * Message Chat
  */
  socket.on(KEY.MESSAGE_CHAT, function(messageChat){

    //EMIT
    io.sockets.emit(KEY.MESSAGE_CHAT, messageChat);

    db.insertMessageChat(messageChat.idDevice, messageChat.message, messageChat.room);

  });

  /*
  / Update Spinner
  */
  socket.on(KEY.SPIN, function(params){
    db.updateSpinLife(params.idDevice, -1, params.value, function(err){
      if (err) {
        socket.emit(KEY.SPIN, {"status":settings.RESULT_FAIL});
      }else {
        socket.emit(KEY.SPIN, {"status":settings.RESULT_SUCCESS});
      }
    });
  });

  /*
  / Update Buy_Life
  */
  socket.on(KEY.BUY_LIFE, function(params){
    db.updateLife(params.idDevice, params.value, function(err){
      if (err) {
        socket.emit(KEY.BUY_LIFE, {"status":settings.RESULT_FAIL});
      }else {
        socket.emit(KEY.BUY_LIFE, {"status":settings.RESULT_SUCCESS});
      }
    });
  });

  /*
  / Update Buy_Spin
  */
  socket.on(KEY.BUY_SPIN, function(params){
    db.updateSpin(params.idDevice, params.value, function(err){
      if (err) {
        socket.emit(KEY.BUY_SPIN, {"status":settings.RESULT_FAIL});
      }else {
        socket.emit(KEY.BUY_SPIN, {"status":settings.RESULT_SUCCESS});
      }
    });
  });

  /*
  * Get infoGame
  */
  socket.on(KEY.INFO_GAME, function(params){
    db.getInfoGame(params.idDevice, function(infoUser, rankUser, err){
      if (err){
        socket.emit(KEY.INFO_GAME, "Server dang bao tri");
      }else{
        socket.emit(KEY.INFO_GAME, {infoUser, rankUser});
      }
    });
  });

  /*
  * Get infoUser
  */
  socket.on(KEY.INFO_USER, function(params){
    db.getInfoUser(params.idDevice, function(infoUser, err){
      if (err){
        socket.emit(KEY.SERVER_ERROR, "Server dang bao tri");
      }else{
        socket.emit(KEY.INFO_USER, infoUser);
      }
    });
  });

  /*
  *Get rankUser
  */
  socket.on(KEY.RANK_USER, function(params){
    db.getRankUser(function(rankUser, err){
      if (err){
        socket.emit(KEY.SERVER_ERROR, "Server dang bao tri");
      }else{
        socket.emit(KEY.RANK_USER, rankUser);
      }
    });
  });


  /*
  * client goto waiting room params = {id_device}
  */
  socket.on(KEY.ENTER_WAITING_ROOM, function(params){
    ///ENTER WAITING ROOM
      log.write("KEY.ENTER_WAITING_ROOM", "---- On ----");
      room.get(function(user){
        if(!user){
          /*
          /  No user
          */

          //Register in waiting room
          room.add(socket.id, params.idDevice, function(){
                //
                //Start Timer
                //
                  log.write("Server", "Start timer");
                  timer = setInterval(function(){
                  //Stop timer
                  clearInterval(timer);
                  log.write("Server", "Stop timer---->timeout");
                  //Remove yourself from the room
                  room.removeYourselt(function(){
                          //
                          //Get idComputer
                          //
                        db.getComputer(function(computer, err){
                          if (err) {
                            socket.emit(KEY.SERVER_ERROR, "Server dang bao tri");
                          }else{

                            var battle_room = params.idDevice+ "-"+computer[0].idComputer;
                            //
                            //Get Info
                            //
                            db.getInfoUserBattle(params.idDevice, computer[0].idComputer, function(infoUserBattle, err){
                              if (err) {
                                socket.emit(KEY.SERVER_ERROR, "Server dang bao tri");
                              }else {
                                socket.emit(KEY.ENTER_WAITING_ROOM, {"room": battle_room, infoUserBattle});
                              }
                            });
                          }
                        });
                  });
                }, settings.timerWaitingRoom); //Duration Timer
          });
        }else{
          /*
          /  Exist user
          */
          //Remove user in room
          room.remove(user.idSocket, function(){
              //
              //Remove timer
              //
              clearInterval(timer);
              log.write("Server", "getUser------->Stop timer");

              var battle_room = user.idDevice+"-"+params.idDevice;
              //
              //Get Info
              //
              db.getInfoUserBattle(user.idDevice, params.idDevice, function(infoUserBattle, err){
                if (err) {
                  socket.emit(KEY.SERVER_ERROR, "Server dang bao tri");
                }else {

                  //Emit yourselt
                  socket.emit(KEY.ENTER_WAITING_ROOM, {"room": battle_room, infoUserBattle});

                  //Set to socketId
                  socket.to(user.idSocket).emit(KEY.ENTER_WAITING_ROOM, {"room": battle_room, infoUserBattle});
                }
              });
          });
        }
      });
  });//connet)

  //AGAIN
  socket.on(KEY.ENTER_AGAIN, function(params){
    log.write("KEY.PLAY_AGAIN", "---- On ----");
    storage.checkAgain(socket.id, params.idDevice, params.room, function(idSocket, idDevice){
      if (idDevice && idSocket){
        db.getInfoUserBattle(idDevice, params.idDevice, function(infoUserBattle, err){
          if (err) {
            socket.emit(KEY.SERVER_ERROR, "Server dang bao tri");
          }else {

            //Emit yourselt
            socket.emit(KEY.ENTER_WAITING_ROOM, {"room": params.room, infoUserBattle});

            //Set to socketId
            socket.to(idSocket).emit(KEY.ENTER_WAITING_ROOM, {"room": params.room, infoUserBattle});
          }
        });
      }
    });
  });
        //
        //REAL TIME
        //

        socket.on(KEY.JOIN, function(params){
            log.write("KEY.JOIN", "----> On <----");
            //Check computer
            var idDevice = params.room.split("-");
            if (idDevice[1].substring(0, settings.COMPUTER.length) === settings.COMPUTER) {
              //COMPUTER
              socket.emit(KEY.JOIN, params);
            }else {
              //NOT COMPUTER

              socket.join(params.room);

              storage.checkJoin(socket.id, params.idDevice, params.room, function(sender1, sender2){
                if (sender1 && sender2){
                  socket.emit(KEY.JOIN, params);
                  socket.broadcast.to(sender1).emit(KEY.JOIN, params);
                  log.write("KEY.JOIN", "----> Emit <----");
                }else{
                  socket.emit(KEY.JOIN, params);
                  log.write("KEY.JOIN", "----> Error <----");
                }
              });
            }
        });

        //{id_device, room, icon, msg}
        socket.on(KEY.ICON, function(params){
          log.write("KEY.ICON", "----> On <----");
          socket.emit(KEY.ICON, params);
          socket.to(params.room).emit(KEY.ICON, params);
          log.write("KEY.ICON", "----> Emit <----");
        });

        //{id_device, room, rps}
        socket.on(KEY.RPS, function(params){
          log.write("KEY.RPS", "----> On <----");

          socket.emit(KEY.RPS, params);
          socket.to(params.room).emit(KEY.RPS, params);
          log.write("KEY.RPS", "--- Emit Rps ---");

          //Check RPS
          storage.checkRps(params.room, params.value, function(value){
              switch(value){
                case settings.NOTEXIST:
                log.write("KEY.RPS", "Sender2: --- NULL ---");
                  break;
                case settings.WIN:
                log.write("KEY.RPS", "Sender2: --- WIN ---");
                  //Emit FLAG for set Flag
                  storage.checkFlag(params.room, params.idDevice, 0, 1, function(status, position){
                    if (status === settings.FLAG_WIN) {
                      //------WINNER------
                        //Sender2 Win
                        socket.emit(KEY.FLAG, {"idDevice": params.idDevice,"status":settings.WINNER, "position": position});
                        socket.to(params.room).emit(KEY.FLAG, {"idDevice": params.idDevice,"status":settings.WINNER, "position": position});
                        log.write("KEY.FLAG", "--- Emit Sender2 Winner ---");
                        /*
                        / Update Score Sender2 Win
                        */
                        storage.getIdDeviceFromRoom(params.idDevice, params.room, function(idDeviceOther){
                          db.updateWinScore(params.idDevice);
                          db.updateLostScore(idDeviceOther);
                        })
                        //Clear InRoom
                        storage.clearInRoom(params.room);

                    }else {
                      //-----UPDATE FLAG-------
                      socket.emit(KEY.FLAG, {"idDevice": params.idDevice,"status":settings.WIN, "position": position});
                      socket.to(params.room).emit(KEY.FLAG, {"idDevice": params.idDevice,"status":settings.WIN, "position": position});
                      log.write("KEY.FLAG", "--- Emit Sender2 Win ---");
                    }
                  });
                  break;
                case settings.LOST:
                log.write("KEY.RPS", "Sender2: --- LOST ---");
                //Emit FLAG for set Flag
                storage.checkFlag(params.room, params.idDevice, 1, 0, function(status, position){
                  if (status === settings.FLAG_WIN) {
                    //------WINNER------
                      //Sender2 Lost
                      socket.emit(KEY.FLAG, {"idDevice": params.idDevice,"status":settings.LOSER, "position": position});
                      socket.to(params.room).emit(KEY.FLAG, {"idDevice": params.idDevice,"status":settings.LOSER, "position": position});
                      log.write("KEY.FLAG", "--- Emit Sender2 Loser ---");
                      /*
                      / Update Score Loser
                      */
                      storage.getIdDeviceFromRoom(params.idDevice, params.room, function(idDeviceOther){
                        db.updateWinScore(idDeviceOther);
                        db.updateLostScore(params.idDevice);
                      })
                      //Clear InRoom
                      storage.clearInRoom(params.room);

                  }else {
                    //-----UPDATE FLAG-------
                    socket.emit(KEY.FLAG, {"idDevice": params.idDevice,"status":settings.LOST, "position": position});
                    socket.to(params.room).emit(KEY.FLAG, {"idDevice": params.idDevice,"status":settings.LOST, "position": position});
                    log.write("KEY.FLAG", "--- Emit Sender2 Lost ---");
                  }
                });
                  break;
                case settings.DRAW:
                log.write("KEY.RPS", "Sender2: --- DRAW ---");
                  //Send all in room
                  socket.emit(KEY.FLAG, {"idDevice": params.idDevice,"status":settings.DRAW, "position": -1});
                  socket.to(params.room).emit(KEY.FLAG, {"idDevice": params.idDevice,"status":settings.DRAW, "position": -1});
                  log.write("KEY.FLAG", "--- Emit Draw ---");
                  break;
                }
          });
        });

        //{id_device, again}
        socket.on(KEY.AGAIN, function(params){
          log.write("KEY.AGAIN", "---- On ----");
          socket.emit(KEY.AGAIN, params);
          socket.to(params.room).emit(KEY.AGAIN, params);
          storage.clearData(params.room);
          room.deleteRoom(socket.id, function(){});
          log.write("KEY.AGAIN", "---- Emit ----");
        });

        //{id_device, again}
        socket.on(KEY.CONFIRM_AGAIN, function(params){
          log.write("KEY.CONFIRM_AGAIN", "---- On ----");
          socket.emit(KEY.CONFIRM_AGAIN, params);
          socket.to(params.room).emit(KEY.CONFIRM_AGAIN, params);
          socket.leave(params.room);
          log.write("KEY.CONFIRM_AGAIN", "---- EMit ----");
        });

        //{id_device, leave}
        socket.on(KEY.LEAVE, function(params){
          log.write("KEY.LEAVE", "---- On ----");
          socket.emit(KEY.LEAVE, params);
          socket.to(params.room).emit(KEY.LEAVE, params);
          socket.leave(params.room);
          storage.clearData(params.room);
          room.deleteRoom(socket.id, function(){});
          log.write("KEY.LEAVE", "---- Emit ----");
        });
      });//io.socket

/*
* End Start Connection
*/
