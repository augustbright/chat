import express from 'express';
import session from './session';
import room from './room';
const api = express.Router();

api.use('/session', session);
api.use('/room', room);

export default api;