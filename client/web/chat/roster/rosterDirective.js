"use strict"

import contactForm from './contactForm/contactForm.js'

export default function () {
    return {
        restrict: 'EA',
        controllerAs: 'vm',
        controller: RosterController,
        templateUrl: 'web/chat/roster/roster.html',
        scope: {},
        bindToController: true
    }
};

class RosterController {
    constructor(ChatsStore, $scope, EventBus, ContactService, $mdDialog) {

        this.EventBus = EventBus;
        this.ContactService = ContactService;
        this.$mdDialog = $mdDialog;
        ChatsStore.subscribeAndInit($scope,()=>{
            this.chats = ChatsStore.getAllChat();
            this.currentChatIndex = ChatsStore.getCurrentChatIndex();
        });

        this.ContactService.getAllContacts();
    }

    onSelect(index) {
        console.log(index)
        this.EventBus.emit(this.EventBus.chats.SELECT_CHAT, index);
        //ChatModel.selectChat(key);
        //$scope.session = {
        //    id: key,
        //    user: ContactsModel.getContact(key),
        //    chat: ChatModel.getActiveChat()
        //};
        //
        //angular.forEach($scope.chat.list, function (value, k) {
        //    if (key != k) value.menuActive = false;
        //});
        //$scope.chat.list[key].menuActive = true;

    }

    onContact(index) {
        console.log(index)
        //var contacts = _.reduce($scope.contacts.list, function (o, c) {
        //    if (c.status == 'online') {
        //        o.push(c);
        //    }
        //    return o;
        //}, []);
        //var contact = contacts[index];
        //if (contact.status == 'online') {
        //    ChatModel.startChat(contact.id);
        //    $scope.onSelectChat(contact.id);
        //}
    }

    onAddContact() {
        this.$mdDialog.show(contactForm());
    }

}