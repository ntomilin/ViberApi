import { post } from './requests';
import { SendMessageResponse, WebhookResponse } from './types/Responses';
import { MessageRequest, WebhookRequest } from './types/Requests';

// TODO: sending a welcome message (before user subscribed: https://developers.viber.com/docs/api/rest-bot-api/#sending-a-welcome-message)
class ViberBot {
    private readonly URL: string = 'https://chatapi.viber.com/pa';

    constructor(private readonly token: string) {
    }

    private getAuthorization() {
        return {
            'X-Viber-Auth-Token': this.token,
        };
    }

    // https://developers.viber.com/docs/api/rest-bot-api/#webhooks
    public async setWebhook(url: string): Promise<WebhookResponse> {
        return post<WebhookRequest>(`${ this.URL }/set_webhook`, {
            headers: {
                ...this.getAuthorization(),
            },
        }, {
            url,
            send_name: false,
            send_photo: false,
            event_types: [
                'conversation_started',
                'subscribed',
                'unsubscribed',
                'message'
            ],
        });
    }

    // https://developers.viber.com/docs/api/rest-bot-api/#send-message
    public async sendMessage(body: MessageRequest): Promise<SendMessageResponse> {
        return post<MessageRequest>(`${ this.URL }/send_message`, {
            headers: {
                ...this.getAuthorization(),
            }
        }, body);
    }
}

export default ViberBot;
