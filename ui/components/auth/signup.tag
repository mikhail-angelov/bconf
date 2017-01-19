<signup>
<form>
  
  <material-input name="firstName" valueChanged={allInputsComplete} label="First Name"></material-input>

  <material-input name="lastName" valueChanged={allInputsComplete} label="Last Name"></material-input>
  
  <material-input name="newEmail" focusChanged={checkCredentials} valueChanged={allInputsComplete} type="email" label="User Email"></material-input>
  
  <material-input error="{error}" name="newPassword" focusChanged={checkCredentials} type="password" valueChanged={allInputsComplete} label="User Password"></material-input>

  <material-input focusChanged={checkCredentials} error="{error}" valueChanged={allInputsComplete} name="repeatNewPassword" type="password" label="Repeat Password"></material-input>
  
  <div class="error" show={opts.http_error}>user with this email already exist</div>
</form>
<div class="buttons">
    <material-button name="signUpButton" class="{background-color: allInputsComplete()} ui"  onclick={onSignUp} disabled='true'>
        <div class="text">Signup</div>
    </material-button>
    <material-button class="background-color ui" onclick={this.opts.back}>
        <div class="text">Back</div>
    </material-button>
</div>
<script>


this.checkCredentials = (isFocused)=>{
    if (!isFocused){
        if (this.newPassword.querySelector('input').value.length > 0 && this.repeatNewPassword.querySelector('input').value.length > 0){
            if (this.newPassword.querySelector('input').value === this.repeatNewPassword.querySelector('input').value){
                this.error = false;
            }else{
                this.error = true;
            }
        }
    }else{
        this.error = false;
    }
    this.update();
}


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
    // var name = this.newUser.querySelector('input').value;
    // var email = this.newEmail.querySelector('input').value;
    var password = this.newPassword.querySelector('input').value;
    var repeatPassword = this.repeatNewPassword.querySelector('input').value,
        errors = [];
    // if (name.length < 5) {
    //     errors.push("Your user name must be at least 5 characters");
    // }
    if (password !== repeatPassword) {
        errors.push("Your passwords must be same");
    }
    if (password.length < 2) {
        errors.push("Your password must be at least 8 characters"); 
    }
    if (password.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one letter.");
    }
    if (password.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit."); 
    }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        this.error = true;
        // this.newPassword.querySelector('input').focus();
        return false;
    }
    return true;
}

this.onSignUp = () => {
    if (this.newPassword.querySelector('input').value === this.repeatNewPassword.querySelector('input').value){
        if (this.newPassword.querySelector('input').value.length > 0 && this.repeatNewPassword.querySelector('input').value.length > 0){
            this.newPsw = this.newPassword.querySelector('input').value
            this.error = false;
            
        }
    }else{
        this.error = true;
    }    
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
    
}
</script>
<style>
    
</style>
</signup>