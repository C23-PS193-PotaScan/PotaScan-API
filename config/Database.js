import Sequelize from 'sequelize';

const db = new Sequelize('potascan_db', 'root', 'asd', {
    host: "35.232.95.198",
    dialect: "mysql"
});


  
export default db