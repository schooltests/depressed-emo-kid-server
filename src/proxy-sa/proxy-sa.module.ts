import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ProxySAController } from './proxy-sa.controller';
import { ProxySAService } from './proxy-sa.service';

@Global()
@Module({
  imports: [HttpModule],
  controllers: [ProxySAController],
  providers: [ProxySAService],
})
export class ProxySA {}
