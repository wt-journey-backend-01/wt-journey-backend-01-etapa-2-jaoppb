const agents = [
	{
		id: '401bccf5-cf9e-489d-8412-446cd169a0f1',
		nome: 'Rommel Carneiro',
		dataDeIncorporacao: '1992/10/04',
		cargo: 'Investigador',
	},
	{
		id: '501bccf5-cf9e-489d-8412-446cd169a0f1',
		nome: 'Ana Paula Silva',
		dataDeIncorporacao: '1995/05/15',
		cargo: 'Delegado',
	},
];

function findAll() {
	return agents;
}

export default {
	findAll,
};
