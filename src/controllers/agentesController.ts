import { Request, Response } from 'express';
import agentRepository from '../repositories/agentesRepository';

function getAllAgents(req: Request, res: Response) {
	const agents = agentRepository.findAll();
	res.json(agents);
}

function getAgentById(req: Request, res: Response) {
	const agentId = req.params.id;
	const foundAgent = agentRepository.findById(agentId);
	if (foundAgent === null) return res.sendStatus(404);
	res.json(foundAgent);
}

export default {
	getAllAgents,
	getAgentById,
};
