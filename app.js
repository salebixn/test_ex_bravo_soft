import Koa from 'koa'
import views from 'koa-views'
import session from 'koa-session'
import router from './routes/routes.js'
import {Path} from './config.js'
import migrate from './migrate.js'

const app = new Koa();

// templates
app.use(views(Path('/templates'), { extension: 'ejs' }));

//session
app.keys = ['key'];
app.use(session(app));

await migrate();

//routes
app.use(router.routes())
app.use(router.allowedMethods());

app.listen(3000);