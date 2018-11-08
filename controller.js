var mysql = require('mysql');
var settings = require('./settings');
var log = require('./log');


var dbConnect = mysql.createConnection(settings.dbConfig);

dbConnect.connect(function(err){
  if (!!err) {
      log.write("Connect to DB", "---------->ERROR<----------");
  }else{
      log.write("Connect to DB", "---------->OK<----------");
  }
});

exports.execute = function(sql, callback){
      try{

        dbConnect.query(sql, function(err, rows, fields){

          log.write("*/*db*/* Execute Sql Query", sql);

          if (err) {
            log.write("*/*db*/* Execute Sql Query", "---------->ERROR<----------");
            log.write("*/*db*/* Execute Sql Query", err);
            return callback(null, err);
          }
          log.write("*/*db*/* Execute Sql Query", "---------->OK<----------");
          //log.write("*/*db*/* Execute Sql Query", JSON.stringify(rows, null, 2));
          callback(rows);
        });

      }catch(ex){
          log.write("*/*db*/* Execute Sql Query", "---------->EXCEPTION<----------");
      }
}
