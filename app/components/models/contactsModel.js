angular.module('bconfApp').factory('ContactsModel', function (User, $rootScope, $timeout) {

  var model = {
    list: [],
    loadContactsList: function (userId) {
      return User.getFriends(userId).then(function(friends){
        model.list = friends;
      })
    },
    getContact: function(contactId){
      angular.forEach(model.list, function(contact){
        if(contact.id == contactId){
          return contact;
        }
      });
      return {};
    }
  };

  $rootScope.$on('presence', function(scope, presence){
    console.log('presence is changed ' + presence);
    $timeout(function(){
      var newContact = true;
      angular.forEach(model.list, function(contact){
        if(contact.id == presence.userId){
          contact.status = presence.status;
          newContact = false;
        }
      });
      if(newContact && presence.status == 'online'){
        model.list.push({id: presence.userId, status: 'online', displayName:'guest',avatar:'images/anonymous.png'});
      }
    });
  });
  return model;
});
