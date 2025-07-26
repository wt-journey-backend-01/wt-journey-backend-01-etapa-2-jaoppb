import express from 'express';
import agentsController from '../controllers/agentesController';
import {
	createDocument,
	ZodOpenApiOperationObject,
	ZodOpenApiPathItemObject,
	ZodOpenApiPathsObject,
} from 'zod-openapi';
import z from 'zod';
import AgentSchema from '../models/agent';

const router = express.Router();

const getAllApi: ZodOpenApiOperationObject = {
	summary: 'Get all agents',
	responses: {
		200: {
			description: 'List of agents',
			content: {
				'application/json': {
					schema: z.array(AgentSchema),
				},
			},
		},
	},
};
router.get('/agentes', agentsController.getAllAgents);

const getByIdApi: ZodOpenApiOperationObject = {
	summary: 'Get an agent by ID',
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
router.get('/agentes/:id', agentsController.getAgentById);

const postApi: ZodOpenApiOperationObject = {
	summary: 'Create a new agent',
	requestBody: {
		content: {
			'application/json': {
				schema: AgentSchema,
			},
		},
	},
	responses: {
		201: {
			description: 'Agent created',
			content: {
				'application/json': {
					schema: AgentSchema,
				},
			},
		},
	},
};
router.post('/agentes', agentsController.createAgent);

const putApi: ZodOpenApiOperationObject = {
	summary: 'Overwrite an existing agent',
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
				schema: AgentSchema.omit({ id: true }),
			},
		},
	},
	responses: {
		200: {
			description: 'Agent updated',
			content: {
				'application/json': {
					schema: AgentSchema,
				},
			},
		},
	},
};
router.put('/agentes/:id', agentsController.overwriteAgent);

const patchApi: ZodOpenApiOperationObject = {
	summary: 'Update an existing agent',
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
				schema: AgentSchema.omit({ id: true }).partial(),
			},
		},
	},
	responses: {
		200: {
			description: 'Agent updated',
			content: {
				'application/json': {
					schema: AgentSchema,
				},
			},
		},
	},
};
router.patch('/agentes/:id', agentsController.updateAgent);

const deleteApi: ZodOpenApiOperationObject = {
	summary: 'Delete an agent',
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
			description: 'Agent deleted successfully',
		},
	},
};
router.delete('/agentes/:id', agentsController.deleteAgent);

export const agentApi: ZodOpenApiPathsObject = {
	'/agentes': {
		get: getAllApi,
		post: postApi,
	},
	'/agentes/:id': {
		get: getByIdApi,
		put: putApi,
		patch: patchApi,
		delete: deleteApi,
	},
};

export default router;
