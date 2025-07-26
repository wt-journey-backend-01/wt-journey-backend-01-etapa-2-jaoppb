import z from 'zod';

const CaseSchema = z.object({
	id: z.uuidv4(),
	titulo: z.string().min(2).max(100),
	descricao: z.string().min(10).max(1000),
	status: z.enum(['aberto', 'solucionado']),
	agente_id: z.uuidv4(),
});

export default CaseSchema;
export type Case = z.infer<typeof CaseSchema>;
