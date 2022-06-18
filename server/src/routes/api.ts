import * as express from 'express';
import {createUrl, deleteUrl, getOneUrl, getUrls, updateUrlCount} from '../controllers/shortify.controller';
import {logger} from '../middlewares/logger';

export const register = (app: express.Application) => {
	app.post('/api/urls', logger, createUrl)
	app.delete('/api/urls/:id', logger, deleteUrl)
	app.get('/api/urls', logger, getUrls)
	app.get('/api/urls/:id', logger, getOneUrl)
	app.put('/api/urls/:id', logger, updateUrlCount)

	console.log(`****** api routes are registered ******`);
}

