import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailSenderService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(mailOptions: ISendMailOptions) {
    try {
      await this.mailerService.sendMail({
        ...mailOptions,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async oneTimePasscodeEmailOptions(oneTimePasscode: string) {
    return {
      subject: 'Your One-Time Passcode',
      template: 'normal',
      context: {
        oneTimePasscode: oneTimePasscode.split(''),
        partialBody: 'one-time-passcode',
      },
    };
  }
}
