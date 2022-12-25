/* CommonJS can be recognized by the use of the require() function and module.exports,
 while ES modules use import and export statements for similar (though not identical) functionality. */


//const http = require('http') // deleted after installing Express
const { response, request } = require('express')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
//++++++++++++++++++++++++++++++
app.use(express.static('build'))
//++++++++++++++++++++++++++++++

//find out the largest id number in the current list and assign it to the maxId variable.
const generatedId = () =>{
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

// activate the json-parser In order to access the data easily
app.use(express.json())
// ^^^ this is the json parser
// hardcoded list of notes in the JSON format
let notes = [
    {
        id: 1,    content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    }]

//deleted after installing express
/* const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
}) */

// GET request to Root
app.get('/', (request, response) => {
    response.send('<h1>Hello World!!!</h1>')
})

// Get request to api/notes
app.get('/api/notes' , (request, response) => {
    response.json(notes)
})

// ============== GET request for a single resource ============================
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    // finding the specified note (wit its id)
    const note = notes.find(note => {
        console.log(note.id, typeof note.id, id, typeof id, 'Is note.id === id?',note.id === id)
        return note.id ===id
    })
    if(note){
        response.send(note)
    } else {
        response.statusMessage = "unable to find note"
        response.status(404).end()
    }
    console.log(note);
    response.json(note)
})

// ============= DELETE request for deleting a single resource ===============
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

//============== POST request for a single resource ============================
app.post('/api/notes/', (request, response) => {
    //Without the json-parser, the body property would be undefined. That is way we need it
    const body = request.body
    
    //the content property should not be empty if it is responde with error message
    if (!body.content) {
        //calling return is crucial, because otherwise the code will execute to the very end and the malformed note gets saved to the application.
        return response.status(400).json({
            error: 'content missing'
        })        
    }

    //setting the note object
    const note = {
        content: body.content,
        important: body.important || false, //If the important property is missing, we will default the value to false.
        date: new Date(),
        id: generatedId(),
    }

    notes= notes.concat(note)

    console.log(note);
    response.json(note)
})

//======== RequestLogger middleware===============
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
app.use(requestLogger)

//================= catching requests made to non-existent routes ==============
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

//================= Listining to PORT ==========================================
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('====================================');
    console.log(`Server running on ${PORT}`);
    console.log('====================================');
})