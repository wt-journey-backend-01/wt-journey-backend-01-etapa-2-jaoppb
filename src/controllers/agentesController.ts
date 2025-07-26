import { Request, Response } from 'express';
import agentRepository from '../repositories/agentesRepository';

function getAllAgents(req: Request, res: Response) {
	const agents = agentRepository.findAll();
	res.json(agents);
}

export default {
	getAllAgents,
};
