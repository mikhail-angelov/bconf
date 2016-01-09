"use strict"

export default function () {
    return {
        restrict: 'EA',
        controllerAs: 'vm',
        controller: MessagesController,
        templateUrl: 'web/chat/messages/messages.html',
        scope: {},
        bindToController: true
    };
};

class MessagesController {
    constructor(MessagesStore, EventBus, $scope) {
        this.EventBus = EventBus;
        this.messages = MessagesStore.getMessages();
        MessagesStore.subscribe($scope, ()=>{
            this.messages = MessagesStore.getMessages()
        });
    }

    onSend() {
        let message = {
            type:'out',
            date: Date(),
            msg: this.newMessage
        };
        this.newMessage = '';
        this.EventBus.emit(this.EventBus.messages.ADD, message);
    }

}