import path from 'path'
import Koa from 'koa'
import views from 'koa-views'
import {Sequelize} from 'sequelize'
import router from './routes/routes.js'
import Path from './config.js'
import constructors from './models/constructors.js'
import docs from './models/docs.js'
import docs_count from './models/docs_count.js'

const app = new Koa();

// connect to postgres
const sequelize = new Sequelize('postgres://el3m3nt0:123456@localhost:5432/el3m3nt0');
try {
    await sequelize.authenticate();
} catch (e) {
    console.log('error: ', e);
}


constructors.hasMany(docs);
docs.belongsTo(constructors);
docs_count.hasMany(docs);
docs.belongsTo(docs_count);

// sync models with db
await constructors.sync({ force: false });
await docs.sync({ force: false });
await docs_count.sync({ force: false });

// templates
app.use(views(Path('/templates'), { extension: 'ejs' }));

app.use(router.routes())
app.use(router.allowedMethods());

app.listen(3000);