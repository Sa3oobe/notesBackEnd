app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
      .then(note => {
        if (note) {
          response.json(note)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })



  app.get('/api/notes/:id', (request, response, next) => {
    // finding the specified note (with its id)
    Note.findById(request.params.id)
    .then(note => {
        if(note){
            response.json(note)
        } else {
            response.statusMessage = "Unable to find note"
            response.status(404).end()
        }        
    })
    .catch(error => next(error))    
})