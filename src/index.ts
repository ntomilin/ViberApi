import { post } from './requsts';

post('https://chatapi.viber.com/pa/send_message')
    .then((data) => {
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    });
