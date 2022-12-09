import {sequelize} from './config.js'
import {constructors, docs_count, docs} from './models/models.js'

const migrate = async () => {
    try {
        constructors.hasMany(docs);
        docs.belongsTo(constructors);
        docs_count.hasMany(docs);
        docs.belongsTo(docs_count);

        // sync models with db
        await constructors.sync({ force: false });
        await docs.sync({ force: false });
        await docs_count.sync({ force: false });

        console.log('\nmigrate succesful');
    } catch (e) {
        console.log('migrate error: ', e);
    }
};

export default migrate;