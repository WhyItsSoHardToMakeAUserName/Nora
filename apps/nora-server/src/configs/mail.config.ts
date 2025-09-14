import { ConfigType, registerAs } from '@nestjs/config';

export const mailConfig = registerAs('mail', () => ({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.MAIL_PORT ?? '465', 10),
  secure: process.env.MAIL_SECURE === 'true' || true, // true for 465
  auth: {
    user: process.env.MAIL_USER, // your Gmail address
    pass: process.env.MAIL_PASS, // your app password
  },
  sender: process.env.MAIL_FROM || '"Nora" <no-reply@custom.com>',
}));

export type IMailConfig = ConfigType<typeof mailConfig>;
