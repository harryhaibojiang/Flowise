import express from 'express'
import chatflowsController from '../../controllers/chatflows'
const router = express.Router()

// my custom routes
router.get('/config/:id', chatflowsController.getChatflowConfig)
router.put('/config/:id', chatflowsController.updateChatflowConfig)

// CREATE
router.post('/', chatflowsController.saveChatflow)

// READ
router.get('/', chatflowsController.getAllChatflows)
router.get(['/', '/:id'], chatflowsController.getChatflowById)
router.get(['/apikey/', '/apikey/:apikey'], chatflowsController.getChatflowByApiKey)

// UPDATE
router.put(['/', '/:id'], chatflowsController.updateChatflow)

// DELETE
router.delete(['/', '/:id'], chatflowsController.deleteChatflow)

export default router
