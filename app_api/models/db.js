import { Sequelize } from 'sequelize';
import 'dotenv/config'

const {
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    DB_HOST
} = process.env


const db = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres'
});

export default db

