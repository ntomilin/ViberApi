import ViberBot from './ViberBot';
import { WebhookResponse } from './types/Responses';

const bot = new ViberBot('5095c73ed127e7d0-3874cda21d4d23c-23f305933189511a')

bot.setWebhook('https://https://mtomilin.dev/vb/wh')
    .then((data: WebhookResponse) => {
        console.log(data);
    })
    .catch(console.error);
