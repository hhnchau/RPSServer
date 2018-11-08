var log = require('./log');
var room = [];

exports.add = function(idSocket, idDevice, callback){
  var index = room.findIndex(id => id.idDevice === idDevice);
  if (index > -1) {
    log.write("Waiting Room: Add socketId ---> ", "has been exist");
    //Update idSocket
    room[index].idSocket = idSocket;
    callback();
  }else {
    room.push({"idSocket":idSocket, "idDevice":idDevice});
    log.writeArray(room);
    callback();
  }
}

//Remove first position after get user in first position
exports.remove = function(idSocket, callback){
  var index = room[0].idSocket.indexOf(idSocket);
    if (index > -1){
      room.splice(index, 1);
      log.writeArray(room);
      callback(true);
    }else {
      log.write("Waiting Room: Remove socketId ---> ", "not exist");
      callback(false);
    }
}

//Delete yourself, first position
exports.removeYourselt = function(callback){
    if (room.length > 0){
      room.splice(0, 1);
      log.writeArray(room);
      callback();
    }else {
      log.write("Waiting Room Add socketId ---> ", "has been exist");
      callback();
    }
}

//Find socketId to delete
exports.deleteRoom = function(idSocket,callback){
  var index = room.findIndex(id => id.idSocket === idSocket);
    if (index > -1){
      room.splice(index, 1);
      log.write("Room: ", "---delete---");
      log.writeArray(room);
      callback();
    }
}

exports.get = function(callback){
    if (room.length >0 ) {
      callback(room[0]);
    }else {
      callback(null);
    }
}
