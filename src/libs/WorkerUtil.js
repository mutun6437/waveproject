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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkerUtil;