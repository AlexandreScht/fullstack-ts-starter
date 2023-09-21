import config from '@config';
import { MailerError } from '@exceptions';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { join } from 'path';
import { Service } from 'typedi';
import util from 'util';

const { mailer, FRONT_URL } = config;

@Service()
class MailerServiceFile {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: mailer.HOST,
      port: parseInt(mailer.PORT),
      secure: true,
      auth: {
        user: mailer.USER,
        pass: mailer.PASSWORD,
      },
    });
  }

  private async sendMailAsync(mailOptions: nodemailer.SendMailOptions): Promise<void> {
    const sendMail = util.promisify(this.transporter.sendMail).bind(this.transporter);

    try {
      await sendMail(mailOptions);
    } catch (error) {
      throw new MailerError();
    }
  }

  public async Confirmation(email: string, userToken: string): Promise<void> {
    const templateDir: string = join(__dirname, mailer.DIR);
    const confirmationEmail = fs.readFileSync(join(templateDir, 'confirmation-mail.html'), { encoding: 'utf-8' });
    const htmlMailer = confirmationEmail.replaceAll('{{url}}', FRONT_URL + `login?token=${encodeURIComponent(userToken)}`);

    const mailOptions = {
      from: mailer.USER,
      to: email,
      subject: "Confirmation d'email typescriptTest",
      html: htmlMailer,
    };

    try {
      await this.sendMailAsync(mailOptions);
    } catch (error) {
      throw new MailerError();
    }
  }
}

export default MailerServiceFile;
