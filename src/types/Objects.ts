import { HEX, ImageMime, StringUrl, Range, HTMLString } from './UtilTypes';
import { EventTypes, MessageType } from './Constants';

export interface ViberApiMessageShared {
    receiver: string;
    type: MessageType;
    sender: {
        name: string;
        avatar?: string;
    };
    tracking_data?: string;
    min_api_version?: string;
    keyboard?: Keyboard;
}

type MessageOptionalFields = Partial<Pick<ViberApiMessageShared, 'tracking_data' | 'min_api_version' | 'keyboard' | 'sender'>>
type MessageRequiredFields = Pick<ViberApiMessageShared, 'receiver' | 'type'>;

export type MessageSharedBody = MessageOptionalFields & MessageRequiredFields;

export type Image = `${StringUrl}${ImageMime}`;

export type UserProfile = {
    id: string;
    name: string;
    avatar: StringUrl;
    country: string;
    language: string;
    api_version: number;
}

export interface Keyboard {
    Buttons: Button[];

    BgColor?: HEX;
    DefaultHeight?: boolean;
    CustomDefaultHeight?: Range<40, 71>;
    HeightScale?: number;
    ButtonsGroupColumns?: Range<1, 7>;
    ButtonsGroupRows?: Range<1, 8>;
    InputFieldState?: 'regular' | 'minimized' | 'hidden';
    FavoritesMetadata?: {}; // TODO: describe: https://developers.viber.com/docs/tools/keyboards/#favoritesMetadata
}

export interface Button {
    Text?: string | HTMLString;
    Rows?: Range<1, 7>;
    Columns?: Range<1, 7>;
    ActionType?: 'reply' | 'open-url' | 'location-picker' | 'share-phone' | 'none';
    ActionBody?: 'text' | StringUrl;
    BgColor?: HEX;
    Image?: StringUrl;

    Silent?: boolean;
    BgMediaType?: 'picture' | 'gif';
    BgMedia?: StringUrl;
    BgMediaScaleType?: 'crop' | 'fill' | 'fit';
    ImageScaleType?: 'crop' | 'fill' | 'fit';
    BgLoop?: boolean;

    // TODO: finish
}

interface Broadcasts {
    // TODO: finish
}

interface EventShared {
    event: EventTypes;
    timestamp: number;
    message_token: number;
}

export interface SubscribedEvent extends EventShared {
    event: 'subscribed';
    user: UserProfile;
}

export interface UnsubscribeEvent extends EventShared {
    event: 'unsubscribed';
    user_id: string;
}

export interface ConversationStartedEvent extends EventShared {
    event: 'conversation_started';
    type: 'open';
    context: string;
    user: UserProfile;
    subscribed: boolean;
}

export interface MessageEvent extends EventShared {
    event: 'message';
    sender: UserProfile;
    message: MessageSharedBody;
}

export type SetWebhookOptions = {
    event_types?: EventTypes[];
    send_name?: boolean;
    send_photo?: boolean;
}

export type ViberBotOptions = {
    token: string;
    name: string;
    image: StringUrl;
}
