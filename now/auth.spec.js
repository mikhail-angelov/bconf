const expect = require('chai').expect
const mongoUnit = require('mongo-unit')
const auth = require('./auth')
const data = require('./tests/db/auth.json')


describe('auth', () => {
  beforeEach(() => mongoUnit.load(data))
  afterEach(() => mongoUnit.drop())


  it('should login valid user', async () => {
    const response = await auth.login({ email: 'test1@test.com', password: 'test1' })
    expect(!!response.token).eql(true)
  })

})
