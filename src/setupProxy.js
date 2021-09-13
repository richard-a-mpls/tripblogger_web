const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
    // app.use('/v1/photos/*', createProxyMiddleware({ target: 'http://localhost:8081/' }))
    // app.use('/v1/profile', createProxyMiddleware({ target: 'http://localhost:8081/' }))
    // app.use('/v1/public/*', createProxyMiddleware({ target: 'http://localhost:8081/' }))
    // app.use('/v1/projects', createProxyMiddleware({ target: 'http://localhost:8080/' }))
    app.use('/v1/', createProxyMiddleware({ target: 'http://localhost:8081/' }))
}
