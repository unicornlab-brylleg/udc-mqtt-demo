"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const socketCluster = __importStar(require("socketcluster-server"));
let httpServer = http.createServer();
let scServer = socketCluster.attach(httpServer);
(async () => {
    var e_1, _a, e_2, _b;
    try {
        for (var _c = __asyncValues(scServer.listener("connection")), _d; _d = await _c.next(), !_d.done;) {
            let { socket } = _d.value;
            (async () => {
                var e_3, _a;
                try {
                    for (var _b = __asyncValues(socket.procedure("customProc")), _c; _c = await _b.next(), !_c.done;) {
                        let req = _c.value;
                        if (req.data.bad) {
                            let error = new Error("Server failed to execute the procedure");
                            error.name = "BadCustomError";
                            req.error(error);
                        }
                        else {
                            req.end("Success");
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            })();
            (async () => {
                var e_4, _a;
                try {
                    for (var _b = __asyncValues(socket.receiver("customProc")), _c; _c = await _b.next(), !_c.done;) {
                        let data = _c.value;
                        console.log("received data", data);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            })();
            try {
                for (var _e = (e_2 = void 0, __asyncValues(socket.procedure("login"))), _f; _f = await _e.next(), !_f.done;) {
                    let request = _f.value;
                    const credentials = request.data;
                    console.log(`credentials`, credentials);
                    const { username, password } = credentials;
                    let isValidLogin = username === "alice123" && password === "thisisapassword654";
                    console.log(`isValidLogin`, isValidLogin);
                    if (!isValidLogin) {
                        let loginError = new Error("Invalid user credentials");
                        loginError.name = "LoginError";
                        request.error(loginError);
                        return;
                    }
                    request.end();
                    socket.setAuthToken({
                        username: username,
                        channels: "channel",
                    });
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) await _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) await _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
})();
httpServer.listen(8000);
console.log("socketcluster WS server listening to port 8000 ...");
//# sourceMappingURL=index.js.map