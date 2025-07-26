import { Request, Response } from 'express';
import casesRepository from '../repositories/casosRepository';

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

export default {
	getAllCases,
	getCaseById,
};
