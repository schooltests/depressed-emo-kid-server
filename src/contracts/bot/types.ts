import { BotPayloadType } from 'nest-utils/dist/models';

export type BotKeyboard = {
  one_time?: boolean;
  inline?: boolean;
  buttons: {
    action: {
      type: 'text' | 'open_app' | 'open_link' | 'location' | 'vkpay' | 'callback';
      label?: string;
      payload?: BotPayloadType;

      app_id?: string;
      link?: string;
      hash?: string;
    };
    color?: 'primary' | 'secondary' | 'negative' | 'positive';
  }[][];
};

export type ClientInfo = {
  button_actions: ['text', 'vkpay', 'open_app', 'location', 'open_link', 'callback'];
  keyboard: boolean;
};
