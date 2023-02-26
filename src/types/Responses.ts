import { ErrorCodes, EventTypes } from './Constants';
import { Enumerate, StringUrl } from './UtilTypes';

interface SharedResponseFields {
    status: keyof (typeof ErrorCodes);
    status_message: string;
}

export interface WebhookResponse extends SharedResponseFields {
    event_types: EventTypes;
}

export interface MessageResponse extends SharedResponseFields {
    message_token: string;
    billing_status: Enumerate<6>;
    chat_hostname: string;
}

export interface BroadcastResponse extends  SharedResponseFields{
    message_token: number;
    failed_list: Array<{
        receiver: string;
        status: keyof (typeof ErrorCodes);
        status_message: string;
    }>;
}

export interface GetBotInfoResponse {
    status: keyof (typeof ErrorCodes);
    status_message: string;
    id: string;
    name: string;
    uri: string;
    icon: StringUrl;
    background: StringUrl;
    category: string;
    subcategory: string;
    location: {
        lon: number;
        lat: number;
    };
    country: string;
    webhook: StringUrl;
    event_types: EventTypes[];
    subscribers_count: number;
    members: Array<{
        id: string;
        name: string;
        avatar: StringUrl;
        role: string; // DEPRECATED
    }>
}
