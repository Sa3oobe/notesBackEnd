const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://sab2:sab2123@cluster1.jybvkhn.mongodb.net/noteApp?retryWrites=true&w=majority`


const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
  .connect(url)
  /* .then((result) => {
    console.log('connected')
    
    const note = new Note({
      content: 'and this is thired',
      date: new Date(),
      important: true,
    })
    //.save() is a methode part of the model witch is inherated by note object
    //return note.save()
  })
  .then(() => {
    console.log('note saved!')
    //If the connection is not closed, the program will never finish its execution.
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err)) */
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })