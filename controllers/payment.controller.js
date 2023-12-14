const paymentModel = require("../models/payment.model");
const eventModel = require("../models/event.model");
const nodemailer = require("nodemailer");
const userModel = require("../models/user.model");

module.exports = {
    list: async (req, res) => {
        try {
            const data = await paymentModel
                .find({})
                .populate("user")
                .populate({
                    path: "event",
                    populate: {
                        path: "owner",
                    },
                });
            res.status(201).json(data);
        } catch (error) {
            throw error;
        }
    },

    create: async (req, res) => {
        try {
            const data = await paymentModel.create(req.body);
            const user = await userModel.findOne({ _id: req.body.user });
            const event = await eventModel.findOne({ _id: req.body.event });
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "trieuphucdinh1506@gmail.com", // Your email address
                    pass: "hwccnfkgecvdkryw", // Password (for gmail, your app password)
                },
            });
            if (user?.email) {
                await transporter.sendMail({
                    from: "trieuphucdinh1506@gmail.com",
                    to: user?.email,
                    subject: "Đặt vé thành công",
                    html: `
    <h1>Sự kiện ${event?.name}</h1>
    <p>Tên vé: ${req.body.name}</p>
    <p>Giá vé: ${req.body.price}</p>
    <p>Số lượng: ${req.body.number}</p>
    <p>Thanh toán: ${req.body.amount}</p>
    `,
                });
            }
            res.status(201).json(data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    getByUserId: async (req, res) => {
        try {
            const data = await paymentModel
                .find({ user: req.params.id })
                .populate("user")
                .populate("event");
            res.status(201).json(data);
        } catch (error) {
            throw error;
        }
    },

    getByEventId: async (req, res) => {
        try {
            const data = await paymentModel
                .find({
                    event: { $in: req.body?.listIdEvent },
                })
                .populate("user")
                .populate("event");
            res.status(201).json(data);
        } catch (error) {
            throw error;
        }
    },

    countTicketSell: async (req, res) => {
        try {
            const payments = await paymentModel.find({
                name: req.body.name,
                event: req.body.eventId,
            });

            let totalNumber = 0;

            payments.forEach((payment) => {
                totalNumber += Number(payment.number);
            });

            res.status(201).json({ totalNumber });
        } catch (error) {
            throw error;
        }
    },
};