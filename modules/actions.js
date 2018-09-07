const express = require('express');
const router = express.Router();


// - `id`: number, no need to provide it when creating posts, the database will automatically generate it.
// - `project_id`: number, required, must be the id of an existing project.
// - `description`: string, up to 128 characters long, required.
// - `notes`: string, no size limit, required. Used to record additional notes or requirements to complete the action.
// - `completed`: boolean to indicate if the action has been completed, not required


//import persistence helper
const PH = require('../data/helpers/actionModel');

//get

router.get('/:project_id', (req, res) => {
    const { project_id } = req.params;
    PH.get(project_id)
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
    const {project_id, description, notes, completed} = req.body;
      if (!project_id || !description || !notes) {
          res.status(400).json({message: 'needs project id, description, and notes to post'})
      } else {
          if ((description.length <= 128)) {
              PH.insert({project_id, description, notes, completed})
              .then(project => {
                  res.status(201).json({message: 'successful post', project})
              })
              .catch(error => {
                  res.status(500).json({error: `Error: ${error}`})
              })
          } else {
              res.status(400).json({message: 'description needs to be 128 characters or below'})
          }
      }
}),
//remove
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let actionToDelete;
    PH.get(id)
    .then(foundAction => {
        project = {...foundAction};
    })
    .catch(err => {
        res.status(404).json({error: `Error: ${error}`})
    })
    PH.remove(id).then(response => {
        res.status(200).json({message: `successfully deleted ${response} projects: ${actionToDelete}`})
    })
}),

//update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { description, notes, completed} = req.body;
        PH.update(id,{description, notes, completed})
            .then(project => {
                console.log(project)
                res.status(200).json({ msg: `action updated successfully: ${project}` })
            }).catch(err => {
                res.status(500).json({error: `error: ${err}`})})
})

module.exports = router;