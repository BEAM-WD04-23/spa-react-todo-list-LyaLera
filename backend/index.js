const express = require('express')
const { validationResult, body, param } = require("express-validator");
const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World!")
})

let mockdata = [
    { text: "Build a to do app!", status: 'open', id: "779df936-5c55-4943-9c2b-fde29d1c1e54" },
    { text: "Learn SQL", status: 'open', id: '23ea14b5-0d59-4e55-94b7-cdb432f3628f'  },
    { text: "Practice JS on Codewars", status: 'open', id: '9e0fcd36-b8b1-4905-834b-e0e72796f5a5'   },
    { text: "Commit your code!", status: 'open', id: '92a4574e-7268-41a0-9a5f-e049e95e2e71'},
]

const validTask = [
    body("text")
    .notEmpty()
    .withMessage("Please type your task")
    .isLength({min: 2, max: 25})
    .matches(/^[A-Za-z\s]+$/)
    .trim()
    .escape(),

    body("status")
    .notEmpty()
    // .isIn(["open", "done"])
    .withMessage("Status could be only open or done")
    .trim()
    .escape(),

    body("id")
    .notEmpty()
    .isUUID()
    .trim()
    .escape()
]

app.get("/todos", (req, res) => {
    res.status(200).send("This is what you can do: " + mockdata.map(todo =>  todo.text))
})

app.post("/todos", validTask, (req, res) => {
    const result = validationResult(req)
    if(result.isEmpty()) {
        res.status(201).json({
            success: true,
            message: "New task saved"
        })
        mockdata.push(req.body)
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
            task.id == task.body.id
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

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //   status: 'fail',
    //   message: `Can't find ${req.originalUrl} on this server!`
    // });
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