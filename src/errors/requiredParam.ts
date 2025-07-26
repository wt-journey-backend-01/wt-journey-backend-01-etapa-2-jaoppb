export class RequiredParamError extends Error {
	constructor(param: string) {
		super(`Missing required query parameter: ${param}`);
		this.name = 'RequiredParamError';
	}
}
