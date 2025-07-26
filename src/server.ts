import express from 'express';
import agentsRouter from './routes/agentesRoutes';
import casesRouter from './routes/casosRoutes';
import { errorHandler } from './utils';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(agentsRouter);
app.use(casesRouter);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
