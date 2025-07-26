import { DuplicateIDError } from '../errors/duplicateID';
import { NotFoundError } from '../errors/notFound';
import { Agent } from '../models/agent';
import { v4 as uuid } from 'uuid';

const agents: Agent[] = [
	{
		id: uuid(),
		nome: 'Rommel Carneiro',
		dataDeIncorporacao: '1992-10-04',
		cargo: 'Investigador',
	},
	{
		id: uuid(),
		nome: 'Ana Paula Silva',
		dataDeIncorporacao: '1995-05-15',
		cargo: 'Delegado',
	},
];

type AgentFilters = {
	cargo?: string;
	sort?: 'dataDeIncorporacao' | '-dataDeIncorporacao';
};

function findAll(filters?: AgentFilters): Agent[] {
	let agentsList = agents;
	if (filters?.cargo) {
		agentsList = agentsList.filter((a) => a.cargo === filters.cargo);
	}
	if (filters?.sort) {
		agentsList.sort((a, b) => {
			if (filters.sort === 'dataDeIncorporacao') {
				return (
					new Date(a.dataDeIncorporacao).getTime() -
					new Date(b.dataDeIncorporacao).getTime()
				);
			} else if (filters.sort === '-dataDeIncorporacao') {
				return (
					new Date(b.dataDeIncorporacao).getTime() -
					new Date(a.dataDeIncorporacao).getTime()
				);
			}
			return 0;
		});
	}
	return agentsList;
}

function findById(id: string): Agent {
	const foundAgent = agents.find((a) => a.id === id);
	if (foundAgent === undefined) throw new NotFoundError('Agent', id);
	return foundAgent;
}

function createAgent(newAgent: Omit<Agent, 'id'>): Agent {
	const agentWithId: Agent = {
		...newAgent,
		id: uuid(),
	};

	try {
		findById(agentWithId.id);
		throw new DuplicateIDError(agentWithId.id);
	} catch (error) {
		if (!(error instanceof NotFoundError)) throw error;
	}

	agents.push(agentWithId);
	return agentWithId;
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
