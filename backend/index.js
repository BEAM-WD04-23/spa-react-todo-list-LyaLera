const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.send("Hello World!")
})

let mockdata = [
    { text: "Build a to do app!", status: 'open', id: '1' },
    { text: "Learn SQL", status: 'open', id: '2'  },
    { text: "Practice JS on Codewars", status: 'open', id: '3'   },
    { text: "Commit your code!", status: 'open', id: '4'},
    { text: "Relax", status: 'open', id: '5' },
    { text: "Test the app", status: 'open', id: '6' },
]

app.get("/todos", (req, res) => {
    res.status(200).send("This is what you can do: " + mockdata.map(todo =>  todo.id + ". " + todo.text  + " "))
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

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})