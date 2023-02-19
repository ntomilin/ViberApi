import { HEX, ImageMime, StringUrl, Range, HTMLString } from './UtilTypes';
import { MessageType } from './Constants';

export interface MessageRequestCommon {
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

export type Image = `${StringUrl}${ImageMime}`;

export interface Keyboard {
    Buttons: Button[];

    BgColor?: HEX;
    DefaultHeight?: boolean; // [false]
    CustomDefaultHeight?: Range<40, 71>;
    HeightScale?: number; // [100]
    ButtonsGroupColumns?: Range<1, 7>; // [6]
    ButtonsGroupRows?: Range<1, 8>; // [7 for Carousel] | [2 for Keyboard]
    InputFieldState?: 'regular' | 'minimized' | 'hidden'; // 'regular
    FavoritesMetadata?: {}; // TODO: describe: https://developers.viber.com/docs/tools/keyboards/#favoritesMetadata
}

interface Button {
    Text?: string | HTMLString;
    Rows?: Range<1, 7>; // [1-2] / [1-7 for Rich Media]
    Columns?: Range<1, 7>; // [6]
    ActionType?: 'reply' | 'open-url' | 'location-picker' | 'share-phone' | 'none'; // [reply]
    ActionBody?: 'text' | StringUrl;
    BgColor?: HEX;
    Image?: StringUrl;

    Silent?: boolean; // false
    BgMediaType?: 'picture' | 'gif'; //[picture]
    BgMedia?: StringUrl;
    BgMediaScaleType?: 'crop' | 'fill' | 'fit';
    ImageScaleType?: 'crop' | 'fill' | 'fit';
    BgLoop?: boolean; //[true]

    // TODO: finish
}

interface Broadcasts {
    // TODO: finish
}
