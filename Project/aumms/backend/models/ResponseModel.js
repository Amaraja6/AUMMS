class ResponseModel {
  constructor(message, status, error) {
    this.Message = message;
    this.Status = status;
    this.Error = error;
  }
  toObject() {
    let ResponseObject = new Object();
    ResponseObject["status"] = this.Status;
    ResponseObject["message"] = this.Message;
    ResponseObject["error"] = this.Error;
    return ResponseObject;
  }
}
module.exports = { ResponseModel };
