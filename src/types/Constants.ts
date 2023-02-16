import { Enumerate } from './UtilTypes';

// https://developers.viber.com/docs/api/rest-bot-api/#errorCodes
const ErrorCodes: Record<Enumerate<25> | 'other', string> = {
    0: 'ok',
    1: 'invalidUrl',
    2: 'invalidAuthToken',
    3: 'badData',
    4: 'missingData',
    5: 'receiverNotRegistered',
    6: 'receiverNotSubscribed',
    7: 'publicAccountBlocked',
    8: 'publicAccountNotFound',
    9: 'publicAccountSuspended',
    10: 'webhookNotSet',
    11: 'receiverNoSuitableDevice',
    12: 'tooManyRequests',
    13: 'apiVersionNotSupported',
    14: 'incompatibleWithVersion',
    15: 'publicAccountNotAuthorized',
    16: 'inchatReplyMessageNotAllowed',
    17: 'publicAccountIsNotInline',
    18: 'noPublicChat',
    19: 'cannotSendBroadcast',
    20: 'broadcastNotAllowed',
    21: 'unsupportedCountry',
    22: 'paymentUnsupported',
    23: 'freeMessagesExceeded',
    24: 'noBalance',
    other: 'General error',
};

type EventTypes = 'subscribed' | 'unsubscribed' | 'conversation_started' | 'delivered' | 'failed' | 'message' | 'seen';

export {
    ErrorCodes,
    EventTypes,
}
