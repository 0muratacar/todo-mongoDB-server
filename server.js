const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())


// Database local serverde çalıştırma
// ToDoApp adında DB
const db = "mongodb://localhost:27017/ToDoApp"

mongoose.connect(db, ({ useNewUrlParser: true }))
    .then(console.log("Connected to MongoDB"))
    .catch(err => console.log(err))

const todoSchema = new mongoose.Schema({
    title: String

})

const Todo = mongoose.model('todo', todoSchema)


// GET POST ve DELETE işlemleri
app.get("/todos", (request, res) => {
    Todo.find().then(todo => res.json(todo))

})

app.post("/todos", (request, res) => {
    const newTodo = new Todo({
        title: request.body.title
    })
    newTodo.save().then(todo => res.json(todo))
})

app.delete("/todos/:id", (request, res) => {
    Todo.findByIdAndDelete(request.params.id)
        .then(() => res.json({ remove: true }))

})

// Açılan port bilgisi
app.listen(4000, () => {
    console.log("server is running at port: 4000")
});