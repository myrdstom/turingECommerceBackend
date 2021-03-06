/* eslint-disable import/no-dynamic-require */
/* eslint-disable prefer-template */
/* eslint-disable no-path-concat */
/* eslint-disable dot-notation */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}
const db = {
    attribute: sequelize.import('./attribute'),
    attributeValue: sequelize.import('./attributeValue'),
    category: sequelize.import('./category'),
    department: sequelize.import('./department'),
    order: sequelize.import('./order'),
    orderDetail: sequelize.import('./orderDetail'),
    product: sequelize.import('./product'),
    productAttribute: sequelize.import('./productAttribute'),
    productCategory: sequelize.import('./productCategory'),
    shipping: sequelize.import('./shipping'),
    shippingRegion: sequelize.import('./shippingRegion'),
    shoppingCart: sequelize.import('./shoppingCart'),
    tax: sequelize.import('./tax'),
};

fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        );
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
