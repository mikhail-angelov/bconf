const ObjectId = require('mongodb').ObjectId

module.exports = {
  users: [
    {
      _id: ObjectId('5554ba3324d05f4bc2cab3f0'),
      firstName: 'Guest',
      secondName: 'Guestovich',
      name: 'guest',
      email: 'guest',
      password: 'guest',
      info: 'some information about this contact',
      status: 'I`m cool',
      country: 'USA',
      city: 'California',
      phoneNumber: '123456789',
      birthday: '1 march 1994',
      sex: 'male',
      date: new Date()
    },
    {
      _id: ObjectId('5554ba3324d05f4bc2cab3f1'),
      firstName: 'Unit',
      secondName: 'Testov',
      name: 'test',
      email: 'test',
      password: 'test',
      info: 'some information about this contact',
      status: 'I`m cool',
      country: 'USA',
      city: 'California',
      phoneNumber: '123456789',
      birthday: '1 march 1994',
      sex: 'male',
      date: new Date(),
      contacts: [ObjectId('5554ba3324d05f4bc2cab3f2'), ObjectId('5554ba3324d05f4bc2cab3f3')]
    },
    {
      _id: ObjectId('5554ba3324d05f4bc2cab3f2'),
      firstName: 'Vasya',
      secondName: 'Vasin',
      name: 'test',
      email: 'test1',
      password: 'test',
      info: 'some information about this contact',
      status: 'I`m cool',
      country: 'USA',
      city: 'California',
      phoneNumber: '123456789',
      birthday: '1 march 1994',
      sex: 'male',
      date: new Date()
    }, {
      _id: ObjectId('5554ba3324d05f4bc2cab3f3'),
      firstName: 'Petya',
      secondName: 'Petin',
      name: 'test',
      email: 'test2',
      password: 'test',
      info: 'some information about this contact',
      status: 'I`m cool',
      country: 'USA',
      city: 'California',
      phoneNumber: '123456789',
      birthday: '1 march 1994',
      sex: 'male',
      date: new Date()
    }
  ]
}
