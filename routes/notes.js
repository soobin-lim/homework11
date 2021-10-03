const notes = require('express').Router();
const uuid = require('../helpers/uuid');

const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.delete('/:id', (req,res) => {
  console.log('passing delete id : ', req.params.id);
  readAndDelete(req.params.id, './db/db.json');
  res.json('Note deleted successfully');
}); 

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  const { title, text } = req.body;

  const id = 1;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid()
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;
