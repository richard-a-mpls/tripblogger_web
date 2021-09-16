const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {

    if ("PRODUCTION" === process.env.REACT_APP_ENVIRONMENT) {
        app.use('/v1/me/projects/*/photos', createProxyMiddleware({target: 'http://localhost:8081/'}))
        app.use('/v1/projects/*/profile', createProxyMiddleware({target: 'http://localhost:8081/'}))
        app.use('/v1/projects/', createProxyMiddleware({target: 'https://tripblogger-api-spring.azurewebsites.net/', changeOrigin: true}))
        app.use('/v1/me/', createProxyMiddleware({target: 'https://tripblogger-api-spring.azurewebsites.net/', changeOrigin: true}))
        app.use('/v1/', createProxyMiddleware({target: 'http://localhost:8081/'}))
    } else {
        app.use('/v1/me/projects/*/photos', createProxyMiddleware({target: 'http://localhost:8081/'}))
        app.use('/v1/projects/*/profile', createProxyMiddleware({target: 'http://localhost:8081/'}))
        app.use('/v1/projects/', createProxyMiddleware({target: 'http://localhost:8080/'}))
        app.use('/v1/me/', createProxyMiddleware({target: 'http://localhost:8080/'}))
        app.use('/v1/', createProxyMiddleware({target: 'http://localhost:8081/'}))
    }
}