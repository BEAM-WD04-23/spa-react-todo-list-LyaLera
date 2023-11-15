const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { validationResult, body, param } = require("express-validator");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))

const connectionStringOfDB = process.env.DATABASE_CONNECTION;


//connection to database
mongoose
.connect(connectionStringOfDB)
.then(() => {
    console.log("Connection to database successfull");
})
.catch((error) => {
    console.log("Connection failed");
});

const { Schema } = mongoose;

const taskSchema = new Schema({
  name: String,
  done: Boolean,
  id: String,
});

const ToDoApp = mongoose.model("task", taskSchema);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const validTask = [
  body("name")
    .notEmpty()
    .withMessage("Please type your task")
    .isLength({ min: 2, max: 25 })
    .matches(/^[A-Za-z\s]+$/)
    .trim()
    .escape(),

  body("done").isBoolean().notEmpty(),

  body("id").notEmpty().isUUID().trim().escape(),
];

app.get("/todos", async (req, res, next) => {
  try {
    let dataFromDB = await ToDoApp.find({});
    console.log(dataFromDB);
    res.status(200).json({
      success: true,
      data: dataFromDB,
    });
  } catch (err) {
    console.log(err);
    let errReport = new Error("Could not get data from DB");
    next(errReport);
  }
});

app.post("/todos", validTask, async (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      let newTaskToDB = await ToDoApp.create({
        name: req.body.name,
        done: req.body.done,
        id: req.body.id,
      });
      res.status(201).json({
        success: true,
        message: "New task saved",
      });
    } catch (err) {
      let errReport = new Error("Could not post data to DB");
      next(errReport);
    }
  } else {
    res.status(500).send({ errors: result.array() });
  }
});

app.put(
  "/todos/:id",
  param("id").isUUID(),
  validTask,
  async (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        let editedTaskInDB = await ToDoApp.updateOne(
          { id: req.params.id },
          { name: req.body.name, done: req.body.done, id: req.body.id }
        );
        console.log(editedTaskInDB);
        console.log(editedTaskInDB.modifiedCount);
        if (editedTaskInDB.modifiedCount) {
          res.status(201).json({
            success: true,
            message: "New task was updated",
          });
        } else {
          throw new Error("Could not edit data in a DB");
        }
      } catch (err) {
        let errReport = new Error("Could not edit data in a DB");
        next(errReport);
      }
    } else {
      res.status(500).send({ errors: result.array() });
    }
  }
);

app.delete("/todos/:id", param("id").isUUID(), async (req, res, next) => {
  try {
    let deletedTaskInDB = await ToDoApp.deleteOne({ id: req.params.id });
    console.log(deletedTaskInDB);
    if (deletedTaskInDB.deletedCount) {
      res.status(200).json({
        success: true,
        message: "Task was deleted.",
      });
    } else {
      throw new Error("Could not delete task in a Database");
    }
  } catch (err) {
    let errReport = new Error("Could not delete task in a DB");
    next(errReport);
  }
});

app.delete("/todos", async (req, res, next) => {
    try {
        let deletedAllTasksInDB = await ToDoApp.deleteMany({ });
        console.log(deletedAllTasksInDB);
          res.status(200).json({
            success: true,
            message: "Task was deleted.",
          });
      } catch (err) {
        let errReport = new Error("Could not delete all tasks in a DB");
        next(errReport);
      }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  (err.status = "fail"), (err.statusCode = 404);

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
