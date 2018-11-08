var log = require('./log');
var settings = require('./settings');

var join = []; //{"idSocket1":idSocket, "idSocket2":"", "room":room};
exports.checkJoin = function(idSocket, idDevice, room, callback){
  var index = join.findIndex(id => id.room === room);
  if (index > -1){
    //Exist

    //callback sender1 & sender2 for Join
    callback(join[index].idSocket1, idSocket);

    //Add Sender 2
     join[index].idSocket2 = idSocket;
     join[index].idDevice2 = idDevice;
     log.write("Join Room:", "-----Add Sender 2-----");
     log.writeArray(join);

    //Delete Join
    // join.splice(index, 1);
    // log.write("checkJoin", "-----Delete-----");
    // log.writeArray(join);
  }else{
    //NotExist
    //Add to Room
    join.push({"idSocket1": idSocket, "idDevice1": idDevice, "idSocket2": "", "idDevice2": "", "room":room});
    log.write("Join Room: ", "-----Add Sender 1-----");
    log.writeArray(join);

    //callback(null, null);
  }
}

exports.getIdSocketInRoom = function(idSocket, callback){
  var index1 = join.findIndex(id => id.idSocket1 === idSocket);
  var index2 = join.findIndex(id => id.idSocket2 === idSocket);
  if (index1 > -1 && index2 < 0) {
    //Callback idSocketOther, idDeviceOther, room
    callback(join[index1].idSocket2, join[index1].idDevice2, join[index1].room);

    //Delete Join
    join.splice(index1, 1);
    log.write("Join Room: ", "-----Delete-----");
    log.writeArray(join);
  }else if(index1 < 0 && index2 > -1){
    //Callback idSocketOther, idDeviceOther, room
    callback(join[index2].idSocket1, join[index2].idDevice1, join[index2].room);

    //Delete Join
    join.splice(index2, 1);
    log.write("Join Room: ", "-----Delete-----");
    log.writeArray(join);
  }
}

var again = [];
exports.checkAgain = function(idSocket, idDevice, room, callback){
  var index = again.findIndex(id => id.room === room);
  if (index > -1){
    //Exist
    callback(again[index].idSocket, again[index].idDevice);

    again.splice(index, 1);
    log.write("checkAgain", "-----Delete-----");
    log.writeArray(again);
  }else{
    //Not Exist
    again.push({"idSocket":idSocket, "idDevice":idDevice, "room":room});
    log.write("checkAgain", "-----Add-----");
    log.writeArray(again);
  }
}

var rps = []; //{"room", "value"}
exports.checkRps = function(room, value, callback){
  var index = rps.findIndex(id => id.room === room);
  if (index > -1) {
    log.write("CheckRPS", " --- Compare --- " + value);
    //Exist, Compare
    if (rps[index].value === settings.ROCK){
      if (value === settings.ROCK){
        //draw
        callback(settings.DRAW);
      }else if (value === settings.PAPER){
        //win
        callback(settings.WIN);
      }else if(value === settings.SCISSOR){
        //lost
        callback(settings.LOST);
      }
    }else if (rps[index].value === settings.PAPER){
      if (value === settings.ROCK){
        //lost
        callback(settings.LOST);
      }else if (value === settings.PAPER){
        //draw
        callback(settings.DRAW);
      }else if(value === settings.SCISSOR){
        //win
        callback(settings.WIN);
      }
    }else if (rps[index].value === settings.SCISSOR){
      if (value === settings.ROCK){
        //win
        callback(settings.WIN);
      }else if (value === settings.PAPER){
        //lost
        callback(settings.LOST);
      }else if(value === settings.SCISSOR){
        //draw
        callback(settings.DRAW);
      }
    }
    //delete value
    rps.splice(index, 1);
    //Log
    log.write("CheckRPS", "---- Delete ----");
    log.writeArray(rps);
  }else {
    //Not exist, Add value to Array
    rps.push({"room":room, "value": value});
    callback(settings.NOTEXIST);
    //Log
    log.write("CheckRPS", "---- Add ----");
    log.writeArray(rps);
  }
}

var flag = []; //{"room":room, "idDevice":idDevice, "sender1": sender1, "sender2": sender2, "position": 1}
exports.checkFlag = function(room, idDevice, sender1, sender2, callback){
  var index = flag.findIndex(id => id.room === room);
  if (index > -1){
    //Exist
    //Check id before
    if (idDevice === flag[index].idDevice){
      if (sender1 ===1) {
        //Win
        if (flag[index].sender1 + sender1 === settings.FLAG_WIN){
          flag[index].position = flag[index].position + 1;
          callback(settings.FLAG_WIN, flag[index].position);
          //delete value
          flag.splice(index, 1);
          //Log
          log.write("CheckFlag", "--- Delete ---");
          log.writeArray(flag);
        }else{
          //Add Flag
          flag[index].sender1 = flag[index].sender1 + sender1;
          flag[index].position = flag[index].position + 1;
          callback(-1, flag[index].position);
          //Log
          log.write("CheckFlag", "--- Update ---");
          log.writeArray(flag);
        }
      }else{
        if (flag[index].sender2 + sender2 === settings.FLAG_WIN){
          flag[index].position = flag[index].position + 1;
          callback(settings.FLAG_WIN, flag[index].position);
          //delete value
          flag.splice(index, 1);
          //Log
          log.write("CheckFlag", "--- Delete ---");
          log.writeArray(flag);
        }else{
          flag[index].sender2 = flag[index].sender2 + sender2;
          flag[index].position = flag[index].position + 1;
          callback(-1, flag[index].position);
          //Log
          log.write("CheckFlag", "--- Update ---");
          log.writeArray(flag);
        }
      }
    }else{
      //Difilren id swap result
      if (sender2 ===1) {
        //Win
        if (flag[index].sender1 + sender2 === settings.FLAG_WIN){
          flag[index].position = flag[index].position + 1;
          callback(settings.FLAG_WIN, flag[index].position);
          //delete value
          flag.splice(index, 1);
          //Log
          log.write("CheckFlag", "--- Delete ---");
          log.writeArray(flag);
        }else{
          //Add Flag
          flag[index].sender1 = flag[index].sender1 + sender2;
          flag[index].position = flag[index].position + 1;
          callback(-1, flag[index].position);
          //Log
          log.write("CheckFlag", "--- Update ---");
          log.writeArray(flag);
        }
      }else{
        if (flag[index].sender2 + sender1 === settings.FLAG_WIN){
          flag[index].position = flag[index].position + 1;
          callback(settings.FLAG_WIN, flag[index].position);
          //delete value
          flag.splice(index, 1);
          //Log
          log.write("CheckFlag", "--- Delete ---");
          log.writeArray(flag);
        }else{
          flag[index].sender2 = flag[index].sender2 + sender1;
          flag[index].position = flag[index].position + 1;
          callback(-1, flag[index].position);
          //Log
          log.write("CheckFlag", "--- Update ---");
          log.writeArray(flag);
        }
      }
    }
  }else{
    //Not Exist
    flag.push({"room":room, "idDevice":idDevice, "sender1": sender1, "sender2": sender2, "position": 1});
    callback(-1, 1);
    //Log
    log.write("CheckFlag", "--- Add ---");
    log.writeArray(flag);
  }
}

exports.clearInRoom = function(room){
  var indexJoin = join.findIndex(id => id.room === room);
  if (indexJoin > -1){
    join.splice(indexJoin, 1);
    //Log
    log.write("Join: ", "--- Delete ---");
    log.writeArray(join);
  }
}

exports.clearData = function(room){
  log.write("Clear Data:", " Start ")
  //Delete Join
  var indexJoin = join.findIndex(id => id.room === room);
  if (indexJoin > -1){
    join.splice(indexJoin, 1);
    //Log
    log.write("Join: ", "--- Delete ---");
    log.writeArray(join);
  }

  //Delete Again
  var indexAgain = again.findIndex(id => id.room === room);
  if (indexAgain > -1){
    again.splice(indexAgain, 1);
    //Log
    log.write("Again: ", "--- Delete ---");
    log.writeArray(again);
  }

  //Delete Rps
  var indexRps = rps.findIndex(id => id.room === room);
  if (indexRps > -1){
    rps.splice(indexRps, 1);
    //Log
    log.write("Rps: ", "--- Delete ---");
    log.writeArray(rps);
  }

  //Delete Join
  var indexFlag = flag.findIndex(id => id.room === room);
  if (indexFlag > -1){
    flag.splice(indexFlag, 1);
    //Log
    log.write("Flag: ", "--- Delete ---");
    log.writeArray(flag);
  }
}

//Split 2 idDevice From Room
exports.getIdDeviceFromRoom = function(idDevice, room, callback){
  var id = room.split("-");
  var idDeviceOther;
  if (id[0] === idDevice) {
    idDeviceOther = id[1];
  }else if (id[1] === idDevice){
    idDeviceOther = id[0];
  }
  //Return 2 idDevice
  callback(idDeviceOther);
}
