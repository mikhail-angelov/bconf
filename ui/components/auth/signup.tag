<signup>
<form>
  
  <material-input name="newUser" valueChanged={allInputsComplete} label="User Name"></material-input>
  
  <material-input name="newEmail" focusChanged={checkCredentials} valueChanged={allInputsComplete} type="email" label="User Email"></material-input>
  
  <material-input error="{error}" name="newPassword" focusChanged={checkCredentials} type="password" valueChanged={allInputsComplete} label="User Password"></material-input>

  <material-input focusChanged={checkCredentials} error="{error}" valueChanged={allInputsComplete} name="repeatNewPassword" type="password" label="Repeat Password"></material-input>
  
</form>
<div class="buttons">
    <material-button name="signUpButton" class="ui"  onclick={onSignUp} disabled='true'>
        <div class="text">Signup</div>
    </material-button>
    <material-button class="ui" onclick={this.opts.onsignupback}>
        <div class="text">Back</div>
    </material-button>
</div>
<script>

this.state = 'signup'

this.onLogin = ()=>{
    console.log('login')
    riot.route('main')
}

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
    
    if (this.newUser.querySelector('input').value.length > 0 && this.newEmail.querySelector('input').value.length > 0 
        && this.newPassword.querySelector('input').value.length > 0 && this.repeatNewPassword.querySelector('input').value.length > 0){
            this.signUpButton.setAttribute('disabled',false)
        }else{
            this.signUpButton.setAttribute('disabled',true)
        }
}

this.validatePassword = ()=>{
    // var name = this.newUser.querySelector('input').value;
    // var email = this.newEmail.querySelector('input').value;
    var p = this.newPassword.querySelector('input').value;
    var rp = this.repeatNewPassword.querySelector('input').value,
        errors = [];
    // if (name.length < 5) {
    //     errors.push("Your user name must be at least 5 characters");
    // }
    if (p !== rp) {
        errors.push("Your passwords must be same");
    }
    if (p.length < 8) {
        errors.push("Your password must be at least 8 characters"); 
    }
    if (p.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one letter.");
    }
    if (p.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit."); 
    }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        this.error = true;
        // this.newPassword.querySelector('input').focus();
        return false;
        this.update();
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
    this.validatePassword();
    if (validatePassword) {
        const newUserCredentials = {
            userName: this.newUser.querySelector('input').value,
            email: this.newEmail.querySelector('input').value,
            password: this.newPsw
        }
    }
    this.state = 'signin'

}
</script>
<style>
    
</style>
</signup>