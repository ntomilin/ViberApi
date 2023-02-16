import { post } from './requsts';

post('https://chatapi.viber.com/pa/send_message').then(console.log).catch(console.error);
