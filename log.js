var log = true;
exports.write = function (tag, s){
  if (log){
    console.log(tag+ ":-----> " + s);
  }
};

exports.writeArray = function (array){
  if (log){
    console.log(array);
  }
};
