exports.dbConfig = {
  host: 'localhost',
  user: 'root',
  pass: '',
  database: 'db_rps_online',
  port: '3306'
};

exports.listenPort = 3000;

exports.version = "1.0";

exports.app = 'rps';

exports.secret = '12345';

exports.COMPUTER = 'computer';

exports.timerWaitingRoom = 3000;
exports.limitRankUser = 200;
exports.limitRowMessageChat = 50;
exports.timestampOneDay = 86400000;

exports.GLOBAL = "GLOBAL";

exports.TRANSACTION_ID_BUY = 1
exports.TRANSACTION_DES_BUY = "BUY"

exports.TRANSACTION_ID_BONUS = 2
exports.TRANSACTION_DES_BONUS = "BONUS"

exports.TRANSACTION_ID_WIN = 3
exports.TRANSACTION_DES_WIN = "WIN"

exports.TRANSACTION_ID_LOST = 4
exports.TRANSACTION_DES_LOST = "LOST"

exports.TRANSACTION_ID_TAX = 5
exports.TRANSACTION_DES_TAX = "TAX"

exports.TRANSACTION_ID_OTHER = 6
exports.TRANSACTION_DES_OTHER = "OTHER"

exports.FLAG_WIN = 2;

exports.NOTEXIST = -1;
exports.ROCK = 1;
exports.PAPER = 2;
exports.SCISSOR = 3;

exports.DRAW = 10;
exports.LOST = 11;
exports.WIN = 12;
exports.WINNER = 13;
exports.LOSER = 14;

exports.RESULT_FAIL = 0;
exports.RESULT_SUCCESS = 1;
exports.RESULT_EXIST = 2;
