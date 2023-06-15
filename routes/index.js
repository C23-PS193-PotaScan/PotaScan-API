import express from 'express'
import { Register, Login, Logout } from '../controllers/Users.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'
import { getListArticle, getArticleById, getArticleByCategory, postArticle, updateArticle, deleteArticle } from '../controllers/article.js'

const router = express.Router()

//API Login
router.post('/register', Register)
router.post('/login', Login)
router.get('/token', refreshToken)
router.delete('/logout', Logout)

//API article
router.get('/article', verifyToken, getListArticle)
router.get('/article/:articleId', verifyToken, getArticleById)
router.get('/article/category/:category', verifyToken, getArticleByCategory)
router.post('/article', verifyToken, postArticle)
router.put('/article', verifyToken, updateArticle)
router.delete('/article/:articleId', verifyToken, deleteArticle)

export default router