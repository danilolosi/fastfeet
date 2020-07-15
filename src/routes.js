import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymansController from './app/controllers/DeliverymansController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.post('/deliverymans', DeliverymansController.store);
routes.put('/deliverymans/:id', DeliverymansController.update);
routes.delete('/deliverymans/:id', DeliverymansController.delete);
routes.get('/deliverymans', DeliverymansController.index);

export default routes;
