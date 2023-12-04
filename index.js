const express = require("express");
const app = express();
const port = 3000;

const fs = require("fs");
app.use(express.json());

const data = fs.readFileSync("./users.json", "utf8");
const users = JSON.parse(data);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//TODO: Read file and return users here
app.get("/users", (req, res) => {
  res.send(users);
});

// TODO: get first user of list
app.get("/firstUser", (req, res) => {
  let firstUser = users[0];
  res.send(firstUser);
});

//TODO: get last user of list
app.get("/lastUser", (req, res) => {
  let lastUser = users[users.length - 1];
  res.send(lastUser);
});

//TODO: get user object by id
app.get("/users/id/:id", (req, res) => {
  let id = req.params.id;
  let userId = users.find((le) => le.id === parseInt(id));
  res.send(userId);
});

//TODO: get user object by company name
app.get("/users/company/:company", (req, res) => {
  let company = req.params.company;
  let userCom = users.find((le) => le.company.name === company);
  res.send(userCom);
});

//TODO: get users that live in this city
app.get("/users/city/:city", (req, res) => {
  let city = req.params.city;
  let userCity = users.filter((le) => le.address && le.address.city === city);
  res.send(userCity);
});

// TODO: get street name by userID
app.get("/users/:id/street/", (req, res) => {
  let id = req.params.id;
  let userStreet = users.find((le) => le.id == id).address.street;
  res.send(userStreet);
});

//TODO: add new user to the list
app.post("/addUser", (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  let email = req.body.email;

  let newUser = { name, age, email };
  users.push(newUser);

  fs.writeFileSync("./users.json", JSON.stringify(users));
  res.send({ success: true });
});

//TODO: update email when id === userID
app.put("/users/update/:id", (req, res) => {
  let id = req.params.id;
  let email = req.body.email;
  let updateUser = users.find((le) => le.id === +id);
  updateUser.email = email;

  fs.writeFileSync("./users.json", JSON.stringify(users));
  res.send({ success: true });
});

//TODO: remove user when id === userID
app.delete("/users/delete/:id", (req, res) => {
  let id = req.params.id;
  let findUserIndex = users.findIndex((le) => le.id === +id);
  if (findUserIndex == -1) {
    res.send("User not found!");
  } else {
    users.splice(findUserIndex, 1);
  }
  fs.writeFileSync("./users.json", JSON.stringify(users));
  res.send("success");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
