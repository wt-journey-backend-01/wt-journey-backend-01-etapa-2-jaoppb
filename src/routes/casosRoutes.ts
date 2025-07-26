import express from 'express';
import casesController from '../controllers/casosController';
import { ZodOpenApiOperationObject, ZodOpenApiPathsObject } from 'zod-openapi';
import z from 'zod';
import CaseSchema from '../models/case';
import AgentSchema from '../models/agent';

const router = express.Router();

const getAllApi: ZodOpenApiOperationObject = {
	summary: 'Get all cases',
	responses: {
		200: {
			description: 'List of cases',
			content: {
				'application/json': {
					schema: z.array(CaseSchema),
				},
			},
		},
	},
};
router.get('/casos', casesController.getAllCases);

const getByIdApi: ZodOpenApiOperationObject = {
	summary: 'Get a case by ID',
	parameters: [
		{
			name: 'id',
			in: 'path',
			required: true,
			schema: { type: 'string', format: 'uuid' },
		},
	],
	responses: {
		200: {
			description: 'Case found',
			content: {
				'application/json': {
					schema: CaseSchema,
				},
			},
		},
		404: {
			description: 'Case not found',
		},
	},
};
router.get('/casos/:id', casesController.getCaseById);

const getAgentByCaseIdApi: ZodOpenApiOperationObject = {
	summary: 'Get agent by case ID',
	parameters: [
		{
			name: 'id',
			in: 'path',
			required: true,
			schema: { type: 'string', format: 'uuid' },
		},
	],
	responses: {
		200: {
			description: 'Agent found',
			content: {
				'application/json': {
					schema: AgentSchema,
				},
			},
		},
		404: {
			description: 'Agent not found',
		},
	},
};
router.get('/casos/:id/agente', casesController.getAgentByCaseId);

const postApi: ZodOpenApiOperationObject = {
	summary: 'Create a new case',
	requestBody: {
		content: {
			'application/json': {
				schema: CaseSchema,
			},
		},
	},
	responses: {
		201: {
			description: 'Case created successfully',
			content: {
				'application/json': {
					schema: CaseSchema,
				},
			},
		},
	},
};
router.post('/casos', casesController.createCase);

const putApi: ZodOpenApiOperationObject = {
	summary: 'Overwrite a case by ID',
	parameters: [
		{
			name: 'id',
			in: 'path',
			required: true,
			schema: { type: 'string', format: 'uuid' },
		},
	],
	requestBody: {
		content: {
			'application/json': {
				schema: CaseSchema.omit({ id: true }),
			},
		},
	},
	responses: {
		200: {
			description: 'Case updated successfully',
			content: {
				'application/json': {
					schema: CaseSchema,
				},
			},
		},
	},
};
router.put('/casos/:id', casesController.overwriteCase);

const patchApi: ZodOpenApiOperationObject = {
	summary: 'Update a case by ID',
	parameters: [
		{
			name: 'id',
			in: 'path',
			required: true,
			schema: { type: 'string', format: 'uuid' },
		},
	],
	requestBody: {
		content: {
			'application/json': {
				schema: CaseSchema.omit({ id: true }).partial(),
			},
		},
	},
	responses: {
		200: {
			description: 'Case updated successfully',
			content: {
				'application/json': {
					schema: CaseSchema,
				},
			},
		},
	},
};
router.patch('/casos/:id', casesController.updateCase);

const deleteApi: ZodOpenApiOperationObject = {
	summary: 'Delete a case by ID',
	parameters: [
		{
			name: 'id',
			in: 'path',
			required: true,
			schema: { type: 'string', format: 'uuid' },
		},
	],
	responses: {
		204: {
			description: 'Case deleted successfully',
		},
	},
};
router.delete('/casos/:id', casesController.deleteCase);

export const caseApi: ZodOpenApiPathsObject = {
	'/casos': {
		get: getAllApi,
		post: postApi,
	},
	'/casos/:id': {
		get: getByIdApi,
		put: putApi,
		patch: patchApi,
		delete: deleteApi,
	},
	'/casos/:id/agente': {
		get: getAgentByCaseIdApi,
	},
};

export default router;
