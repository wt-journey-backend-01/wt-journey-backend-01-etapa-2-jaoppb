import z from 'zod';

const agentId = z.uuidv4().meta({
	description: 'Unique identifier for the agent',
	example: '123e4567-e89b-12d3-a456-426614174000',
});

const nome = z.string().min(2).max(100).meta({
	description: 'Name of the agent',
	example: 'John Doe',
});

const dataDeIncorporacao = z
	.string()
	.regex(
		/^([01]\d{3}|20[01]\d|202[0-5])-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
	)
	.meta({
		description: 'Incorporation date of the agent',
		example: '2023-01-01',
	});

const cargo = z.string().min(2).max(100).meta({
	description: 'Position of the agent',
	example: 'Delegate',
});

const AgentSchema = z
	.object({
		id: agentId,
		nome,
		dataDeIncorporacao,
		cargo,
	})
	.meta({
		id: 'Agent',
		description: 'Schema for an agent in the system',
		example: {
			id: '123e4567-e89b-12d3-a456-426614174000',
			nome: 'John Doe',
			dataDeIncorporacao: '2023-01-01',
			cargo: 'Sales Manager',
		},
	});

export default AgentSchema;
export type Agent = z.infer<typeof AgentSchema>;
