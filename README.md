# About

Simple package that makes requests to Viber.

Package works only with 'express' server. Keep in mind, that you should use `body-parser` to parse body from the Viber.
Package is not configured to use it, as there is no any server under the hood.

Be careful about calling `res.send()`. Viber waits few seconds to get response on his request.
When you respond to Viber with 200, that means you got the message and will process it. Viber does not responsible for your
operations to be valid. If you forget to send 200 to the Viber, the message will be sent again in a few seconds, not once. You'll get
duplicate of the original message for a few times.

Also, be aware that package does NOT make any validations, described by the Viber API documentation.
You have to make all the validations by yourself. Package only makes requests and return an error, if such occurs.


# Usage

## Creating
```typescript
const bot = new ViberBot({
    token: 'your_token_here',
    name: 'bot_name',
    image: 'bot_image',
});
```



## Setting Webhook
```typescript
await bot.setWebhook('https://example.com/viber/webhook')
```



## Handler

### Manually

Take a look, that we respond to a Viber first, then we make our own logic.

```typescript
app.post('/vb/wh', async (req: any, res: any) => {
    res.send();
    
    // your code
    
    if (req.body.event === 'message') {
        await bot.sendMessage<TextBody>({
            receiver: req.body.message.receiver,
            type: 'text',
            text: 'asd'
        });
    }
});
```



### Via Webhook

At first let's define a handler for a messages, that are market with `message` type.

```typescript
bot.on('message', async (req) => {
    
    // your code
    
    await bot.sendMessage<TextBody>({
            receiver: req.body.sender.id,
            type: 'text',
            text: 'asd'
        });
});
```
Right after that let's set bot middleware to our path:
```typescript
app.post('/vb/wh', bot.middleware);
```



## Getting Bot Info
```typescript
const data = await bot.getBotInfo()

//  your code

```



## Notifications
Furthermore, you can make broadcasts (max 500 users per each broadcast):
```typescript
const failedMessages = bot.broadcast(data)
```



## Welcome Message

### Manually
```typescript
app.post('/vb/wh', async (req: any, res: any) => {
    
    // your code
    
    if (req.body.event === 'conversation_started') {
        return bot.sendWelcomeMessage<TextBody>({
            type: 'text',
            text: 'Hi!'
        }, req, res);
    }
});
```



### Via Webhook
```typescript
const mw = bot.welcomeMessageMiddleware<TextBody>({
    type: 'text',
    text: 'heh!'
});

app.post('/vb/wh', [mw], async (req: any, res: any) => {
    res.send();

    // your code

});
```
