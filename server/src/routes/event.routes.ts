import { Router } from 'express';

import { createEventController, getEventsController, deleteEventController, getEventController, updateEventController } from '../controllers/event.controller';

import { middleware } from '../lib/middleware';

/**
 * Event router
 * @description Event routes
 * @route /api/v1/event
 * @type Router
 */
const eventRouter: Router = Router();

// Event routes
eventRouter.post('/', middleware, createEventController);
eventRouter.get('/', middleware, getEventsController);
eventRouter.get('/:id', middleware, getEventController);
eventRouter.put('/:id', middleware, updateEventController);
eventRouter.delete('/:id', middleware, deleteEventController);

export default eventRouter;