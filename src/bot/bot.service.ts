import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { BusEvent, EventBus, vk } from 'nest-utils';
import { VkNewMessageEvent } from 'nest-utils/dist/models';
import { integrationConfig } from 'src/config/integration.config';
import {
  BotKeyboard,
  emptyKeyboard,
  predefinedBotKeyBoards,
  predefinedReplies,
  UserCommands,
  userCommandsList,
} from 'src/contracts/bot';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);
  constructor(
    @Inject(integrationConfig.KEY)
    private readonly config: ConfigType<typeof integrationConfig>,
    private readonly vkService: vk.VkApiService,
  ) {
    EventBus.on(BusEvent.VkLongPollMessages, ({ messages }) => {
      this.watchUpdates(messages);
    });
  }

  private watchUpdates(updates: VkNewMessageEvent[]) {
    updates.forEach(u => {
      const command = u.object.message.text?.toLowerCase() ?? '';

      if (userCommandsList.includes(command as UserCommands)) {
        this.mapUserCommands(u);
      }
    });
  }

  private mapUserCommands(update: VkNewMessageEvent) {
    switch (update.object.message.text?.toLowerCase()) {
      case UserCommands.Begin:
      case UserCommands.Hi:
      case UserCommands.Start:
        this.sendSimpleReply(predefinedReplies.hello, update.object.message.peer_id);
        break;

      case UserCommands.Test:
      case UserCommands.Testfriendship:
        this.sendSimpleReply(predefinedReplies.test, update.object.message.peer_id, predefinedBotKeyBoards.test);
        break;

      default:
        break;
    }
  }

  private sendSimpleReply(message: string, peerId: number, keyboard: BotKeyboard = emptyKeyboard) {
    this.vkService.sendMessageToUser(keyboard, message, peerId, this.config.groupAccessKey ?? '');
  }
}
