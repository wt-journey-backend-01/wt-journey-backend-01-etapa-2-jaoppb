import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { DuplicateIDError } from './errors/duplicateID';
import { NotFoundError } from './errors/notFound';
import { RequiredParamError } from './errors/requiredParam';
import { InvalidIDError } from './errors/invalidID';
import { FutureDateError } from './errors/futureDate';

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: Function,
) {
	console.error(err.stack);

	switch (true) {
		case err instanceof ZodError:
			return res.status(400).json({
				message: 'Validation error',
				errors: err.issues,
			});
		case err instanceof DuplicateIDError:
			return res.status(409).json({
				message: err.message,
			});
		case err instanceof NotFoundError || err instanceof InvalidIDError:
			return res.status(404).json({
				message: err.message,
			});
		case err instanceof RequiredParamError ||
			err instanceof FutureDateError:
			return res.status(400).json({
				message: err.message,
			});
		default:
			return res.status(500).json({
				message: 'Internal server error',
			});
	}
}
