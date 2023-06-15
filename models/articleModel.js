import Sequelize from 'sequelize'
import db from '../config/Database.js'

const { DataTypes } = Sequelize

const Article = db.define('article', {
    articleId:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING
    },
    category:{
        type: DataTypes.STRING
    },
    date:{
        type: DataTypes.DATE
    },
    writer:{
        type: DataTypes.STRING
    },
    mainContent:{
        type: DataTypes.TEXT
    },
    image:{
        type: DataTypes.STRING
    }, 
}, 
{
    timestamps: false,
}
)

export default Article