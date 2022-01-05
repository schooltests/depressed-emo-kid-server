import { registerAs } from '@nestjs/config';

export const integrationConfig = registerAs('integration', () => ({
  groupAccessKey: process.env.GROUP_ACCESS_KEY,
  groupId: process.env.VK_GROUP_ID,
  botConversationId: process.env.BOT_CONVERSATION_ID
}));
