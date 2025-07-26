import { Request, Response } from 'express';
import agentRepository from '../repositories/agentesRepository';
import AgentSchema from '../models/agent';

function getAllAgents(req: Request, res: Response) {
	const agents = agentRepository.findAll();
	res.json(agents);
}

function getAgentById(req: Request, res: Response) {
	const agentId = req.params.id;
	const foundAgent = agentRepository.findById(agentId);
	res.json(foundAgent);
}

function createAgent(req: Request, res: Response) {
	const newAgent = AgentSchema.parse(req.body);
	const createdAgent = agentRepository.createAgent(newAgent);
	res.status(201).json(createdAgent);
}

export default {
	getAllAgents,
	getAgentById,
	createAgent,
};
