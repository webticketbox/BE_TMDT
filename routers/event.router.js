const express = require("express");
const router = express.Router();

const {
    create,
    myEvent,
    listApproveEvent,
    approveEvent,
    listEvent,
    getEventById,
    getEventByUserId,
    deleteEvent,
} = require("../controllers/event.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/my-event/:id").get(asyncMiddelware(myEvent));
router.route("/approve-event/:id").put(asyncMiddelware(approveEvent));
router.route("/approve-event").get(asyncMiddelware(listApproveEvent));
router.route("/search").get(asyncMiddelware(listEvent));
router.route("/user/:id").get(asyncMiddelware(getEventByUserId));
router.route("/:id").get(asyncMiddelware(getEventById));
router.route("/:id").delete(asyncMiddelware(deleteEvent));
router.route("/").post(asyncMiddelware(create));

module.exports = router;