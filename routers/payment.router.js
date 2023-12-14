const express = require("express");
const router = express.Router();

const {
    create,
    list,
    getByUserId,
    getByEventId,
    countTicketSell,
} = require("../controllers/payment.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/").post(asyncMiddelware(create));
router.route("/").get(asyncMiddelware(list));
router.route("/user/:id").get(asyncMiddelware(getByUserId));
router.route("/event").post(asyncMiddelware(getByEventId));
router.route("/count-ticket-sell").post(asyncMiddelware(countTicketSell));

module.exports = router;