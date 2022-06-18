import * as express from 'express';
import {logger} from '../middlewares/logger';
import {handlePageNotFound, handleRedirect} from '../controllers/redirect.controller';

export const register = (app: express.Application) => {
	app.get('/redirect/:id', logger, handleRedirect)
	app.get('/404', logger,handlePageNotFound)

	console.log(`****** redirect routes are registered ******`);
}
