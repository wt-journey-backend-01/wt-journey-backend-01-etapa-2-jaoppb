import z from 'zod';
import AgentSchema from './agent';

const caseId = z.uuidv4().meta({
	description: 'Unique identifier for the case',
	example: '123e4567-e89b-12d3-a456-426614174000',
});

const titulo = z.string().min(2).max(100).meta({
	description: 'Title of the case',
	example: 'Case Title',
});

const descricao = z.string().min(10).max(1000).meta({
	description: 'Description of the case',
	example: 'Detailed description of the case',
});

const status = z.enum(['aberto', 'solucionado']).meta({
	description: 'Status of the case',
	example: 'aberto',
});

const CaseSchema = z
	.object({
		id: caseId,
		titulo,
		descricao,
		status,
		agente_id: z.string(),
	})
	.meta({
		id: 'Case',
		description: 'Schema for a case in the system',
		example: {
			id: '123e4567-e89b-12d3-a456-426614174000',
			titulo: 'Case Title',
			descricao: 'Detailed description of the case',
			status: 'aberto',
			agente_id: '123e4567-e89b-12d3-a456-426614174000',
		},
	})
	.strict();

export default CaseSchema;
export type Case = z.infer<typeof CaseSchema>;
