import express from 'express';
import agentsController from '../controllers/agentesController';

const router = express.Router();

router.get('/agentes', agentsController.getAllAgents);

export default router;
