const express = require('express');
const cors = require('cors');
const db = require('./app/models');

const Role = db.role;

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log(`Drop and Resync Db`);
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: 'user',
//   });
//   Role.create({
//     id: 2,
//     name: 'moderator',
//   });
//   Role.create({
//     id: 3,
//     name: 'admin',
//   });
// }

// simple test-route
app.get('/', (req, res) => {
  res.json({
    message: `That's rright, bang a uey and off you go!`,
  });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
