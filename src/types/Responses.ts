import { ErrorCodes, EventTypes } from './Constants';
import { Enumerate } from './UtilTypes';

interface SharedResponseFields {
    status: keyof (typeof ErrorCodes);
    status_message: string;
}

export interface WebhookResponse extends SharedResponseFields {
    event_types: EventTypes;
}

export interface MessageResponse extends SharedResponseFields {
    message_token: string;
    billing_status: Enumerate<6>;// 1..5
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
