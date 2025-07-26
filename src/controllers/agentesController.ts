import { Request, Response } from 'express';
import agentRepository from '../repositories/agentesRepository';
import AgentSchema from '../models/agent';
import z from 'zod';
import { InvalidIDError } from '../errors/invalidID';

export const sortFilter = z.enum(['dataDeIncorporacao', '-dataDeIncorporacao']);

function getAllAgents(req: Request, res: Response) {
	const filters = req.query as {
		cargo?: string;
		sort?: 'dataDeIncorporacao' | '-dataDeIncorporacao';
	};

	if (filters.cargo !== undefined)
		AgentSchema.shape.cargo.parse(filters.cargo);
	if (filters.sort !== undefined) sortFilter.parse(filters.sort);

	const agents = agentRepository.findAll({
		cargo: filters.cargo,
		sort: filters.sort,
	});
	res.json(agents);
}

function getAgentById(req: Request, res: Response) {
	const agentId = req.params.id;
	if (!z.uuid().safeParse(agentId).success) {
		throw new InvalidIDError('agent', agentId);
	}

	const foundAgent = agentRepository.findById(agentId);
	res.json(foundAgent);
}

function createAgent(req: Request, res: Response) {
	const newAgent = AgentSchema.omit({ id: true }).parse(req.body);
	const createdAgent = agentRepository.createAgent(newAgent);
	res.status(201).json(createdAgent);
}

function overwriteAgent(req: Request, res: Response) {
	const agentId = req.params.id;
	if (!z.uuid().safeParse(agentId).success) {
		throw new InvalidIDError('agent', agentId);
	}

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
	if (!z.uuid().safeParse(agentId).success) {
		throw new InvalidIDError('agent', agentId);
	}

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
	if (!z.uuid().safeParse(agentId).success) {
		throw new InvalidIDError('agent', agentId);
	}

	agentRepository.deleteAgent(agentId);
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
