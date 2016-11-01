
var window = function (winSize, seqSize)  {
    var data = []
        , next = 0
        , base = 0;
    var Obj = {
        getNext: function () {
            return next;
        },

        getData: function () {
            return data;
        },

        isEmpty: function() {
            return data.length === 0;
        },

        getCurr: function () {
            var x = next - 1;
            if (x < 0) x += seqSize;
            return x;
        },

        ackLegal: function (ack) {
            if (ack < 0) return false;
            var legalMax = this.minus(next);
            if (this.minus(ack) < legalMax) return true;
            else return false;
        },

        minus: function (x) {
            var minus = x - base;
            while (minus < 0) minus += seqSize;
            return minus;
        },

        go: function (length) {
            data = data.slice(length);
            base = (base + length) % seqSize;
        },

        push: function (c) {
            var isWindowFull = !!(this.minus(next) >= winSize);
            if (isWindowFull) return false;
            else {
                data.push({
                    seq: next,
                    chunk: c
                });
                next = ++next % seqSize;
                return true;
            }
        }
    };
    return Obj;
}

module.exports = window;