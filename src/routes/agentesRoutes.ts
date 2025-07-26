import express from 'express';
import agentsController from '../controllers/agentesController';

const router = express.Router();

router.get('/agentes', agentsController.getAllAgents);
router.get('/agentes/:id', agentsController.getAgentById);

export default router;
