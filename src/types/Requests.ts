import { EventTypes, MessageType } from './Constants';

export interface WebhookRequest {
    url: string;
    event_types: EventTypes[];
    send_name: boolean;
    send_photo: boolean;
}

export interface SendMessageRequest {
    receiver: string;
    type: MessageType;
    sender: {
        name: string;
        avatar?: string;
        tracking_data?: string;
        min_api_version?: string;
    }
}
