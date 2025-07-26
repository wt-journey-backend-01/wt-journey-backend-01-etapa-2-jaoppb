import z from 'zod';

const AgentSchema = z.object({
	id: z.uuidv4(),
	nome: z.string().min(2).max(100),
	dataDeIncorporacao: z.string().regex(/^\d{4}\/\d{2}\/\d{2}$/),
	cargo: z.string().min(2).max(100),
});

export default AgentSchema;
export type Agent = z.infer<typeof AgentSchema>;
