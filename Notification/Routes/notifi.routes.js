const express = require("express")
const router = express.Router();

const notificationController = require('../Controller/notifi.controller')

router.post("/notifiServ/api/v1/notifications", notificationController.acceptNotificationRequest);

router.get("/notifiServ/api/v1/notifications/:id", notificationController.getNotificationStatus);

module.exports = router;