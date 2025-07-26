import express from 'express';
import casesRouter from './routes/casosRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(casesRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
