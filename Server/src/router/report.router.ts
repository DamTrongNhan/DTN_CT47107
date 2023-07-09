import express from "express";

import {
  getReport,
  getAllReports,
  createNewReport,
  deleteReport,
} from "@controller/report.controller";

export default (router: express.Router) => {
  router.get("/report/getReport/:id", getReport);
  router.get("/report/getAllReports/:id", getAllReports);
  router.post("/report/create", createNewReport);
  router.delete("/report/delete", deleteReport);
};
