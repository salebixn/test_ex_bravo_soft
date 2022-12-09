import {docs_count, docs} from '../models/models.js'

export const count = async (context) => {
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

export const sortCountDocs = async (context) => {
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