const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const jwtSecret = "JWT_SECRET";

app.use(cors());
app.use(bodyParser.json());

let messages = [{text: "yes", user: "Jim"}, {user: "Helen", text: "hi"}];
let users = [{ userName: "Jim", userId: 1}, { userName: "Helen", userId: 0 }];

app.get("/messages", (req, res) => {
  res.send(messages);
})

app.post('/messages', (req, res) => {
  try {
    const token = req.header('Authorization')
    const userId = jwt.decode(token, jwtSecret)
    const user = users[userId]
    let msg = { user: user.userName, text: req.body.message }
    messages.push(msg);
    res.json(msg);
  } catch (err) {
    console.error(error)
  }
})

app.get('/messages/:id', (req, res) => {
  res.send(messages[Number(req.params.id)]);
})

app.post('/register', (req, res) => {
  let registerData = req.body;

  let newIndex = users.push(registerData);
  let userId = newIndex - 1;

  let token = jwt.sign(userId, jwtSecret); // just for experiment

  res.json(token)
})

app.listen(port, () => console.log(`app running on port ${port}!`))
