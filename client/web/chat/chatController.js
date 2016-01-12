'use strict';

class ChatController{

    constructor(Auth, ProfileStore, $scope, $state){
        this.Auth = Auth;
        this.$state = $state;
        this.user = ProfileStore.getProfile();
        ProfileStore.subscribe($scope, ()=>{
            this.user = ProfileStore.getProfile();
        });
    }

    onLogout() {
        this.Auth.logout();
        this.$state.go('main');
    }

    openMenu($mdOpenMenu, ev){
        $mdOpenMenu(ev);
    }

}
export default ChatController;
