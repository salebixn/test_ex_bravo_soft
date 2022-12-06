import path from 'path'
import Koa from 'koa'
import views from 'koa-views'
import {Sequelize} from 'sequelize'
import router from './routes/routes.js'
import Path from './config.js'
import constructors from './models/constructors.js'
import applications from './models/applications.js'
import docs from './models/docs.js'

const app = new Koa();

// connect to postgres
const sequelize = new Sequelize('postgres://el3m3nt0:123456@localhost:5432/el3m3nt0');
try {
    await sequelize.authenticate();
} catch (e) {
    console.log('error: ', e);
}


constructors.hasMany(applications);
applications.belongsTo(constructors);
docs.hasMany(applications);
applications.belongsTo(docs);

// sync models with db
await constructors.sync({ force: false });
await applications.sync({ force: false });
await docs.sync({ force: false });

// templates
app.use(views(Path('/templates'), { extension: 'ejs' }));

app.use(router.routes())
app.use(router.allowedMethods());

app.listen(3000);