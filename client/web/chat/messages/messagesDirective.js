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
    constructor(MessagesStore, ChatsStore, ChatService, $scope, $timeout) {
        this.ChatService = ChatService;
        MessagesStore.subscribeAndInit($scope, ()=> {
            $timeout(()=> {
                this.messages = MessagesStore.getMessages();
            });
        });
        ChatsStore.subscribeAndInit($scope, ()=> {
            this.chat = ChatsStore.getCurrentChat();
        })
    }

    onSend() {
        console.log(this.newMessage)
        if(this.newMessage) {
            this.ChatService.sendMessage(this.newMessage);
            this.newMessage = '';
        }
    }

}