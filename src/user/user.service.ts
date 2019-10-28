import * as ejs from 'ejs';
import { logger } from '../app/app.logger';
import * as appRoot from 'app-root-path';
import * as nodemailer from 'nodemailer';
import { IUser } from './user.interface';

// Setting transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true
});

class UserService {
  public async sendMailInscription(user: IUser) {
    return await this.sendMail(user);
  }

  private async sendMail(user: IUser): Promise<IUser> {
    const formatedMail = (await this.renderMail(`${appRoot}/public/email.ejs`, {
      email: user.email
    })) as any;

    return this.sendMailByTransporter(user, formatedMail);
  }

  private setMainOption(
    user: IUser,
    dataFormat: string | undefined | {}
  ): object {
    return {
      from: 'kazekageoftheball@gmail.com',
      to: 'aili.fida.ac@gmail.com',
      subject: `Je suis un test`,
      html: dataFormat,
      text: 'This is the email content'
    };
  }

  private sendMailByTransporter(
    user: IUser,
    formatedMail: object
  ): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const mainOptions = this.setMainOption(user, formatedMail);
      transporter.sendMail(mainOptions, (error, info) => {
        if (error) {
          logger.info(transporter);
          logger.error(error.message);
          reject({ error });
        } else {
          logger.info(`Message sent: ${info.response}`);
          resolve(user);
        }
      });
    });
  }

  private renderMail(template: string, variable: object) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(template, variable, (err, data) => {
        if (err) {
          logger.error(err.message);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

export const userService = new UserService();
