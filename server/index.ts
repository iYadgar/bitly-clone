import * as express from 'express';
import dbService from './src/db'
import * as apiRoutes from './src/routes/api'
import * as redirectRoutes from './src/routes/redirect'
import * as path from 'path';

const app = express();
const port = process.env.PORT || 4444;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
(async () => {
	await dbService.connect()
	apiRoutes.register(app);
	redirectRoutes.register(app)
	app
	.use(express.static(path.join(__dirname, './public')))
	.get('*', (req: express.Request, res: express.Response) => {
		res.sendFile(path.join(__dirname, './public/index.html'));
	});
	app.listen(port, () => {
		console.log(`****** API is running on port ${port} ******`);
	});

})()
