const userRouter = require("./user.router");
const eventRouter = require("./event.router");
const paymentRouter = require("./payment.router");

const errorHandle = require("../middlewares/errorHandle");

module.exports = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/event", eventRouter);
  app.use("/api/payment", paymentRouter);

  app.use(errorHandle);
};