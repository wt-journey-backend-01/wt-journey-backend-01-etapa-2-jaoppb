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

function overwriteAgent(req: Request, res: Response) {
	const agentId = req.params.id;
	const existingAgent = agentRepository.findById(agentId);
	const updatedData = AgentSchema.omit({ id: true }).parse(req.body);
	const updatedAgent = agentRepository.updateAgent(
		existingAgent,
		updatedData,
	);
	res.json(updatedAgent);
}

function updateAgent(req: Request, res: Response) {
	const agentId = req.params.id;
	const existingAgent = agentRepository.findById(agentId);
	const updatedData = AgentSchema.omit({ id: true })
		.partial()
		.parse(req.body);
	const updatedAgent = agentRepository.updateAgent(
		existingAgent,
		updatedData,
	);
	res.json(updatedAgent);
}

function deleteAgent(req: Request, res: Response) {
	const agentId = req.params.id;
	try {
		agentRepository.deleteAgent(agentId);
	} catch {}
	res.status(204).send();
}

export default {
	getAllAgents,
	getAgentById,
	createAgent,
	overwriteAgent,
	updateAgent,
	deleteAgent,
};
