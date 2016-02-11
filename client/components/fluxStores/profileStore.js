import BaseStore from './baseStore.js'

class ProfileStore extends BaseStore {

    constructor(EventBus, appConfig) {
        super(EventBus);
        this.id = 'ProfileStore';
        this.userRoles = appConfig.userRoles || [];

        this.data = {
            profile: {}
        };
        EventBus.on(EventBus.profile.LOAD, (scope, profile)=> {
            this.data.profile = profile;
            this.emitChanges();
        });

    }

    getProfile() {
        return this.data.profile;
    }

    hasRole(role) {
        if (this.data.profile) {
            return this.userRoles.indexOf(this.data.profile.role) >= this.userRoles.indexOf(role);
        } else {
            return false;
        }
    }

    isAdmin() {
        return this.hasRole('admin');
    }
}

export default ProfileStore;