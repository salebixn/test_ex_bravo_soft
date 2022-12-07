import Router from '@koa/router'
import {koaBody} from 'koa-body'
import {Sequelize} from 'sequelize'
import constructors from '../models/constructors.js'
import docs from '../models/docs.js'
import docs_count from '../models/docs_count.js'
const router = new Router();
const sequelize = new Sequelize('postgres://el3m3nt0:123456@localhost:5432/el3m3nt0');

export default router


const count = async (context) => {
    let rows = await docs.findAll();
    let count = 0;

    for(let i = 0; i < context.length; i++) {
        for(let j = 0; j < rows.length; j++) {
            if(rows[j].docsCountId === context[i].docsCountId)
                count++;
        }
        let doc = await docs_count.findByPk(context[i].docsCountId);
        doc.count = count;
        await doc.save();
        count = 0;
    }
};

const sortCountDocs = async (context) => {
    let sorted = [];
    for(let i = 0; i < context.length; i++)
        sorted.push(context[i].docsCountId.count);
    
    await sorted.sort((a, b) => b - a);

    for(let i = 0; i < sorted.length; i++)
        for(let j = 0; j < context.length; j++) {
            if(context[j].docsCountId.count === sorted[i]) {
                let temp = context[i];
                context[i] = context[j];
                context[j] = temp;
            }
        }
};

//GET
router.get('/', async (ctx, next) => {
    await ctx.redirect('/form');
});

router.get('/form', async (ctx, next) => {
    const context = await constructors.findAll();
    await ctx.render('index', {context});
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
    let row = await docs_count.findOne({where: {doc_name: ctx.request.body.doc}});
    
    if(row === null) {
        await docs_count.create({
            doc_name: ctx.request.body.doc
        });
        row = await docs_count.findOne({where: {doc_name: ctx.request.body.doc}});
        var doc = null;
    } else {
        var doc = await docs.findAll({where: {constructorId: ctx.request.body.id_human,
                                                docsCountId: row.id}});
        console.log(doc)
    }

    if(doc === null || doc == []) {
        await docs.create({
            constructorId: ctx.request.body.id_human,
            docsCountId: row.id
        });
    }

    await ctx.redirect('/form');
});