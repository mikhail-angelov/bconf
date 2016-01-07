export default function () {
    return {
        restrict: 'EA',
        controllerAs: 'vm',
        controller: RosterController,
        templateUrl: 'web/chat/roster/roster.html',
        scope: {},
        bindToController: true
    };
};

class RosterController {
    constructor(Auth) {

        this.contacts = [
            //{displayName:'test',provider:'local'},
            //{displayName:'test',provider:'local'},
            //{displayName:'test',provider:'local'},
            //{displayName:'test',provider:'local'},
            //{displayName:'test',provider:'local'},
            //{displayName:'test',provider:'local'},
            //{displayName:'test',provider:'local'},
            //{displayName:'test',provider:'local'},
            //{displayName:'test',provider:'local'},
            //{displayName:'test',provider:'local'},
            //{displayName:'test',provider:'local'},
            //{displayName:'test',provider:'local'},
            //{displayName:'test',provider:'local'},
            //{displayName:'test',provider:'local'},
            //{displayName:'test',provider:'local'},
            //{displayName:'test',provider:'local'},
            {displayName:'test',provider:'local'}
        ];


            //Auth.getCurrentUser().then(user=>{
            //    $scope.user = user;
            //
            //    // $scope.user.id = util.randomToken(); //temp
            //
            //    ChatModel.init($scope.user.id);
            //    $scope.linkToShare = Property.getLinkToShare($scope.user);
            //
            //    //load friends
            //    ContactsModel.loadContactsList($scope.user.id);
            //});

    }

    onSelectChat(key) {
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
        //$mdDialog.show({
        //    controller: 'FindContactController',
        //    templateUrl: 'components/findContact/findContact.html'
        //}).then(function (answer) {
        //    $scope.alert = 'You said the information was "' + answer + '".';
        //}, function () {
        //    $scope.alert = 'You cancelled the dialog.';
        //});
    }

}