import { Request, Response } from 'express';
import casesRepository from '../repositories/casosRepository';
import CaseSchema from '../models/case';

function getAllCases(req: Request, res: Response) {
	const cases = casesRepository.findAll();
	res.json(cases);
}

function getCaseById(req: Request, res: Response) {
	const caseId = req.params.id;
	const foundCase = casesRepository.findById(caseId);
	if (foundCase === null) return res.sendStatus(404);
	res.json(foundCase);
}

function createCase(req: Request, res: Response) {
	const newCase = req.body;
	CaseSchema.parse(newCase);

	const createdCase = casesRepository.createCase(newCase);
	res.status(201).json(createdCase);
}

export default {
	getAllCases,
	getCaseById,
	createCase,
};
