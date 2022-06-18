import * as express from 'express';
import dbService from '../db'

export async function createUrl(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
	try {
		const {url, id} = req.body;
		if (!url || !id) {
			res.status(400).send('Url and ID are required');
			return;
		}
		const response = await dbService.createUrl({url, id});
		res.send({message: 'Url created successfully', response: response.insertedId});
	} catch (e) {
		res.status(500).send({message: 'Error creating url', error: e});
		next(e)
	}
}

export async function deleteUrl(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
	try {
		const {id} = req.params;
		if (!id) {
			res.status(400).send('Url id is required');
			return;
		}
		const response = await dbService.deleteUrl(id);
		if (response.deletedCount === 0) {
			res.status(400).send({message: 'Did not find url with id: ' + id});
			return
		}
		res.send({message: 'Url deleted successfully'});
	} catch (e) {
		res.status(500).send({message: 'Error deleting url', error: e});
		next(e)
	}
}

export async function getUrls(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
	try {
		const response = await dbService.getUrls();
		res.send({ response});
	} catch (e) {
		res.status(500).send({message: 'Error fetching urls', error: e});
		next(e)
	}
}

export async function getOneUrl(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
	try {
		const {id} = req.params;
		if (!id) {
			res.status(400).send('Url id is required');
			return;
		}

		const response = await dbService.getUrl(id);
		if (!response) {
			res.status(400).send({message: 'Did not find url with id: ' + id});
			return

		}
		res.send({ response});
	} catch (e) {
		res.status(500).send({message: 'Error fetching urls', error: e});
		next(e)
	}
}

export async function updateUrlCount(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
	try {
		const {id} = req.params;
		const {clicksAmount} = req.body;
		if (!id || !clicksAmount) {
			res.status(400).send('Missing url ID or clicksAmount');
			return;
		}
		const response = await dbService.updateUrlClicksAmount({id, clicksAmount});
		res.send({data: response});
	} catch (e) {
		res.status(500).send({message: 'Error fetching urls', error: e});
		next(e)
	}

}
