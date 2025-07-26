export class NotFoundError extends Error {
	constructor(entity: string, id: string) {
		super(`${entity} with ID ${id} not found`);
		this.name = 'NotFoundError';
	}
}
