import { Request } from './models/Request';
import { argv } from './config/yargs';

//* Make Request

const request: Request = new Request(argv.ip, argv.language);

// console.log(request.configData);
// console.log(request.configDataDebug);

request.makeRequest()
       .then( data => console.log( request.returnResponse(data) ))
       .catch( err => console.log(err));
