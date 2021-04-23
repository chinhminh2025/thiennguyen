const articlesRouter = require('./articles');
const siteRouter = require('./site');
const projectRouter = require('./projects');

function route(app) {
    app.use('/articles', articlesRouter);
    app.use('/projects', projectRouter);
    app.use('/', siteRouter);
   
}

module.exports = route;
