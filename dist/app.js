"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = require("./models/Request");
const yargs_1 = require("./config/yargs");
//* Make Request
const request = new Request_1.Request(yargs_1.argv.ip, yargs_1.argv.language);
// console.log(request.configData);
// console.log(request.configDataDebug);
request.makeRequest()
    .then(data => console.log(request.returnResponse(data)))
    .catch(err => console.log(err));
//# sourceMappingURL=app.js.map