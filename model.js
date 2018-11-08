var Models = function (data) {
this.data = data;
}

Models.prototype.data = {}

Models.prototype.FormSetting = function (isRegister) {
      this.data.isRegister = isRegister;
}

Models.prototype.FormResult = function (status, message) {
      this.data.status = status;
      this.data.message = message;
}

Models.prototype.FormInfoUser = function (status, message, user) {
      this.data.status = status;
      this.data.message = message;
      this.data.user = user;
}

Models.prototype.FormWaitingResult = function (status, message, id_device_guest) {
      this.data.status = status;
      this.data.message = message;
      this.data.id_device_guest = id_device_guest;
}


module.exports = Models;
