import {MongoClient, Collection, DeleteResult, InsertOneResult, ModifyResult, WithId} from 'mongodb';
import {IUrl} from '../types';
import * as dotenv from "dotenv";

dotenv.config();

class DBService {
	client = new MongoClient(process.env.MONGO_URI || '');
	dbName = 'Cluster0'
	urlCollection: Collection<IUrl> | undefined

	constructor() {
	}

	async connect() {
		await this.client.connect()
		const db = this.client.db(this.dbName)
		this.urlCollection = db.collection('urls')
		console.log(`****** Successfully connected to DB ******`);
	}

	async createUrl({url, id}: { url: string, id: string }): Promise<InsertOneResult<IUrl>> {
		const createdAt = (new Date()).toISOString()
		return (<Collection<IUrl>>this.urlCollection).insertOne({_id: id, longUrl: url, clicksAmount: 0, createdAt})
	}

	async deleteUrl(urlId: string): Promise<DeleteResult> {
		return (<Collection<IUrl>>this.urlCollection).deleteOne({_id: urlId})
	}

	async getUrls(): Promise<WithId<IUrl>[]> {
		return (<Collection<IUrl>>this.urlCollection).find().toArray()
	}

	async getUrl(urlId: string): Promise<WithId<IUrl> | null | void> {
		return (<Collection<IUrl>>this.urlCollection).findOne({_id: urlId})
	}

	async updateUrlClicksAmount({id, clicksAmount}: { id: string, clicksAmount: number }): Promise<IUrl | null> {
		const response: ModifyResult<IUrl> = await (<Collection<IUrl>>this.urlCollection).findOneAndUpdate({_id: id}, {
			$set:
				{
					clicksAmount
				}
		})
		return response.value
	}

}

export default new DBService();


