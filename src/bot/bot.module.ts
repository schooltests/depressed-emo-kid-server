import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { vk } from 'nest-utils';
import { BotService } from './bot.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [BotService, vk.VkApiService],
  exports: [BotService],
})
export class BotModule {}
