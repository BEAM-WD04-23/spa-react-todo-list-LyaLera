const express = require('express')
const cors = require("cors")
const { validationResult, body, param } = require("express-validator");
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World!")
})

let mockdata = [
    { name: "Build a to do app", done: false, id: "779df936-5c55-4943-9c2b-fde29d1c1e54" },
    { name: "Learn SQL", done: false, id: '23ea14b5-0d59-4e55-94b7-cdb432f3628f'},
    { name: "Practice JS on Codewars", done: false, id: '9e0fcd36-b8b1-4905-834b-e0e72796f5a5'},
    { name: "Commit your code", done: false, id: '92a4574e-7268-41a0-9a5f-e049e95e2e71'},
]

const validTask = [
    body("name")
    .notEmpty()
    .withMessage("Please type your task")
    .isLength({min: 2, max: 25})
    .matches(/^[A-Za-z\s]+$/)
    .trim()
    .escape(),

    body("done")
    .isBoolean()
    .notEmpty(),

    body("id")
    .notEmpty()
    .isUUID()
    .trim()
    .escape()
]

app.get("/todos", (req, res) => {
    res.status(200).json({
        success: true,
        data: mockdata
    })
})

app.post("/todos", validTask, (req, res) => {
    const result = validationResult(req)
    if(result.isEmpty()) {
        res.status(201).json({
            success: true,
            message: "New task saved"
        })
        mockdata.push(req.body)
        console.log(req.body)
        console.log(mockdata)
    } else {
        res.status(400).send({errors: result.array()})
    }
})

app.put("/todos/:id", param("id").isUUID(), validTask, (req, res) => {
    const result = validationResult(req)
    if(result.isEmpty()) {
        res.status(200).json({
            success: true,
            message: "New task was updated"
        })
        let taskIndex = mockdata.findIndex(task => 
            task.id == req.body.id
        )
        mockdata[taskIndex] = req.body
        console.log(mockdata)
    } else {
        res.status(500).send({errors: result.array()})
    }
})

app.delete("/todos/:id", param("id").isUUID(), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Task was deleted."
    });
    let taskIndex = mockdata.findIndex(task => 
        task.id == req.params.id
    )
    mockdata.splice(taskIndex, 1)
    console.log(mockdata)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`)
    err.status = "fail",
    err.statusCode = 404

    next(err)
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}) 