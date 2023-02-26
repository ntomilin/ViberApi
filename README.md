Let's take look an examples with express.
Creating a bot instance as ease as it is: 
```typescript
const bot = new ViberBot({
    token: 'your_token_here',
    name: 'bot_name',
    image: 'bot_image',
});
```

To set webhook:
```typescript
bot.setWebhook('https://example.com/viber/webhook')
```

Then there are few ways of using the bot.
1. Manually get the message from the route you provided to Viber, parse, do whatever you need and then call 
method to send the message.
2. Provide handlers for any type of message and then set a call middleware for a callback.


## 1. Using methods manually
```typescript
app.post('/vb/wh', [bodyParser.json()], async (req: any, res: any) => {
    res.send();
    /*
        Here you can implement any logic you want
        Make queries into database
        Call any other services
        Whatever
    */
    if (req.body.event === 'message') {
        await bot.sendMessage<TextBody>({
            receiver: req.body.message.receiver,
            type: 'text',
            text: 'asd'
        });
    }
});
```
Be sure to call `res.send()`. By doing that you'll tell the Viber, that you got the message, not processed it. 
In case Viber doesn't get the response in a few seconds, it will send the same to you again. That can cause issues. 
So be sure to give response to Viber as fast as possible. Keep tracking what events are coming to your handler.

## 2. Using webhook

At first let's define all the handlers for our messages:

```typescript
bot.on('message', async (req) => {
    await bot.sendMessage<TextBody>({
            receiver: req.body.sender.id,
            type: 'text',
            text: 'asd'
        });
});
```
Right after that let's set bot middleware to our path:
```typescript
app.post('/vb/wh', [bodyParser.json()], bot.middleware);
```

## Getting Bot info:
```typescript
const data = await bot.getBotInfo()
// Process data as you need to
```


## Notifications
Furthermore, you can make broadcasts (max 500 users per each broadcast):
```typescript
const failedMessages = bot.broadcast(data)
```

## Welcome message
Whenever user joins the bot, Viber allows to send a message. As far as user is not subscribed yet, we can send only one message
for each join. So it depends upon the user. Here you also can use few ways of doing it:

### 1. Using manually

```typescript
app.post('/vb/wh', [ bodyParser.json() ], async (req: any, res: any) => {
    // skip res.send() for this case
    // because Viber get's the message from the response we send
    // sendWelcomeMessage takes 'res' as a parameter to send a response
    
    if (req.body.event === 'conversation_started') {
        return bot.sendWelcomeMessage<TextBody>({
            type: 'text',
            text: 'Hi!'
        }, req, res);
    }
});
```

### 2. Using via webhook

```typescript
const mw = bot.welcomeMessageMiddleware<TextBody>({
    type: 'text',
    text: 'heh!'
});

app.post('/vb/wh', [ bodyParser.json(), mw ], async (req: any, res: any) => {
    res.send();
    // logic here
});
```
