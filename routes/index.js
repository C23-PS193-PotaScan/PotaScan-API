import express from 'express'
import { getUsers, Register, Login, Logout } from '../controllers/Users.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'
import { getListArticle, getArticleById, getArticleByCategory, postArticle, updateArticle, deleteArticle } from '../controllers/article.js'

const router = express.Router()

//API Login
router.get('/users', verifyToken, getUsers)
router.post('/register', Register)
router.post('/login', Login)
router.get('/token', refreshToken)
router.delete('/logout', Logout)

//API article
router.get('/article', getListArticle)
router.get('/article/:articleId', getArticleById)
router.get('/article/category/:category', getArticleByCategory)
router.post('/article', postArticle)
router.put('/article', updateArticle)
router.delete('/article/:articleId', deleteArticle)

export default router