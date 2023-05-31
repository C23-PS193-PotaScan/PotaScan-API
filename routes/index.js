import express from 'express'
import { getUsers, Register, Login, Logout } from '../controllers/Users.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'
import { getListArticle, getArticleById, getArticleByCategory, postArticle, updateArticle, deleteArticle } from '../controllers/article.js'

const router = express.Router()

//API Login
router.get('/users', verifyToken, getUsers)
router.post('/users', Register)
router.post('/login', Login)
router.get('/token', refreshToken)
router.delete('/logout', Logout)

//API artikel
router.get('/artikel', getListArticle)
router.get('/artikel/:articleId', getArticleById)
router.get('/artikel/category/:category', getArticleByCategory)
router.post('/artikel', postArticle)
router.put('/artikel', updateArticle)
router.delete('/artikel/:articleId', deleteArticle)

export default router