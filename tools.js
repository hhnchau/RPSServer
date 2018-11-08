var crypto = require('crypto');
var log = require('./log');

exports.md5 = function(string){
      return crypto.createHash('md5').update(string).digest("hex");
};

exports.createSession = function(){
      var sha = crypto.createHash('sha256');
      sha.update(Math.random().toString());
      return sha.digest('hex');
};

exports.getNowTimestamp = function(){
      return new Date().getTime();
};

exports.getCurrentDate = function(){
      return new Date().toISOString().slice(0, 10);
};

exports.getFormatDate = function(timestamp){
  var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = ("0"+(date.getMonth()+1)).substr(-2);
        var day = ("0"+date.getDate()).substr(-2);
        var hour = ("0"+date.getHours()).substr(-2);
        var minutes = ("0"+date.getMinutes()).substr(-2);
        var seconds = ("0"+date.getSeconds()).substr(-2);
        return year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds;
};

exports.checkEmail = function(email){
  var char = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return char.test(email);
}

exports.checkNickname = function(nickname){
  var char = /^[a-zA-Z0-9]+$/;
  return char.test(nickname);
}
