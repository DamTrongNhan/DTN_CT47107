import mongoose from "mongoose";
import { NextFunction } from "express";
import ReportModel from "@models/report.model";
import SmallHolderModel from "@models/smallHolder.model";
import SmallHolderDocument from "@interfaces/model/smallHolder";
import { INotificationFull } from "@interfaces/model/notifications";
import { createNewNotification } from "@controller/notification.controller";

const checkValidObjectId = (objectid: any): mongoose.Types.ObjectId => {
  return mongoose.Types.ObjectId.isValid(objectid) ? objectid : null;
};

export const getReport = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  return res.send("In progress");
};

export const getAllReports = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  // Hiện tại hệ thống chưa có JWT token nên dùng tạm parameter :id ở đây
  const adminId = new mongoose.Types.ObjectId(req.params.id);

  if (!checkValidObjectId(adminId)) {
    return res.status(500).json({
      status: false,
      message: "Invalid id",
    });
  }

  let reportResults: any = [];

  const filter:any = {}

  // get filter {village_id, dateReport}
  if(req.query.village_id) filter.village_id = req.query.village_id;
  if(req.query.dateReport) filter.dateReport = req.query.dateReport;
  console.log("prefilter:"+filter.dateReport);
  console.log(`Find by village_id - ${filter}`);

  // find villages whom were managed by user(admin_id)
  await SmallHolderModel.find({ admin_id: adminId })
  .then(async (smallHolderResults) => {
    if (smallHolderResults) {
      await Promise.all([
        ...smallHolderResults.map(async (smallHolderResult: any): Promise<any> => {
          if ((req.query.village_id && smallHolderResult.id === req.query.village_id) || (!req.query.village_id)){
            console.log(smallHolderResult.id + ":");
            filter.village_id = smallHolderResult.id;
            console.log(filter);
            const reportResult = await ReportModel.find( { ...filter });
            console.log(`DateReportType: ${new Date(reportResult[0].dateReport).getTime()}`);
            reportResults = [...reportResults, ...reportResult];
          } else {
            console.log(filter);
            console.log(smallHolderResult.id+"is not in filter");
          }
        }),
      ]).then(() => {
        res.status(200).json({
          status: true,
          data: reportResults,
        });
      });
    } else {
      return res.status(200).json({
        status: true,
        data: reportResults,
      });
    }
  })
  .catch((err) => res.status(500).json(err.message));

};

export const createNewReport = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  if (!req.body.smallHolderId || !req.body.productId || !req.body.quantity)
    return res.status(422).json({
      status: false,
      message: "Missing params, required: village_id, product_id, quantity",
    });

  const { smallHolderId, productId, quantity, sendEmail } = req.body;

  // retrieve sender, receiver:
  const smallHolder: SmallHolderDocument = await SmallHolderModel.findOne({
    _id: smallHolderId,
  }).exec();

  if (!checkValidObjectId(productId)) {
    return res.status(500).json({
      status: false,
      message: "Invalid product_id",
    });
  } else if (!checkValidObjectId(smallHolderId)) {
    return res.status(500).json({
      status: false,
      message: "Invalid village_id",
    });
  } else {
    const dateReport = Date.now();
    const newreport = await ReportModel.create({
      smallHolderId,
      productId,
      quantity,
      dateReport,
    });
    await newreport
      .save()
      .then(async (saveResult) => {
        await createNewNotification({
          sender: smallHolderId,
          receivers: [smallHolder.adminId.toString()],
          header: `[${dateReport}] - New report from village ${smallHolderId}!`,
          body: `${saveResult.id} : ${saveResult.productId} => ${saveResult.quantity}`,
          sendEmail,
        } as INotificationFull);
        return res.json({
          status: true,
          data: saveResult,
        });
      })
      .catch((err: Error) => {
        console.log(err);
        return next(err);
      });
  }
};

export const deleteReport = (req: any, res: any, next: NextFunction): void => {
  return res.json({ status: true });
};
