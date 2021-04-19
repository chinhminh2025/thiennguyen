const articlesRouter = require('./articles');
const siteRouter = require('./site');

function route(app) {
    app.use('/project', articlesRouter);
    app.use('/', siteRouter);
}

module.exports = route;
