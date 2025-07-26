export class InvalidIDError extends Error {
	constructor(entity: string, id: string) {
		super(`Invalid ${entity} ID format: ${id}`);
		this.name = 'InvalidIDError';
	}
}
