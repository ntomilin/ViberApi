import { EventTypes } from './Constants';
import { Image, MessageRequestShared } from './Objects';

export interface WebhookRequest {
    url: string;
    event_types: EventTypes[];
    send_name: boolean;
    send_photo: boolean;
}

export interface SendTextRequest extends MessageRequestShared {
    type: 'text';
    text: string;
}

export interface SendPictureRequest extends MessageRequestShared {
    type: 'picture';
    text: string;
    media: Image;
    thumbnail?: Image;
}

export type SendMessageRequest = SendTextRequest | SendPictureRequest;
