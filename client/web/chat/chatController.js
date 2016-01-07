'use strict';

class ChatController{

    constructor(Auth, ProfileStore, $scope){
        this.Auth = Auth;
        this.user = ProfileStore.getProfile();
        ProfileStore.subscribe($scope, ()=>{
            this.user = ProfileStore.getProfile();
        });
    }

    onLogout() {
        this.Auth.logout();
    }

    openMenu($mdOpenMenu, ev){
        $mdOpenMenu(ev);
    }

}
export default ChatController;
