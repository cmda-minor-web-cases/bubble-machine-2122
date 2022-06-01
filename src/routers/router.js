import express from 'express'
import { renderLogin } from '../controllers/uiController.js'

export const router = express.Router()

router
    .get('/', renderLogin)


