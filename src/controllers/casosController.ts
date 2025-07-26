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
	res.json(foundCase);
}

function createCase(req: Request, res: Response) {
	const newCase = CaseSchema.parse(req.body);

	const createdCase = casesRepository.createCase(newCase);
	res.status(201).json(createdCase);
}

function updateCase(req: Request, res: Response) {
	const caseId = req.params.id;
	const existingCase = casesRepository.findById(caseId);
	const updatedData = CaseSchema.omit({ id: true }).parse(req.body);
	const updatedCase = casesRepository.updateCase(existingCase, updatedData);
	res.json(updatedCase);
}

export default {
	getAllCases,
	getCaseById,
	createCase,
	updateCase,
};
