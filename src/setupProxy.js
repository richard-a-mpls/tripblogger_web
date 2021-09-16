const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
    app.use('/v1/me/projects/*/photos', createProxyMiddleware({ target: 'http://localhost:8081/' }))
    app.use('/v1/projects/*/profile', createProxyMiddleware({ target: 'http://localhost:8081/' }))
    app.use('/v1/projects/', createProxyMiddleware({ target: 'http://localhost:8080/' }))
    app.use('/v1/me/', createProxyMiddleware({ target: 'http://localhost:8080/' }))
    app.use('/v1/', createProxyMiddleware({ target: 'http://localhost:8081/' }))
}
