// Write your "projects" router here!
const express = require('express')
const router = express.Router()

const Projects = require('./projects-model')

const {
    validateProjectId,
    validateProject,
} = require('./projects-middleware')



router.get('/', (req, res, next ) => {
    Projects.get()
    .then(projects => 
        res.json(projects))
    .catch(next)
    })

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
    .then(newProject => {
        return newProject
    })
    .then(newProject => {
        res.status(200).json(newProject)
    })
    .catch(next)
})

// router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
//     Projects.update(req.params.id, req.body)
//     .then(() => {
//         return(Projects.get(req.params.id))
//     })
//     .then(project => {
//         res.status(200).json(project)
//     })
//     .catch(next)
// })

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    if(req.body.completed === undefined){
        res.status(400).json({message:'Completed field missing'})
    } else {
    Projects.update(req.params.id, req.body)
    .then(updatedProject => {
        return updatedProject
    })
    .then(updated => {
        res.status(200).json({
            completed: updated.completed,
            description: updated.description,
            name: updated.name
        })
    })
    .catch(next)
    }
})


router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
    .then(() => {
        res.status(200).json()
    })
    .catch(next)
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        console.log('actions', actions)
        res.status(200).json(actions)
    })
    .catch(next)
})

module.exports = router