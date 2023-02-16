import { ErrorCodes, EventTypes } from './Constants';

export interface WebhookResponse {
    status: keyof (typeof ErrorCodes);
    status_message: string;
    event_types: EventTypes,
}
