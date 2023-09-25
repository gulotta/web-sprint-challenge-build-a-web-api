// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if(!project) {
            res.stats(404).json({
                message: 'Project with the specified id does not exist'
            })
        } else {
            res.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'Problem finding project'
        })
    }
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body
    if(
        !name || !name.trim() ||
        !description || !description.trim() ||
        completed === undefined
    ) {
        res.status(400).json({
            message: 'Please include all required name, description, and completed fields'
        })

    } else {
        req.name = name.trim()
        req.description = description.trim()
        next()
    }
}



module.exports = {
    validateProjectId,
    validateProject

}