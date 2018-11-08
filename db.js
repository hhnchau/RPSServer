var controller = require('./controller');
var settings = require('./settings');
var tools = require('./tools');

//var index = Math.floor(Math.random() * ((computer.length) - 0 + 1)) + 0;

// SELECT nickname, address, win, lost FROM tbl_user INNER JOIN tbl_score ON tbl_user.id_device = tbl_score.id WHERE id_device = 'ABCDEF'
//SELECT lost, SUM(win) FROM tbl_score GROUP BY lost
//SELECT lost, MAX(win) FROM tbl_score GROUP BY lost
//SELECT COUNT(*) FROM `tbl_score`
//SELECT SUM(win + lost) FROM `tbl_score` WHERE id_device = 'abcdefgh'
//SELECT SUM(win - lost) FROM `tbl_score` WHERE id_device = 'abcdefgh'
//INSERT INTO `tbl_transaction` (`id_device`, `date`, `value`, `star`, `life`, `des`, `type`) VALUES ('abc12345', '123123', '3123', '12312', '13212', 'dsdsad', '123');
//SELECT address FROM `tbl_user` WHERE id_device IN ('abc12345', 'aaaaaaaa')
//UPDATE `tbl_score` SET `win`=1,`lost`=2,`draw`=3,`champion`=4,`life`=5,`star`=8,`is_champion`= 1 WHERE id = 'abc12345'
//INSERT INTO `tbl_score`(`id`, `win`, `lost`, `draw`, `champion`, `life`, `star`, `is_champion`) VALUES ("abcdefghij",3,6,9,1,8,6,4)
//DELETE FROM `tbl_score` WHERE id = "abc12345"  //new xoa tu nhieu thi se khong sao neu xoa tu goc user thi se xoa het
//khi dang ky user thi phai adng ky score va transaciom
//UPDATE tbl_score SET win = win+1, champion = champion+1, star = 8, is_champion = 1 WHERE id = 'abcdefghij'
//UPDATE tbl_score SET max_champion = champion WHERE id = 'abcdefghij' && champion > max_champion
//UPDATE tbl_transaction SET date = "12344", value = 1, type = 1 WHERE id_device = 'abc12345'
//INSERT INTO tbl_transaction (id_device, date, type, buy, des) VALUES ('abc12345',123456,1,100,"buy")
//INSERT INTO tbl_transaction (id_device, date, type, buy, des) VALUES ('abc12345',123457,2,30,"bonus")
//SELECT MAX(star) FROM tbl_score;
//SELECT * FROM tbl_score ORDER BY win LIMIT 5
//SELECT * FROM tbl_score ORDER BY win DESC
//SELECT    id, win, @curRank := @curRank + 1 AS rank FROM tbl_score, (SELECT @curRank := 0) r ORDER BY win DESC;

//Get thu hang cua user
//SELECT id, win, star, FIND_IN_SET(win, (SELECT GROUP_CONCAT(win ORDER BY win DESC) FROM tbl_score)) AS rank FROM tbl_score WHERE id = 'abcdefghij'
//SELECT id FROM tbl_score WHERE win = (SELECT MAX(win) FROM tbl_score)
//SELECT idDevice, nickName, win FROM tbl_user AS u INNER JOIN tbl_score AS s ON u.idDevice = s.id ORDER BY s.win DESC LIMIT 5;


//SETTING
 exports.getGeneralSetting = function(callback){
   var sql = "SELECT * FROM tbl_settings";
   controller.execute(sql, function(data, err){
     callback(data, err);
   });
 }

 //Register
 exports.insertUser = function(idDevice, nickName, address, callback){
   //Check nickName
   var sql = "SELECT 1 FROM tbl_user WHERE nickName = '" + nickName +"'" ;
   controller.execute(sql, function(data, err){
     if (data.length > 0) {
       //Exist nickName
       callback(null);
     }else {
       //No

       var session = tools.createSession();
       var sql = "INSERT INTO `tbl_user` (idDevice, nickName, address, session)";
         sql += "VALUES ('" + idDevice + "','" + nickName + "','" + address + "','"+ session +"')";
         controller.execute(sql, function(err){
           if (!err) {
             //Exist idDevice
             callback(null);
           }else{
             var sql = "INSERT INTO tbl_score (id)";
               sql += "VALUES ('" + idDevice +"')";
               controller.execute(sql, function(err){

               });

              var timestamp = new Date().getTime();
             var sql = "INSERT INTO `tbl_login` (idDevice, register)";
               sql += "VALUES ('"+ idDevice + "', '" + timestamp +"')";
               controller.execute(sql, function(err){

               });

               callback(session);
           }
         });
     }
   });
 }

//Update session
exports.updateSession = function(idDevice, callback){
  var session = tools.createSession();
  var sql = "UPDATE tbl_user SET session = '" + session +"' WHERE idDevice = '" + idDevice + "'";
  controller.execute(sql, function(err){
      if (err){
        callback(session);
      }
  });
}

//Update Address
exports.updateSession = function(idDevice, address, callback){
  var sql = "UPDATE tbl_user SET address = '" + address +"' WHERE idDevice = '" + idDevice + "'";
  controller.execute(sql, function(err){
      if (!err){
        callback();
      }
  });
}

 //Find Id
  exports.findIdDevice = function(idDevice, callback){
    var sql = "SELECT 1 FROM tbl_user WHERE idDevice = '" + idDevice +"'" ;
    controller.execute(sql, function(data, err){
      if (data.length > 0) {
        callback(true);
      }else {
        callback(false);
      }
    });
  }

//GET COMPUTER
 exports.getComputer = function(callback){
   var sql = "SELECT idComputer FROM tbl_computer ORDER BY RAND() LIMIT 1";
   controller.execute(sql, function(computer, err){
     callback(computer, err);
   });
 }

 //GET INFO USER
 exports.getInfoUser = function(idDevice, callback){
   var sql = "SELECT nickName, address, star, life, win, lost, draw, maxChampion, champion, spin, FIND_IN_SET(maxChampion, (SELECT GROUP_CONCAT(maxChampion ORDER BY maxChampion DESC) FROM tbl_score)) AS rank FROM tbl_user INNER JOIN tbl_score ON tbl_user.idDevice = tbl_score.id WHERE idDevice = '" + idDevice + "'" ;
   controller.execute(sql, function(infoUser, err){
     callback(infoUser[0], err);
   });
 }

 //GET TOP RANK
 exports.getRankUser = function(callback){
   var sql = "SELECT idDevice, nickName, address, champion, maxChampion, FIND_IN_SET(maxChampion, (SELECT GROUP_CONCAT(maxChampion ORDER BY maxChampion DESC) FROM tbl_score)) AS rank FROM tbl_user AS u INNER JOIN tbl_score AS s ON u.idDevice = s.id ORDER BY rank ASC LIMIT " + settings.limitRankUser;
   controller.execute(sql, function(rankUser, err){
     callback(rankUser, err);
   });
 }

 //GET INFO
 exports.getInfoGame = function(idDevice, callback){
   var sql = "SELECT nickName, address, star, life, win, lost, draw, maxChampion, champion, spin, FIND_IN_SET(maxChampion, (SELECT GROUP_CONCAT(maxChampion ORDER BY maxChampion DESC) FROM tbl_score)) AS rank FROM tbl_user INNER JOIN tbl_score ON tbl_user.idDevice = tbl_score.id WHERE idDevice = '" + idDevice + "'";
   controller.execute(sql, function(infoUser, err){
     var sql = "SELECT idDevice, nickName, address, champion, maxChampion, FIND_IN_SET(maxChampion, (SELECT GROUP_CONCAT(maxChampion ORDER BY maxChampion DESC) FROM tbl_score)) AS rank FROM tbl_user AS u INNER JOIN tbl_score AS s ON u.idDevice = s.id ORDER BY rank ASC LIMIT " + settings.limitRankUser;
     controller.execute(sql, function(rankUser, err){
       callback(infoUser[0], rankUser, err);
     });
   });
 }

//GET INFO USER
exports.getInfoUserBattle = function(id1, id2, callback){
  var sql = "SELECT idDevice, nickName, address, star, life, win, lost, draw, maxChampion, champion FROM tbl_user INNER JOIN tbl_score ON tbl_user.idDevice = tbl_score.id WHERE idDevice IN ('"+id1+"', '"+id2+"')";
  controller.execute(sql, function(infoUserBattle, err){
    callback(infoUserBattle, err);
  });
}

//UPDATE SPIN
exports.updateSpin = function (idDevice, spin, callback){
  var sql = "UPDATE `tbl_score` SET spin = spin +'" + spin + "' WHERE id = '" + idDevice + "'" ;
    controller.execute(sql, function(err){
      if (!err) {
        callback();
      }
    });

    var sql = "UPDATE tbl_score SET spin = 0 WHERE spin < 0"
    controller.execute(sql, function(err){});
}

//UPDATE LIFE
exports.updateLife = function (idDevice, life, callback){
  var sql = "UPDATE `tbl_score` SET life = life +'" + life + "' WHERE id = '" + idDevice + "'" ;
    controller.execute(sql, function(err){
      if (!err) {
        callback();
      }
    });

    var sql = "UPDATE tbl_score SET life = 0 WHERE life < 0"
    controller.execute(sql, function(err){});
}

//UPDATE LIFE-SPIN
exports.updateSpinLife = function (idDevice, spin , life, callback){
  var sql = "UPDATE `tbl_score` SET spin = spin +'" + spin + "', life = life +'" + life + "' WHERE id = '" + idDevice + "'" ;
    controller.execute(sql, function(err){
        callback(err);
    });

    var sql = "UPDATE tbl_score SET spin = 0 WHERE spin < 0"
    controller.execute(sql, function(err){});

    var sql = "UPDATE tbl_score SET life = 0 WHERE life < 0"
    controller.execute(sql, function(err){});
}

//UPDATE WIN
exports.updateWinScore = function(idDevice, callback){
  var sql = "UPDATE tbl_score SET win = win + 1, champion = champion + 1, isChampion = 1 WHERE id = '" + idDevice + "'";
  controller.execute(sql, function(err){
      if (!err){
        callback();
      }
  });
  var sql = "UPDATE tbl_score SET maxChampion = champion WHERE id = '" + idDevice + "' && champion > maxChampion"
  controller.execute(sql, function(err){
      if (!err){
        callback();
      }
  });
}

//UPDATE LOST
exports.updateLostScore = function(idDevice, callback){
  var sql = "UPDATE tbl_score SET lost = lost + 1, life = life - 1, champion = 0, isChampion = 0 WHERE id = '" + idDevice + "'";
    controller.execute(sql, function(err){
      if (!err) {
        callback();
      }
    });
  var sql = "UPDATE tbl_score SET life = 0 WHERE life < 0"
  controller.execute(sql, function(err){
      if (!err) {
        callback();
      }
    });
  // var sql = "UPDATE tbl_score SET star = 0 WHERE star < 0"
  // controller.execute(sql, function(err){
  //   if (!err) {
  //     callback();
  //   }
  // });
}

//INSERT BUY
exports.insertBuyTransaction = function(idDevice, buy, callback){
  var timestamp = new Date().getTime();
  var sql = "INSERT INTO `tbl_transaction` (idDevice, date, buy, des, type)";
    sql += "VALUES ('" + idDevice + "','" + timestamp + "','" + buy +"','" + settings.TRANSACTION_DES_BUY +"','" + settings.TRANSACTION_ID_BUY +"')";
    controller.execute(sql, function(err){
      if (!err) {
        callback();
      }
    });
}

//INSERT BONUS
exports.insertBonusTransaction = function(idDevice, bonus, callback){
  var timestamp = new Date().getTime();
  var sql = "INSERT INTO `tbl_transaction` (idDevice, date, bonus, des, type)";
    sql += "VALUES ('" + idDevice + "','" + timestamp + "','" + bonus +"','" + settings.TRANSACTION_DES_BONUS +"','" + settings.TRANSACTION_ID_BONUS +"')";
    controller.execute(sql, function(err){
      if (!err) {
        callback();
      }
    });
}

//INSERT WIN
exports.insertWinTransaction = function(idDevice, win, callback){
  var timestamp = new Date().getTime();
  var sql = "INSERT INTO `tbl_transaction` (idDevice, date, win, des, type)";
    sql += "VALUES ('" + idDevice + "','" + timestamp + "','" + win +"','" + settings.TRANSACTION_DES_WIN +"','" + settings.TRANSACTION_ID_WIN +"')";
    controller.execute(sql, function(err){
      if (!err) {
        callback();
      }
    });
}

//INSERT LOST
exports.insertLostTransaction = function(idDevice, lost, callback){
  var timestamp = new Date().getTime();
  var sql = "INSERT INTO `tbl_transaction` (idDevice, date, lost, des, type)";
    sql += "VALUES ('" + idDevice + "','" + timestamp + "','" + lost +"','" + settings.TRANSACTION_DES_LOST +"','" + settings.TRANSACTION_ID_LOST +"')";
    controller.execute(sql, function(err){
      if (!err) {
        callback();
      }
    });
}

//INSERT TAX
exports.insertTaxTransaction = function(idDevice, tax, callback){
  var timestamp = new Date().getTime();
  var sql = "INSERT INTO `tbl_transaction` (idDevice, date, tax, des, type)";
    sql += "VALUES ('" + idDevice + "','" + timestamp + "','" + tax +"','" + settings.TRANSACTION_DES_TAX +"','" + settings.TRANSACTION_ID_TAX +"')";
    controller.execute(sql, function(err){
      if (!err) {
        callback();
      }
    });
}

//LOG REGISTER
exports.updateLogRegister = function(idDevice, callback){
  var timestamp = new Date().getTime();
  var sql = "UPDATE `tbl_login` SET register = '" + timestamp + "' WHERE idDevice = '" + idDevice + "'" ;
    controller.execute(sql, function(err){
      if (!err) {
        callback();
      }
    });
}

//LOG LOGIN
exports.updateLogLogin = function (idDevice, callback){
  var timestamp = new Date().getTime();
  var sql = "UPDATE `tbl_login` SET login = '" + timestamp + "' WHERE idDevice = '" + idDevice + "'" ;
    controller.execute(sql, function(err){
      if (!err) {
        callback();
      }
    });
}

//LOG LOGOUT
exports.updateLogLogout = function (idDevice, callback){
  var timestamp = new Date().getTime();
  var sql = "UPDATE `tbl_login` SET logout = '" + timestamp + "' WHERE idDevice = '" + idDevice + "'" ;
    controller.execute(sql, function(err){
      if (!err) {
        callback();
      }
    });
}

//LOG BONUS
exports.updateLogBouns = function (idDevice, callback){
  var timestamp = new Date().getTime();
  var sql = "UPDATE `tbl_login` SET bonus = '" + timestamp + "' WHERE idDevice = '" + idDevice + "'" ;
    controller.execute(sql, function(err){
      if (!err) {
        callback();
      }
    });
}

//GET BONUS
exports.getBonus = function (idDevice, callback){
  var timestamp = new Date().getTime();
  var sql = "SELECT bonus FROM `tbl_login` WHERE idDevice = '" + idDevice + "'" ;
    controller.execute(sql, function(data){
      if (data) {
        var b = timestamp - data[0].bonus;
        if (b > settings.timestampOneDay) {
            callback(1);

            //Update Bonus
            var query = "UPDATE `tbl_login` SET bonus = '" + timestamp + "' WHERE idDevice = '" + idDevice + "'" ;
              controller.execute(query, function(err){
              });

        }else {
          callback(0);
        }
      }
    });
}

//INSERT MESSAGE CHAT
exports.insertMessageChat = function(idDevice, message, room, callback){
  var timestamp = new Date().getTime();
  var sql = "INSERT INTO tbl_chat (id, message, time, room)";
  if (room === settings.GLOBAL){
        sql += "VALUES ('" + idDevice + "','" + message + "','" + timestamp +"','" + settings.GLOBAL +"')";
  }else{
    sql += "VALUES ('" + idDevice + "','" + message + "','" + timestamp +"','" + room + "')";
  }
    controller.execute(sql, function(err){
      if (!err) {
        callback();
      }
    });
}

//GET MESSAGE CHAT LOCAL
exports.getMessageChat = function(roomLocal, roomGlobal, callback){
  var sql = "SELECT idDevice, nickName, address, message, room, time FROM tbl_user INNER JOIN tbl_chat ON tbl_user.idDevice = tbl_chat.id WHERE room IN ('"+roomLocal+"', '"+roomGlobal+"') ORDER BY tbl_chat.room DESC LIMIT " +settings.limitRowMessageChat;
  controller.execute(sql, function(messageChat, err){
    callback(messageChat, err);
  });
}

  //GET Info Market
  exports.getInfoMarket = function(callback){
    var sql = "SELECT * FROM tbl_market";
    controller.execute(sql, function(infoMarket, err){
      callback(infoMarket);
    });
  }
