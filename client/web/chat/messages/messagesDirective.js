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
    constructor() {

    }

    onSend() {
        //ChatModel.sendMessage($scope.newMessage);
        //$scope.newMessage = '';
    }

}