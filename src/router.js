import express from 'express';
let router = express.Router();
import { getHome } from './controller'

router
    .get('/', getHome)

export default router