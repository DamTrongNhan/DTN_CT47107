import nodemailer from "nodemailer";
import mailServer from "@config/mailing/mailServer.config";
import INotifications from "@interfaces/model/notifications";
import userModel from "@models/user.model";
import notificationMailForm from "@config/mailing/notificationMailForm";
import UserDocument from "@interfaces/model/user";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port = 465, false for other ports
  auth: {
    user: mailServer.address,
    pass: mailServer.keypass,
  },
});

const sendEmail = (notification: INotifications) => {
  return new Promise(async (resolve, reject) => {
    let sender = null as UserDocument;
    let senderName = "";
    await userModel
      .findById(notification.sender)
      .then((user) => {
        sender = user;
        senderName = sender.fullName ? sender.fullName : sender.email;
      })
      .catch((err) => reject(Error(err.message || "Sender not found.")));
    notification.receivers.map(async (receiverId) => {
      const succeeded = [] as string[];
      const failed = [] as string[];
      await userModel
        .findById(receiverId)
        .exec()
        .then((user) => {
          if (user) {
            const receiverName = user.fullName ? user.fullName : user.email;
            const mail = {
              from: `${mailServer.name} <${mailServer.address}>`, // sender address
              to: user.email, // list of receivers
              subject: `Notification from VietCraft.vn`,
              html: notificationMailForm(
                senderName,
                receiverName,
                notification
              ), // html body
            };
            transporter.sendMail(mail, (error, info) => {
              console.log(error ? error : "Email sent: " + info.response);
            });
            succeeded.push(receiverId);
          } else {
            failed.push(receiverId);
          }
        })
        .catch((err) => false);
      resolve(failed);
    });
  });
};
export { sendEmail };
