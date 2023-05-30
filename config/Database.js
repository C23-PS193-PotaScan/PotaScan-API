import Sequelize from 'sequelize';

const db = new Sequelize('potascan_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});


  
export default db