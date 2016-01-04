import BaseStore from './BaseStore.js'

class ProfileStore extends BaseStore{

    constructor(EventBus){
        super(EventBus);
        this.id = 'OrderStore';

        this.data = {
            profile: {}
        };
        EventBus.on(EventBus.profile.LOAD, (scope,profile)=>{
            this.data.profile = profile;
            this.emitChanges();
        });

    }

    getProfile(){
        return this.data.profile;
    }
}

export default ProfileStore;