import path from 'path'
import { fileURLToPath } from 'url'
import {Sequelize} from 'sequelize'
import * as dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function Path(dir) {
    return path.join(__dirname, dir);
};

export const sequelize = new Sequelize(`postgres://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB}`);
try {
    await sequelize.authenticate();
} catch (e) {
    console.log('error: ', e);
}