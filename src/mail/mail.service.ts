import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import 'dotenv/config';
import { sendMailDto } from './dto/send-mail.dto';
import { sendMailPortfolioDto } from './dto/send-mail-portfolio.dto';

const sendgridKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridKey);

@Injectable()
export class MailService {
  async sendMail(newSendMail: sendMailDto) {
    try {
      const msg = {
        to: newSendMail.email, // A quien va dirigido el correo
        from: 'marianokuro@gmail.com', // Quien envia el correo (tiene que ser un sender verificado dentro de mi Sendgrid)
        subject: 'Presupuesto',
        text: `
          El presupuesto para este tipo de proyecto conmienza ${newSendMail.valorDesde}. Muchas gracias por su consulta, a la breveda le estaremos respondiendo su consulta, que tenga un buen día. 
          `,
      };
      await sgMail.send(msg);

      try {
        const msg = {
          to: 'marianokuro@gmail.com', // A quien va dirigido el correo
          from: 'marianokuro@gmail.com', // Quien envia el correo (tiene que ser un sender verificado dentro de mi Sendgrid)
          subject: 'Consulta de cliente',
          text: `
                  Nombre: ${newSendMail.name}.
                  E-mail:  ${newSendMail.email}.
                  Fecha: ${newSendMail.fecha}.
                  Servicio: ${newSendMail.servicio}.
                  Consulta:${newSendMail.msj}.    
              `,
        };
        await sgMail.send(msg);

        return new HttpException('todo ok', HttpStatus.OK);
      } catch (error) {
        return new HttpException(error, HttpStatus.CONFLICT);
      }
    } catch (error) {
      return new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  async sendMailPortfolio(newSendMail: sendMailPortfolioDto) {
    try {
      const msg = {
        to: newSendMail.email, // A quien va dirigido el correo
        from: 'marianokuro@gmail.com', // Quien envia el correo (tiene que ser un sender verificado dentro de mi Sendgrid)
        subject: 'Contacto',
        text: `
         Recivi su mail, a la brevedad le estaré respondiendo, gracias por comunicarse conmigo atentamente Mariano Dev.  
          `,
      };
      await sgMail.send(msg);

      try {
        const msg = {
          to: 'marianoaguilar1393@gmail.com', // A quien va dirigido el correo
          from: 'marianokuro@gmail.com', // Quien envia el correo (tiene que ser un sender verificado dentro de mi Sendgrid)
          subject: 'Consulta de cliente',
          text: `
                  Nombre: ${newSendMail.name}.
                  E-mail:  ${newSendMail.email}.
                  Consulta:${newSendMail.msj}.    
              `,
        };
        await sgMail.send(msg);

        return new HttpException('todo ok', HttpStatus.OK);
      } catch (error) {
        return new HttpException(error, HttpStatus.CONFLICT);
      }
    } catch (error) {
      return new HttpException(error, HttpStatus.CONFLICT);
    }
  }
}
