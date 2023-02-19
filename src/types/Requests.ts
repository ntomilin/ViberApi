import { EventTypes } from './Constants';
import { Button, Image, MessageRequestShared } from './Objects';
import { HEX, StringUrl, Range } from './UtilTypes';

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

export interface RichMediaRequest {
    receiver: string;
    type: 'rich_media';
    min_api_version: number; // 7
    rich_media: {
        Type: 'rich_media';
        ButtonsGroupColumns: Range<1, 7>;// 6;
        ButtonsGroupRows: Range<1, 8>; // 7
        BgColor: HEX;
        Buttons: Button[];
    }
}

export type MessageRequest = TextRequest | PictureRequest | VideoRequest | FileRequest |
    ContactRequest | LocationRequest | UrlRequest | StickerRequest | RichMediaRequest;
