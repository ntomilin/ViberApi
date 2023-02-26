import { post } from './requests';
import { BroadcastResponse, GetBotInfoResponse, MessageResponse, WebhookResponse } from './types/Responses';
import { Broadcast, Message, MessageBody, RichMedia, WebhookRequest } from './types/Requests';
import { SetWebhookOptions, ViberBotOptions } from './types/Objects';
import { StringUrl } from './types/UtilTypes';
import { EventTypes } from './types/Constants';

class ViberBot {
    private readonly URL: string = 'https://chatapi.viber.com/pa';
    private webhookUrl: string = '';

    private readonly name: string;
    private readonly image: StringUrl;
    private readonly token: string;

    private readonly handlers: Map<EventTypes, (req: any, res: any) => Promise<void>> = new Map();

    constructor(config: ViberBotOptions) {
        this.name = config.name;
        this.image = config.image;
        this.token = config.token;
    }

    private getAuthorization() {
        return {
            'X-Viber-Auth-Token': this.token,
        };
    }

    public async setWebhook(url: string, options?: SetWebhookOptions): Promise<WebhookResponse> {
        this.webhookUrl = url;
        return post<WebhookRequest>(`${ this.URL }/set_webhook`, {
            headers: {
                ...this.getAuthorization(),
            },
        }, {
            url,
            send_name: options?.send_name ?? false,
            send_photo: options?.send_photo ?? false,
            event_types: options?.event_types ?? [
                'conversation_started',
                'subscribed',
                'unsubscribed',
                'message'
            ],
        });
    }

    public async getBotInfo(): Promise<GetBotInfoResponse> {
        return post(`${ this.URL }/get_account_info`, {
            headers: {
                ...this.getAuthorization(),
            }
        }, {});
    }

    private buildMessage<T extends MessageBody>(body: T): T {
        return {
            sender: {
                name: this.name,
                avatar: this.image,
            },
            ...body,
        };
    }

    public async sendMessage<T extends Message>(body: T): Promise<MessageResponse> {
        let parsedBody =
            body.type === 'rich_media' ? (body as RichMedia) :
                this.buildMessage(body) as MessageBody;

        return post<typeof parsedBody>(`${ this.URL }/send_message`, {
            headers: {
                ...this.getAuthorization(),
            }
        }, parsedBody);
    }

    public async broadcast<T extends Broadcast<Message>>(body: Broadcast<T>): Promise<BroadcastResponse> {
        return post<T>(`${ this.URL }/broadcast_message`, {
            headers: {
                ...this.getAuthorization(),
            }
        }, body);
    }

    public welcomeMessageMiddleware<T extends Message>(message: Omit<T, 'receiver'>): Function {
        return (req: any, res: any, next: any) => {
            if (req?.body?.event === 'conversation_started') {
                this.sendWelcomeMessage(message, req, res);
            }
            return next();
        };
    }

    public sendWelcomeMessage<T extends Message>(message: Omit<T, 'receiver'>, req: any, res: any): void {
        return res.send({
            sender: {
                name: req.body.user.name,
            },
            ...message
        });
    }

    public on(event: EventTypes, handler: (req: any, res: any) => Promise<void>) {
        this.handlers.set(event, handler);
    }

    public async middleware(req: any, res: any) {
        const { type } = req.body.message;

        const handler = this.handlers.get(type);

        if (!handler) {
            throw new Error(`No handler provided for type ${ type }`);
        }

        await handler(req, res);
    }
}

export default ViberBot;
