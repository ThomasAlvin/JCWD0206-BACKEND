const fs = require('fs');
const moment = require('moment');

const log = (req, res, next) => {
 const date = moment().format('MMMM Do YYYY, h:mm:ss a'); // May 4th 2023, 10:44:54 am
 console.log(date);
 fs.appendFileSync(__dirname + '/../log/log.txt', date + '\n');
 next();
};

module.exports = log;
