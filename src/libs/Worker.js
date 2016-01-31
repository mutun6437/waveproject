//TODO WebWorker以降時に変更する
var AudioSchedular = (function () {
    function AudioSchedular() {
        this.interval = 100;
    }
    AudioSchedular.prototype.startTimer = function () {
        var _this = this;
        WorkerUtil.log("[Worker]StartTimer");
        this.timerID = setInterval(function () {
            _this.tick();
        }, this.interval);
    };
    AudioSchedular.prototype.stopTimer = function () {
        WorkerUtil.log("[Worker]StopTimer");
        clearInterval(this.timerID);
        this.timerID = null;
    };
    AudioSchedular.prototype.setInterval = function (interval) {
        var _this = this;
        this.interval = interval;
        if (this.timerID) {
            clearInterval(this.interval);
            this.timerID = setInterval(function () {
                _this.tick();
            }, this.interval);
        }
    };
    AudioSchedular.prototype.tick = function () {
        WorkerUtil.log("[Worker]Tick");
        postMessage("tick", "http://" + document.domain + ":3000");
    };
    return AudioSchedular;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AudioSchedular;
var WorkerUtil = (function () {
    function WorkerUtil() {}
    WorkerUtil.log = function (str) {
        if (WorkerUtil.isDebug) {
            console.log(str);
        }
    };
    WorkerUtil.isDebug = true;
    return WorkerUtil;
})();
var worker = new AudioSchedular();
var isDebug = true; //デバッグモードの時はログを出力する
window.addEventListener("onMessage", function (e) {
    WorkerUtil.log("[Worker]onMessage");
    var data = e.data;
    switch (data.msg) {
        case "onStart":
            worker.startTimer();
            break;
        case "onStop":
            worker.stopTimer();
            break;
        case "setInterval":
            worker.setInterval(data.value);
            break;
        default:
            break;
    }
});