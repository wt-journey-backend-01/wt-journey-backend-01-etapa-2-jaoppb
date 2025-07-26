export class DuplicateIDError extends Error {
    constructor(id: string) {
		super(`Duplicate ID found: ${id}`);
		this.name = 'DuplicateIDError';
		Object.setPrototypeOf(this, DuplicateIDError.prototype);
	}
}
