const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

const db = require('./models/');
// const Branch = db.Branch;
// const Lecturer = db.Lecturer;
// Lecturer.sync();
// Branch.sync();
db.sequelize.sync({ alter: true });

app.get('/', (req, res) => res.send('sequelize'));

app.listen(PORT, () => {
 console.log(`server is running on port ${PORT}`);
});
