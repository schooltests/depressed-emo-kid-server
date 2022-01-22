import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { GraphService } from './graph.service';
import { ProxySAController } from './proxy-sa.controller';
import { ProxySAService } from './proxy-sa.service';

@Global()
@Module({
  imports: [HttpModule],
  controllers: [ProxySAController],
  providers: [ProxySAService, GraphService],
})
export class ProxySA {}
