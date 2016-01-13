export default function(params){
    return {
        controller: ContactFormController,
        controllerAs: 'vm',
        locals:{params},
        templateUrl: 'web/chat/roster/contactForm/contactForm.html'
    };
}

class ContactFormController{
    constructor(params, $mdDialog){
        console.log('params', params)
        this.$mdDialog = $mdDialog;

    }

    onSave(){
        this.$mdDialog.hide('yo');
    }

    onClose(){
this.$mdDialog.cancel();
    }
}