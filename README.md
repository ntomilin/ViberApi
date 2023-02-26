```typescript
app.post('/vb/wh', [bodyParser.json(), bot.welcomeMessageMiddleware(msg)], (req: any, res: any) => {
    // logic here
});
```

```typescript
app.post('/vb/wh', [ bodyParser.json() ], async (req: any, res: any) => {
    if (req.body.event === 'conversation_started') {
        return bot.sendWelcomeMessage(msg, req, res);
    }
    // logic here
});
```
