class EventBus {

    constructor($rootScope) {
        this.$rootScope = $rootScope;
        angular.extend(this,{
            profile : {
                LOAD: 'loadProfile'
            },
            contacts:{
                LOAD_ALL:'loadAllContacts'
            },
            chats:{
                LOAD_ALL:'loadAllChats'
            },
            messages:{
                ADD_MESSAGE:'addMessage'
            }
        });
    }

    emit (event) {
        return this.$rootScope.$broadcast.apply(this.$rootScope, arguments);
    }

    on(event, cb){
        return this.$rootScope.$on(event,cb);
    }

}

export default EventBus;