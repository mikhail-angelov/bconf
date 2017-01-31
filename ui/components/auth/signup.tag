<signup>
<form class="form_margin">
  
  <material-input error="{name_error}" name="firstName" valueChanged={allInputsComplete} label="First Name"></material-input>

  <material-input error="{lastName_error}" name="lastName" valueChanged={allInputsComplete} label="Last Name"></material-input>
  
  <material-input name="newEmail" valueChanged={allInputsComplete} type="email" label="User Email"></material-input>
  
  <material-input-with-error error="{psw_error}" name="newPassword" type="password" valueChanged={allInputsComplete} label="User Password"/>

  <!--<material-input error="{psw_error}" name="newPassword" type="password" valueChanged={allInputsComplete} label="User Password"></material-input>-->

  <!--<material-input error="{repeat_psw_error}" valueChanged={allInputsComplete} name="repeatNewPassword" type="password" label="Repeat Password"></material-input>-->
  
  <material-input-with-error error="{repeat_psw_error}" name="repeatNewPassword" type="password" valueChanged={allInputsComplete} label="User Password"/>

</form>
<!--<div class="error_notification_area">
    <div class="error_notification_show" show={opts.http_error}>
        <i class="material-icons error_icon">error_outline</i>
        <div class="error_name">User with this email already exist</div>
    </div>
    <div class="error_notification_show" each={err in this.errors_noti} show={show_errors}>
        <i class="material-icons error_icon">error_outline</i>
        <div class="error_name">{err}</div>
    </div>
</div>-->

<div class="buttons">
    <material-button name="signUpButton" class="ui"  onclick={onSignUp} disabled="true">
        <div class="text">Signup</div>
    </material-button>
    <material-button class="ui" onclick={this.opts.back}>
        <div class="text">Back</div>
    </material-button>
</div>

<script>
this.allInputsComplete = () => {
    if (this.firstName.querySelector('input').value.length > 0 && this.newEmail.querySelector('input').value.length > 0 
        && this.newPassword.querySelector('input').value.length > 0 && this.repeatNewPassword.querySelector('input').value.length > 0){
            this.signUpButton.setAttribute('disabled',false)
            return true;
        }else{
            this.signUpButton.setAttribute('disabled',true)
            return false;
        }
        this.update();
}
this.validatePassword = ()=>{
    //var name = this.firstName.querySelector('input').value;
    // var email = this.newEmail.querySelector('input').value;
    var password = this.newPassword.querySelector('input').value;
    var repeatPassword = this.repeatNewPassword.querySelector('input').value,
        errors = [];
    //if (name.length < 5) {
    //    errors.push("Your user name must be at least 5 characters");
    //}
    if (password !== repeatPassword) {
        errors.push("Your passwords must be same");
        this.repeat_psw_error = "Your passwords must be same";
    }
    if (password.length < 8) {
        errors.push("Your password must be at least 8 characters");
        this.psw_error = "Your password must be at least 8 characters";
    }
    if (password.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one letter.");
        this.psw_error = "Your password must contain at least one letter.";
    }
    if (password.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit."); 
        this.psw_error = "Your password must contain at least one digit.";
    }
    if (errors.length > 0) {
        this.show_errors = true ;
        this.errors_noti = errors;
        return false;
    }
    this.show_errors = false;
    return true;
}

this.onSignUp = () => {
    if (this.validatePassword()){
        const newUser = {
                firstName: this.firstName.querySelector('input').value,
                lastName: this.lastName.querySelector('input').value,
                email: this.newEmail.querySelector('input').value,
                password: this.newPassword.querySelector('input').value
            }
        console.log('===')
        this.opts.onsignup(newUser)
    };
    this.update();
    
}
</script>
<style>
    .error_notification_show {
        color: #cc0044;
        text-align: left;
        position: relative;
        padding: 2px 0px;
    }
    .error_notification_area {
        margin-bottom: 10px;
    }
    .error_name {
        line-height: 24px;
        padding-left: 24px;
    }
    .error_icon {
        float: left;
    }
    .form_margin {
        margin-bottom: 0px;
    }
</style>
</signup>