var WorkerUtil_1 = require('./WorkerUtil');
var Worker = (function () {
    function Worker() {
        this.interval = 25;
    }
    Worker.prototype.startTimer = function () {
        var _this = this;
        WorkerUtil_1.default.log("[Worker]StartTimer");
        this.timerID = setInterval(function () {
            _this.tick();
        }, this.interval);
    };
    Worker.prototype.stopTimer = function () {
        WorkerUtil_1.default.log("[Worker]StopTimer");
        clearInterval(this.timerID);
        this.timerID = null;
    };
    Worker.prototype.setInterval = function (interval) {
        var _this = this;
        this.interval = interval;
        if (this.timerID) {
            clearInterval(this.interval);
            this.timerID = setInterval(function () {
                _this.tick();
            }, this.interval);
        }
    };
    Worker.prototype.tick = function () {
        //WorkerUtil.log("[Worker]Tick");
        window.postMessage("tick", "http://" + document.domain + ":3000/");
    };
    return Worker;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Worker;