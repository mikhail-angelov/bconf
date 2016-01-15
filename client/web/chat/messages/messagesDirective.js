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
    constructor(MessagesStore, ChatService, $scope, $timeout) {
        this.ChatService = ChatService;
        this.messages = MessagesStore.getMessages();
        MessagesStore.subscribe($scope, ()=> {
            //$timeout(()=>{
                this.messages = MessagesStore.getMessages();
            //});
        });
    }

    onSend() {
        let message = {
            type: 'out',
            date: Date(),
            msg: this.newMessage
        };
        this.newMessage = '';
        console.log(message)
        this.ChatService.sendMessage(message);
    }

}