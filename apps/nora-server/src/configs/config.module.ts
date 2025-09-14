import { DynamicModule, Module } from '@nestjs/common';
import { authConfig } from './auth.config';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import { mailConfig } from './mail.config';

const configurations = [authConfig, mailConfig];

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
