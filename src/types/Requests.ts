import { EventTypes } from './Constants';
import { Image, MessageRequestShared } from './Objects';
import { StringUrl } from './UtilTypes';

export interface WebhookRequest {
    url: string;
    event_types: EventTypes[];
    send_name: boolean;
    send_photo: boolean;
}

export interface TextRequest extends MessageRequestShared {
    type: 'text';
    text: string;
}

export interface PictureRequest extends MessageRequestShared {
    type: 'picture';
    text: string;
    media: Image;
    thumbnail?: Image;
}

export interface VideoRequest extends MessageRequestShared {
    type: 'video';
    media: StringUrl;
    thumbnail: StringUrl;
    size?: number;
    duration?: number;
}

export interface FileRequest extends MessageRequestShared {
    type: 'file';
    media: StringUrl;
    size: number;
    file_name: string;
}

export interface ContactRequest extends MessageRequestShared {
    type: 'contact';
    contact: {
        name: string;
        phone_number: string;
    }
}

export interface LocationRequest extends MessageRequestShared {
    type: 'location';
    location: {
        lat: string;
        log: string;
    }
}

export interface UrlRequest extends MessageRequestShared {
    type: 'url';
    media: StringUrl;
}

export interface StickerRequest extends MessageRequestShared {
    type: 'sticker';
    // https://developers.viber.com/docs/tools/sticker-ids/
    sticker_id: number;
}

export type MessageRequest = TextRequest | PictureRequest | VideoRequest | FileRequest |
    ContactRequest | LocationRequest | UrlRequest | StickerRequest;
