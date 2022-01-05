import { ConfigObject, registerAs } from '@nestjs/config';
import { VkAppName } from 'src/adapters/vk-app.adapter';

type Keys = () => Record<VkAppName, { serviceKey?: string; secretKey?: string }>;

export const vkConfig = registerAs<ConfigObject, Keys>('vk', () => ({
  emoKid: {
    serviceKey: process.env.EM_SERVICE_KEY,
    secretKey: process.env.EM_SECRET_KEY,
  },
}));
