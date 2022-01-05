import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisCacheModule, vk } from 'nest-utils';
import { BotModule } from './bot/bot.module';
import { cacheConfig } from './config/cache.config';
import { coreConfig } from './config/core.config';
import { dbConfig } from './config/db.config';
import { integrationConfig } from './config/integration.config';
import { vkConfig } from './config/vk.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig, cacheConfig, coreConfig, integrationConfig, vkConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        ...(configService.get<string>('database.psqlUrl')
          ? {
              url: configService.get<string>('database.psqlUrl'),
            }
          : {
              host: configService.get<string>('database.host'),
              port: configService.get<number>('database.port'),
              username: configService.get<string>('database.username'),
              password: configService.get<string>('database.password'),
              database: configService.get<string>('database.dbName'),
            }),
        entities: [__dirname + '/db/client/tables/*{.ts,.js}'],
        migrations: [__dirname + '/db/client/migrations/*{.ts,.js}'],
        synchronize: false,
        migrationsRun: true,
        logNotifications: true,
        logger: 'advanced-console',
        logging: configService.get<boolean>('core.devMode')
          ? ['query', 'schema', 'error', 'warn']
          : ['migration', 'error', 'warn'],
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    ScheduleModule.forRoot(),
    RedisCacheModule,
    BotModule,
  ],
  controllers: [],
  providers: [vk.VkLongpollService],
})
export class AppModule {}
