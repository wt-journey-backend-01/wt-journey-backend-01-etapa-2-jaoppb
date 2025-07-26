export class FutureDateError extends Error {
	constructor(date: Date) {
		super(`The date ${date.toISOString()} is in the future.`);
		this.name = 'FutureDateError';
	}
}
