import { DynamicModule, Module } from '@nestjs/common';
import { authConfig } from './auth.config';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import { mailConfig } from './mail.config';
import { cacheConfig } from './cache.config';

const configurations = [authConfig, mailConfig, cacheConfig];

@Module({})
export class ConfigModule {
  static register(): DynamicModule {
    return {
      module: ConfigModule,
      imports: [
        BaseConfigModule.forRoot({
          isGlobal: true,
          load: configurations,
          cache: true,
          expandVariables: true,
          validationSchema: null, //add later
        }),
      ],
      exports: [BaseConfigModule],
    };
  }
}
