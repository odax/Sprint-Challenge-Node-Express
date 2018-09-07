const express = require('express');
const router = express.Router();


//import persistence helper
const PH = require('../data/helpers/projectModel');



//get

router.get('/:id', (req, res) => {
    const { id } = req.params;
    PH.get(id)
    .then(project => {
        if (project.length === 0) {
            res.status(404).json({message: 'does not exist'})
        } else {
            res.status(200).json(project);
        }
    })
    .catch(error => {
        res.status(500).json({error: `${error}`})
    })
}),

//add
router.post('/', (req, res) => {
    const {name, description, id} = req.body;
      if (!name || !description) {
          res.status(400).json({message: 'needs title and content to post'})
      } else {
          if ((name.length <= 128)&&(description.length <= 128)) {
              PH.insert({name, description, id})
              .then(project => {
                  res.status(201).json({message: 'successful post', project})
              })
              .catch(error => {
                  res.status(500).json({error: `Error: ${error}`})
              })
          } else {
              res.status(400).json({message: 'name and description need to be 128 characters or below'})
          }
      }
})
//remove
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let projectToDelete;
    PH.get(id)
    .then(foundProject => {
        project = {...foundProject};
    })
    .catch(err => {
        res.status(404).json({error: `Error: ${error}`})
    })
    PH.remove(id).then(response => {
        res.status(200).json({message: `successfully deleted ${response} projects: ${projectToDelete}`})
    })
})

//update

module.exports = router;