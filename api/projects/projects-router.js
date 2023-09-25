// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')

const {

    validateProjectId,
    validateProject,
} = require('./projects-middleware')

const router = express.Router()

router.get('/', (req, res, next ) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(next)
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
    .then(() => {
        return(Projects.get(req.params.id))
    })
    .then(project => {
        res.status(200).json(project)
    })
    .catch(next)
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
    .then(project => {
        res.status(204).json(project)
    })
    .catch(next)
})

module.exports = router