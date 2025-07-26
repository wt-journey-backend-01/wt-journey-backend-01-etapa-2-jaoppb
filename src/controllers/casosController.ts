import { Request, Response } from 'express';
import casesRepository from '../repositories/casosRepository';

function getAllCases(req: Request, res: Response) {
	const cases = casesRepository.findAll();
	res.json(cases);
}

export default {
	getAllCases,
};
