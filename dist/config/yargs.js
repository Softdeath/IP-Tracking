"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.argv = void 0;
const yargs_1 = __importDefault(require("yargs"));
exports.argv = yargs_1.default
    .option({
    'ip': {
        alias: 'i',
        type: 'string',
        demandOption: true,
        describe: 'IP to track'
    },
    'language': {
        alias: 'l',
        type: 'string',
        demandOption: false,
        default: 'en',
        describe: 'Select the language to translate. Valid Options: en, es, de, fr, ja, pt-br, ru, zh'
    }
})
    .help()
    .alias('help', 'h')
    .parseSync();
//# sourceMappingURL=yargs.js.map