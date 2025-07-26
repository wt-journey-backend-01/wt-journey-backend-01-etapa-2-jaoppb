import { Request, Response } from 'express';
import casesRepository from '../repositories/casosRepository';
import CaseSchema from '../models/case';
import agentsRepository from '../repositories/agentesRepository';
import { RequiredParamError } from '../errors/requiredParam';
import z from 'zod';
import { InvalidIDError } from '../errors/invalidID';

function getAllCases(req: Request, res: Response) {
	const filters = req.query as { status?: string; agente_id?: string };

	if (filters.status) {
		CaseSchema.shape.status.parse(filters.status);
	}

	if (filters.agente_id) {
		CaseSchema.shape.agente_id.parse(filters.agente_id);
	}

	const cases = casesRepository.findAll(filters);
	res.json(cases);
}

function getAllCasesWithText(req: Request, res: Response) {
	const text = req.query.q as string | undefined;
	if (!text) throw new RequiredParamError('q');

	const cases = casesRepository.findAllWithText(text);
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

	try {
		casesRepository.deleteCase(caseId);
	} catch {}
	res.status(204).send();
}

export default {
	getAllCases,
	getAllCasesWithText,
	getCaseById,
	getAgentByCaseId,
	createCase,
	overwriteCase,
	updateCase,
	deleteCase,
};
