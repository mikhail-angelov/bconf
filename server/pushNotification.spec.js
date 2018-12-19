var proxyquire = require('proxyquire')
const expect = require('chai').expect
const mongoUnit = require('mongo-unit')
const data = require('./tests/db/pushNotification.json')


const pushNotification = proxyquire('./pushNotification', {
    'firebase-admin': {
        messaging: () => ({
            send: (notification) => Promise.resolve("Ok!", notification),

        })
    }
})

describe('push notification', () => {
    beforeEach(() => mongoUnit.load(data))
    afterEach(() => mongoUnit.drop())

    it('should send notifications', async () => {
        const sentNotification = await pushNotification.send({ text: 'test text', chatId: '5ba6532c43c528a283a86f57', authorId: "5ba6532c43c528a283a86f54", online: { "5ba6532c43c528a283a86f54": "test" } })
        expect(sentNotification).eql(1)
    })
    it('should send 0 notifications to wrong chatId', async () => {
        const sentNotification = await pushNotification.send({ text: 'test text', chatId: 'ba6532c43c528a283a86f57', online: { "5ba6532c43c528a283a86f54": "test" } })
        expect(sentNotification).eql(0)
    })
})