import express from 'express';
import session from './session';
const api = express.Router();

api.use('/session', session);

export default api;