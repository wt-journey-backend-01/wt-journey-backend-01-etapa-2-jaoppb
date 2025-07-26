import { Request, Response } from 'express';
import casesRepository, { CaseFilters } from '../repositories/casosRepository';
import CaseSchema from '../models/case';
import agentsRepository from '../repositories/agentesRepository';
import z from 'zod';
import { InvalidIDError } from '../errors/invalidID';

function getAllCases(req: Request, res: Response) {
	const filters = req.query as CaseFilters;

	if (filters.status !== undefined)
		CaseSchema.shape.status.parse(filters.status);

	if (filters.agente_id !== undefined)
		CaseSchema.shape.agente_id.parse(filters.agente_id);

	if (filters.q !== undefined) z.string().min(3).parse(filters.q);

	const cases = casesRepository.findAll(filters);
	res.json(cases);
}

function getAgentByCaseId(req: Request, res: Response) {
	const caseId = req.params.id;
	if (!z.uuid().safeParse(caseId).success) {
		throw new InvalidIDError('case', caseId);
	}

	const foundCase = casesRepository.findById(caseId);
	const agent = agentsRepository.findById(foundCase.agente_id);
	res.json(agent);
}

function getCaseById(req: Request, res: Response) {
	const caseId = req.params.id;
	if (!z.uuid().safeParse(caseId).success) {
		throw new InvalidIDError('case', caseId);
	}

	const foundCase = casesRepository.findById(caseId);
	res.json(foundCase);
}

function createCase(req: Request, res: Response) {
	const newCase = CaseSchema.omit({ id: true }).parse(req.body);
	const createdCase = casesRepository.createCase(newCase);
	res.status(201).json(createdCase);
}

function overwriteCase(req: Request, res: Response) {
	const caseId = req.params.id;
	if (!z.uuid().safeParse(caseId).success) {
		throw new InvalidIDError('case', caseId);
	}

	const existingCase = casesRepository.findById(caseId);
	const updatedData = CaseSchema.omit({ id: true }).parse(req.body);
	const updatedCase = casesRepository.updateCase(existingCase, updatedData);
	res.json(updatedCase);
}

function updateCase(req: Request, res: Response) {
	const caseId = req.params.id;
	if (!z.uuid().safeParse(caseId).success) {
		throw new InvalidIDError('case', caseId);
	}

	const existingCase = casesRepository.findById(caseId);
	const updatedData = CaseSchema.omit({ id: true }).partial().parse(req.body);
	const updatedCase = casesRepository.updateCase(existingCase, updatedData);
	res.json(updatedCase);
}

function deleteCase(req: Request, res: Response) {
	const caseId = req.params.id;
	if (!z.uuid().safeParse(caseId).success) {
		throw new InvalidIDError('case', caseId);
	}

	casesRepository.deleteCase(caseId);
	res.status(204).send();
}

export default {
	getAllCases,
	getCaseById,
	getAgentByCaseId,
	createCase,
	overwriteCase,
	updateCase,
	deleteCase,
};
