import { DuplicateIDError } from '../errors/duplicateID';
import { NotFoundError } from '../errors/notFound';
import { Case } from '../models/case';
import agentsRepository from './agentesRepository';

const cases: Case[] = [
	{
		id: 'f5fb2ad5-22a8-4cb4-90f2-8733517a0d46',
		titulo: 'homicidio',
		descricao:
			'Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.',
		status: 'aberto',
		agente_id: '401bccf5-cf9e-489d-8412-446cd169a0f1',
	},
	{
		id: 'a2b3c4d5-e6f7-8a9b-0c1d-2e3f4g5h6i7j',
		titulo: 'furto',
		descricao:
			'Relato de furto de veículo às 14:20 do dia 12/07/2007 na região do bairro Centro.',
		status: 'solucionado',
		agente_id: '401bccf5-cf9e-489d-8412-446cd169a0f1',
	},
];

function findAll(): Case[] {
	return cases;
}

function findById(id: string): Case {
	const foundCase = cases.find((c) => c.id === id);
	if (foundCase === undefined) throw new NotFoundError('Case', id);
	return foundCase;
}

function createCase(newCase: Case): Case {
	if (findById(newCase.id)) {
		throw new DuplicateIDError(newCase.id);
	}

	// Throw an error if the agent does not exist
	agentsRepository.findById(newCase.agente_id);

	cases.push(newCase);
	return newCase;
}

export default {
	findAll,
	findById,
	createCase,
};
