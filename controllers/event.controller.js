const eventModel = require("../models/event.model");

module.exports = {
    listEvent: async (req, res) => {
        try {
            const { name, ...rest } = req.query;
            let query = { ...rest };
            if (name) {
                query = { ...query, name: { $regex: name, $options: "i" } };
            }

            const data = await eventModel.find(query).sort({ percent: -1 });
            res.status(201).json(data);
        } catch (error) {
            throw error;
        }
    },

    getEventById: async (req, res) => {
        try {
            const data = await eventModel.findOne({ _id: req.params.id });
            res.status(201).json(data);
        } catch (error) {
            throw error;
        }
    },

    getEventByUserId: async (req, res) => {
        try {
            const data = await eventModel.find({ owner: req.params.id });
            res.status(201).json(data);
        } catch (error) {
            throw error;
        }
    },

    listApproveEvent: async (req, res) => {
        try {
            const data = await eventModel.find({ isApprove: 0 });
            res.status(201).json(data);
        } catch (error) {
            throw error;
        }
    },

    create: async (req, res) => {
        try {
            const data = await eventModel.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            throw error;
        }
    },

    myEvent: async (req, res) => {
        try {
            const data = await eventModel.find({ owner: req.params.id });
            res.status(201).json(data);
        } catch (error) {
            throw error;
        }
    },

    approveEvent: async (req, res) => {
        try {
            const data = await eventModel.findByIdAndUpdate(req.params.id, {
                isApprove: 1,
            });
            res.status(201).json(data);
        } catch (error) {
            throw error;
        }
    },

    deleteEvent: async (req, res) => {
        try {
            await eventModel.findOneAndDelete({ _id: req.params.id });
            res.status(201).json("Xóa event thành công");
        } catch (error) {
            throw error;
        }
    },
};