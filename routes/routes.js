import Router from '@koa/router'
import {koaBody} from 'koa-body'
import {Sequelize} from 'sequelize'
import constructors from '../models/constructors.js'
import applications from '../models/applications.js'
const router = new Router();
export default router


router.get('/form', async (ctx, next) => {
    const context = await constructors.findAll();
    await ctx.render('index', {context});
});

router.get('/table', async (ctx, next) => {
    await ctx.render('table');
});

router.post('/form/upload/', koaBody(), async (ctx, next) => {
    await console.log(ctx.request.body);
    await ctx.redirect('/form');
});