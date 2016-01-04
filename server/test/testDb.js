import { User}  from '../api/user/user.model';

var testDb = {
    init: ()=> {
        let user = new User({
            provider: 'local',
            name: 'Fake User',
            email: 'test@example.com',
            password: 'password'
        });
        return user.saveAsync()
            .then(data=> {
                testDb.user = data[0];
                let otherUser = new User({
                    provider: 'local',
                    name: 'Other User',
                    email: 'other@example.com',
                    password: 'password'
                });
                return otherUser.saveAsync();
            })
            .then(data=> {
                testDb.otherUser = data[0];
                return testDb;
            })
    },
    reset: ()=> {
        User.removeAsync();
    },
    user: null,
    otherUser: null

};

export default testDb;