/**
 * Created by caiyidi on 14/09/11.
 */
define(function (require, exports, module) {
    var Communicate = function (socketUrl, protocol, fn) {
        this.socketUrl = socketUrl;
        this.socketProtocol = protocol;
        this.fn = fn;
        this.retries = 5;
        this.socket = null;
    };
    Communicate.prototype.int = function () {
        var self = this;
        this.socket = new WebSocket(this.socketUrl, this.socketProtocol);
        this.socket.onopen = function () {
        };
        this.socket.onclose = function () {
            if (self.retries > 0) {
                setTimeout(function () {
                    self.retries--;
                    console.log(self.retries);
                    self.int();
                }, 5000);
            }
        };
        this.socket.onerror = function (e) {
        };
        this.socket.onmessage = this.fn;
    };

    Communicate.prototype.send = function (data) {
        this.socket.send(data)
    };

    module.exports = Communicate;
});








