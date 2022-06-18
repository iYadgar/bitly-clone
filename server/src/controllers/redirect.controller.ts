import * as express from 'express';
import dbService from '../db';

export async function handleRedirect(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
	try {
		const {id} = req.params;
		const url = await dbService.getUrl(id)
		if (!url) {
			res.redirect('/404');
			return;
		}
		await dbService.updateUrlClicksAmount({id, clicksAmount: url.clicksAmount + 1});
		res.redirect(url.longUrl);

	} catch (e) {
		res.status(500).send({message: 'Something went wrong, please try again later', error: e});
		next(e)
	}
}

export async function handlePageNotFound(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {

	res.send('Page not found');
}
