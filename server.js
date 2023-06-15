import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import db from './config/Database.js'
import router from './routes/index.js'
import bodyParser from 'body-parser'

dotenv.config()

const app = express();

async function connectToDatabase() {
    try {
      await db.authenticate();
      console.log('Database Connected..');
    } catch (error) {
      console.error(error);
    }
  }
  
  connectToDatabase();

app.use(cors({
  credentials:true, 
  origin:'*'
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(router)

app.listen(5000, () => 
    console.log('Server running on port 5000')
)