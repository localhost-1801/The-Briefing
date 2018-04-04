const { expect } = require('chai')
const request = require('supertest')
const app = require('../index')



describe('article analysis route', () => {
    describe('/api/article/stateData', () => {
        it('GET /api/article/stateData', () => {
            return request(app).get('/api/article/stateData')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                })
        })
    })

    describe('/api/article/landing', () => {
        it('GET /api/article/landing', () => {
            return request(app).get('/api/article/landing')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                })
        })
    })

    describe('/api/article/url', () => {
        const url = 'https://www.nytimes.com/2018/03/29/world/europe/russia-expels-diplomats.html'
        it('GET /api/article/url', () => {
            return request(app).get(`/api/article/url/${url}`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object')
                })
        })

    })
})