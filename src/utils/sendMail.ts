import httpStatus from 'http-status';
import nodemailer from 'nodemailer';
import config from '../config';
import ApiError from '../errors/ApiError';

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

export const sendEmail = (to: string, subject: string, data: string) => {
  // prepare mailOptions
  const mailOptions = {
    from: `Cleano <${config.mail.email}>`,
    to: to,
    subject: subject,
    html: data,
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mail.email,
      pass: config.mail.password,
    },
  });

  //   console.log(mailOptions)
  //   send mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Couldn't send email"
      );
    } else {
      //   console.log('Email sent: ' + info.response);
      return info;
    }
  });
};
