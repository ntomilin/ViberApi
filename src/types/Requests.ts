import { EventTypes } from './Constants';
import { Image, MessageRequestCommon } from './Objects';

export interface WebhookRequest {
    url: string;
    event_types: EventTypes[];
    send_name: boolean;
    send_photo: boolean;
}

export interface SendTextRequest extends MessageRequestCommon {
    type: 'text';
    text: string;
}

export interface SendPictureRequest extends MessageRequestCommon {
    type: 'picture';
    text: string;
    media: Image;
    thumbnail?: Image;
}

export type SendMessageRequest = SendTextRequest | SendPictureRequest;
