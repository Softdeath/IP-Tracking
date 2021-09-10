import yargs from "yargs";

type Yargs = {
    [x: string]: unknown;
    ip: string;
    language: string;
    _: (string | number)[];
    $0: string;
}

export const argv: Yargs = yargs
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

