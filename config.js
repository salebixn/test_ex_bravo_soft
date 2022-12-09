import path from 'path'
import { fileURLToPath } from 'url'
import {Sequelize} from 'sequelize'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function Path(dir) {
    return path.join(__dirname, dir);
};

export const sequelize = new Sequelize('postgres://el3m3nt0:123456@localhost:5432/el3m3nt0');
try {
    await sequelize.authenticate();
} catch (e) {
    console.log('error: ', e);
}