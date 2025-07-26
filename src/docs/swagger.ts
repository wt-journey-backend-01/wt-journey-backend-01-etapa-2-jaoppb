import { createDocument } from 'zod-openapi';
import { agentApi } from '../routes/agentesRoutes';
import { caseApi } from '../routes/casosRoutes';

export const swaggerDocument = createDocument({
	openapi: '3.1.1',
	info: {
		title: 'WT Journey API - Etapa 2',
		version: '1.0.0',
	},
	paths: {
		...agentApi,
		...caseApi,
	},
});
