const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

const db = require("./models/");
const routes = require("./routes");
// db.sequelize.sync({ alter: true });

app.get("/", (req, res) => res.send("sequelize"));

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
