import Router from '@koa/router'
import {koaBody} from 'koa-body'
import {sequelize} from '../config.js'
//models
import {constructors, docs_count, docs} from '../models/models.js'
import {count, sortCountDocs} from './utils.js'
const router = new Router();
export default router;


//GET
router.get('/', async (ctx, next) => {
    await ctx.redirect('/form');
});

router.get('/form', async (ctx, next) => {
    const context = await constructors.findAll();
    var error = ctx.session.error;
    ctx.session = null;

    await ctx.render('index', {context, error});
});

router.get('/table', async (ctx, next) => {
    let context = await docs.findAll({
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('docsCountId')), 'docsCountId']
        ]
    });

    // считаем в count() количество одинаковых записей и записываем
    // в таблицу docs_count в поле count
    await count(context);

    // переопределение docsCountId записью из таблицы docs_count
    for(let i = 0; i < context.length; i++)
        context[i].docsCountId = await docs_count.findByPk(context[i].docsCountId);

    // сортировка по количеству заявок по убыванию
    await sortCountDocs(context);    

    await ctx.render('table', {context});
});


//POST
router.post('/form/upload/', koaBody(), async (ctx, next) => {
    // если выбрали конструктора
    if(ctx.request.body.id_human !== '' && ctx.request.body.id_human !== 'Кто вы') {
        let row = await docs_count.findOne({where: {doc_name: ctx.request.body.doc}});
        
        if(row === null) {
            await docs_count.create({
                doc_name: ctx.request.body.doc
            });
            row = await docs_count.findOne({where: {doc_name: ctx.request.body.doc}});
            var doc = [];
        } else {
            var doc = await docs.findAll({where: {constructorId: ctx.request.body.id_human,
                                                    docsCountId: row.id}});
        }

        if(doc.length === 0) {
            await docs.create({
                constructorId: ctx.request.body.id_human,
                docsCountId: row.id
            });
        } else {
            ctx.session.error = 'Вы уже отправляли заявку на этот документ, она уже была учтена';
        }
    // если не выбрали конструктора
    } else {
        ctx.session.error = 'Вы не выбрали конструктора';
    }

    await ctx.redirect('/form');
});