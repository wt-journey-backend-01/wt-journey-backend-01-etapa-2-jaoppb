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

function findById(id: string): Agent | null {
	const foundAgent = agents.find((a) => a.id === id);
	if (foundAgent === undefined) return null;
	return foundAgent;
}

export default {
	findAll,
	findById,
};
