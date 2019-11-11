import express from 'express';
import session from './session';
import room from './room';
import message from './message';
const api = express.Router();

api.use('/session', session);
api.use('/room', room);
api.use('/message', message);

export default api;