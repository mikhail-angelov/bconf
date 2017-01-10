module.exports = {
    users: [
        {
            id: "guest",
            firstName: 'Guest',
            secondName: 'Guestovich',
            email: 'guest',
            password:'guest',
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
            id: "unit-test",
            firstName: 'Unit',
            secondName: 'Testov',
            email: 'test',
            password:'test',
            info: 'some information about this contact',
            status: 'I`m cool',
            country: 'USA',
            city: 'California',
            phoneNumber: '123456789',
            birthday: '1 march 1994',
            sex: 'male',
            date: new Date(),
            contacts: ["test", "test2"]
        },
        {
            id: "test",
            firstName: 'Vasya',
            secondName: 'Vasin',
            email: 'test1',
            password:'test',
            info: 'some information about this contact',
            status: 'I`m cool',
            country: 'USA',
            city: 'California',
            phoneNumber: '123456789',
            birthday: '1 march 1994',
            sex: 'male',
            date: new Date()
        }, {
            id: "test2",
            firstName: 'Petya',
            secondName: 'Petin',
            email: 'test2',
            password:'test',
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