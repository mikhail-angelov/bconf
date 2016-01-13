export default function(params){
    return {
        controller: ContactFormController,
        locals:{params},
        templateUrl: 'web/chat/roster/contactForm/contactForm.html'
    };
}

class ContactFormController{
    constructor(params, $scope){
        console.log('params', params)
        console.log('$scope', $scope)

    }
}