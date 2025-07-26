import express from 'express';
import agentsController from '../controllers/agentesController';

const router = express.Router();

router.get('/agentes', agentsController.getAllAgents);
router.get('/agentes/:id', agentsController.getAgentById);
router.post('/agentes', agentsController.createAgent);
router.put('/agentes/:id', agentsController.overwriteAgent);
router.patch('/agentes/:id', agentsController.updateAgent);
router.delete('/agentes/:id', agentsController.deleteAgent);

export default router;
