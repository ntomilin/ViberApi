import { post } from './requests';
import { WebhookResponse } from './types/Responses';
import { WebhookRequest } from './types/Requests';

class ViberBot {
    private readonly URL: string = 'https://chatapi.viber.com/pa';

    constructor(private readonly token: string) {
    }

    // https://developers.viber.com/docs/api/rest-bot-api/#webhooks
    public async setWebhook(url: string): Promise<WebhookResponse> {
        return post<WebhookRequest>(`${ this.URL }/set_webhook`, {
            headers: {
                'X-Viber-Auth-Token': this.token,
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
}

export default ViberBot;
