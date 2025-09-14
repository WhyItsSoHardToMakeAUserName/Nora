import { Module } from '@nestjs/common';
import { MailSenderService } from './mail-sender.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { IMailConfig, mailConfig } from '../../configs/mail.config';
import { ConfigModule } from '../../configs/config.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [mailConfig.KEY],
      useFactory: (mailConfig: IMailConfig) => ({
        transport: {
          host: mailConfig.host,
          port: mailConfig.port,
          secure: false,
          auth: {
            user: mailConfig.auth.user,
            pass: mailConfig.auth.pass,
          },
        },
        defaults: {
          from: mailConfig.sender,
        },
        template: {
          dir: __dirname + '/templates/pages',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        options: {
          partials: {
            dir: __dirname + '/templates/partials',
            options: {
              strict: true,
            },
          },
        },
      }),
    }),
  ],
  providers: [MailSenderService],
  exports: [MailSenderService],
})
export class MailSenderModule {}
