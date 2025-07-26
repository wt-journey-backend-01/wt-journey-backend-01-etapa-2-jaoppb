import { DuplicateIDError } from '../errors/duplicateID';
import { NotFoundError } from '../errors/notFound';
import { Agent } from '../models/agent';

const agents: Agent[] = [
	{
		id: '401bccf5-cf9e-489d-8412-446cd169a0f1',
		nome: 'Rommel Carneiro',
		dataDeIncorporacao: '1992/10/04',
		cargo: 'Investigador',
	},
	{
		id: '501bccf5-cf9e-489d-8412-446cd169a0f1',
		nome: 'Ana Paula Silva',
		dataDeIncorporacao: '1995/05/15',
		cargo: 'Delegado',
	},
];

function findAll(): Agent[] {
	return agents;
}

function findById(id: string): Agent {
	const foundAgent = agents.find((a) => a.id === id);
	if (foundAgent === undefined) throw new NotFoundError('Agent', id);
	return foundAgent;
}

function createAgent(newAgent: Agent): Agent {
	try {
		findById(newAgent.id);
	} catch (error) {
		if (error instanceof NotFoundError)
			throw new DuplicateIDError(newAgent.id);
		else throw error;
	}

	agents.push(newAgent);
	return newAgent;
}

function updateAgent(agent: Agent, updatedAgent: Partial<Agent>): Agent {
	Object.assign(agent, updatedAgent);
	return agent;
}

function deleteAgent(id: string): void {
	const index = agents.findIndex((a) => a.id === id);
	if (index === -1) throw new NotFoundError('Agent', id);
	agents.splice(index, 1);
}

export default {
	findAll,
	findById,
	createAgent,
	updateAgent,
	deleteAgent,
};
