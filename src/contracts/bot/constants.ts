import { appId } from 'src/constants';
import { AdminCommands, UserCommands } from './enums';
import { BotKeyboard } from './types';

export const emptyKeyboard = { buttons: [], one_time: true };

export const userCommandsList = Object.values(UserCommands);
export const adminCommandsList = Object.values(AdminCommands);

export const predefinedReplies = {
  hello: `Пошел нахуй`,
  test: 'Создайте свой тест на дружбу',
};

export const predefinedBotKeyBoards: {
  test: BotKeyboard;
} = {
  test: {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: 'open_app',
            app_id: `${appId}`,
            label: encodeURI('Открыть приложение'),
            payload: '',
          },
        },
      ],
    ],
  },
};
