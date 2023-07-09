import UserModel from "@models/user.model";
import mongoose, { FilterQuery } from "mongoose";
import { INotificationFull } from "@interfaces/model/notifications";
import { sendEmail as doSendEmail } from "@controller/mailing.controller";
import {
  default as Notification,
  INotificationsModel,
} from "@models/notifications.model";

export type NotificationResponse = {
  status: boolean;
  message: string;
  failedEmails: string[];
};

const checkValidObjectId = (objectid: any): mongoose.Types.ObjectId => {
  return mongoose.Types.ObjectId.isValid(objectid) ? objectid : null;
};

export const createNewNotification = (
  data: INotificationFull
): Promise<NotificationResponse> => {
  return new Promise(async (resolve, reject) => {
    if (!checkValidObjectId(data.sender)) reject(Error("Invalid sender id!"));
    const senderResults = await UserModel.find({
      $or: [{ _id: data.sender }, { village_id: data.sender }],
    }).exec();
    if (!senderResults) reject(Error(`Sender id not found: ${data.sender}`));
    else {
      new Notification<INotificationsModel>({
        ...(data as INotificationsModel),
        read: false,
      })
        .save()
        .then((noti) => {
          const response: NotificationResponse = {
            status: undefined,
            message: "",
            failedEmails: [],
          };

          // created Notification document successfully
          if (noti) {
            response.status = true;
            response.message = `Created notification`;
            // if Send mails is included
            if (data.sendEmail === true) {
              doSendEmail(noti)
                .then((failedEmails: string[]) => {
                  response.failedEmails = failedEmails; // receiverId[] which is not in Users collection
                })
                .catch((error) => {
                  response.message += ` but send emails failed: ${error.message}`;
                });
            }
          } else {
            response.status = false;
            response.message = `Error saving notification.`;
          }
          resolve(response);
        })
        .catch((err) => reject(Error(err.message)));
    }
  });
};

export const create = async (req: any, res: any) => {
  if (!req.body.sender)
    return res.status(422).json({ status: false, message: "missing sender" });
  if (!req.body.receivers)
    return res
      .status(422)
      .json({ status: false, message: "missing receivers" });
  if (!req.body.header || !req.body.body)
    return res
      .status(422)
      .json({ status: false, message: "missing header or body" });

  const receivers = req.body.receivers as string[];
  const { sender, header, body, sendemail } = req.body;

  await createNewNotification({
    sender,
    receivers,
    header,
    body,
    sendEmail: sendemail,
  } as INotificationFull)
    .then((response: NotificationResponse) => res.json(response))
    .catch((err: Error) =>
      res.status(500).json({ status: false, message: err.message })
    );
};

export const fetch = async (req: any, res: any) => {
  const uid = req.body.id;
  const filter: INotificationsModel = req.body.filter;

  const filters: FilterQuery<INotificationsModel> = filter;
  const options = { projection: { _id: 0 }, limit: 10 };
  try {
    await Notification.find(
      {
        receivers: {
          $in: [uid],
        },
        ...filters,
      },
      {},
      options
    )
      .exec()
      .then((result) => res.json({ status: true, result }))
      .catch((error) => res.status(500).send(error));
  } catch (error) {
    return res.status(500).send({
      message: "Error while retrieving notifications: " + error.message,
    });
  }
};

export const read = async (req: any, res: any) => {
  const nid = req.params.notificationid;
  try {
    await Notification.findByIdAndUpdate(nid, { read: true })
      .then((result: INotificationsModel) => {
        if (result) {
          // this result still has read = false
          result.read = true;
          res.json({ status: true, result });
        } else {
          res.status(404).send({ message: "Notification not found" });
        }
      })
      .catch((error) => res.status(500).send(error));
  } catch (error) {
    return res.status(500).send({
      message: "Error while retrieving notification: " + error.message,
    });
  }
};
export const markUnread = async (req: any, res: any) => {
  const nid = req.params.notificationid;
  try {
    await Notification.findByIdAndUpdate(nid, { read: false })
      .then((result: INotificationsModel) => {
        if (result) {
          // this result still has read = false
          result.read = false;
          res.json({ status: true, result });
        } else {
          res
            .status(404)
            .json({ status: false, message: "Notification not found" });
        }
      })
      .catch((error) => res.status(500).send(error));
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Error while retrieving notification: " + error.message,
    });
  }
};