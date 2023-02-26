import { EventTypes } from './Constants';
import { Button, Image, MessageSharedBody } from './Objects';
import { HEX, StringUrl, Range } from './UtilTypes';

export interface WebhookRequest {
    url: string;
    event_types: EventTypes[];
    send_name: boolean;
    send_photo: boolean;
}

export interface TextBody extends MessageSharedBody {
    type: 'text';
    text: string;
}

export interface PictureBody extends MessageSharedBody {
    type: 'picture';
    text: string;
    media: Image;
    thumbnail?: Image;
}

export interface VideoBody extends MessageSharedBody {
    type: 'video';
    media: StringUrl;
    thumbnail: StringUrl;
    size?: number;
    duration?: number;
}

export interface FileBody extends MessageSharedBody {
    type: 'file';
    media: StringUrl;
    size: number;
    file_name: string;
}

export interface ContactBody extends MessageSharedBody {
    type: 'contact';
    contact: {
        name: string;
        phone_number: string;
    }
}

export interface LocationBody extends MessageSharedBody {
    type: 'location';
    location: {
        lat: string;
        log: string;
    }
}

export interface UrlBody extends MessageSharedBody {
    type: 'url';
    media: StringUrl;
}

export interface StickerBody extends MessageSharedBody {
    type: 'sticker';
    // https://developers.viber.com/docs/tools/sticker-ids/
    sticker_id: number;
}

export interface RichMedia {
    receiver: string;
    type: 'rich_media';
    min_api_version: number;
    rich_media: {
        Type: 'rich_media';
        ButtonsGroupColumns: Range<1, 7>;
        ButtonsGroupRows: Range<1, 8>;
        BgColor: HEX;
        Buttons: Button[];
    };
}


export type MessageBody = TextBody | PictureBody | VideoBody | FileBody |
    ContactBody | LocationBody | UrlBody | StickerBody;

export type Message = RichMedia | MessageBody;

export type Broadcast<T extends Message> = T & {
    broadcast_list: string[];
}
