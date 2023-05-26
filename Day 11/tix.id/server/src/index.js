const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
const secret_key = process.env.secret_key;

const db = require("./models/");
const routes = require("./routes");
const { userController } = require("./controllers");
// db.sequelize.sync({ alter: true });

app.get("/", (req, res) => res.send("sequelize"));
app.use("/movieimg", express.static(`${__dirname}/public/movie`));
app.get("auth/image/render/:id", userController.renderAvatar);

app.use((req, res, next) => {
  console.log(req.headers);
  const secret = req.headers.authorization;
  if (secret == secret_key) {
    next();
  } else {
    res.status(500).send("authorization failed");
  }
});

app.use("/city", routes.cityRoutes);
app.use("/movie", routes.movieRoutes);
app.use("/order", routes.orderRoutes);
app.use("/orderitem", routes.orderItemRoutes);
app.use("/ticket", routes.ticketRoutes);
app.use("/schedule", routes.scheduleRoutes);
app.use("/theater", routes.theaterRoutes);

app.use("/auth", routes.userRoutes);
// app.use('/attendance', routes.programRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
