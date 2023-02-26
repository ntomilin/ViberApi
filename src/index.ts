import ViberBot from './ViberBot';
import { WebhookResponse } from './types/Responses';

const bot = new ViberBot({
    token: '5095c73ed127e7d0-3874cda21d4d23c-23f305933189511a',
    name: 'ViberBotFrame',
    image: '',
});

import express from 'express';

const app = express();
import bodyParser from 'body-parser';
import { TextBody } from './types/Requests';

app.listen(3000, () => {
    bot.setWebhook('https://9724-212-55-73-151.eu.ngrok.io/vb/wh')
        .then((data: WebhookResponse) => {
            // console.log(data);
        })
        .catch(console.error);
});

/*bot.on('message', async (req) => {
    await bot.sendMessage<TextBody>({
            receiver: req.body.sender.id,
            type: 'text',
            text: 'asd'
        });
});*/


const mw = bot.welcomeMessageMiddleware<TextBody>({
    type: 'text',
    text: 'heh!'
});

app.post('/vb/wh', [ bodyParser.json(), mw ], async (req: any, res: any) => {
    res.send();

    // if (req.body.event === 'conversation_started') {
    //     return bot.sendWelcomeMessage<TextBody>({
    //         type: 'text',
    //         text: 'Hi!'
    //     }, req, res);
    // }
    //
    if (req.body.event === 'message') {
        await bot.sendMessage<TextBody>({
            receiver: req.body.sender.id,
            type: 'text',
            text: 'asd'
        });
        return;
    }
});

