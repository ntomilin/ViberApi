import { ErrorCodes, EventTypes, MessageType } from './Constants';
import { Enumerate } from './UtilTypes';

interface SharedResponseFields {
    status: keyof (typeof ErrorCodes);
    status_message: string;
}

export interface WebhookResponse extends SharedResponseFields {
    event_types: EventTypes,
}

export interface SendMessageResponse extends SharedResponseFields {
    message_token: string;
    billing_status: Enumerate<6>;// 1..5
}
