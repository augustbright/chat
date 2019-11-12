import express from 'express';
import room from './room';
import message from './message';
const api = express.Router();

api.use('/room', room);
api.use('/message', message);

export default api;