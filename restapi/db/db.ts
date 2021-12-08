require('dotenv').config();
import {Sequelize} from 'sequelize';

const db = new Sequelize(process.env.DATABASE_URL as string);

export default db;
