<signup>
<form>
  
  <material-input name="newUser" focusChanged={checkCredentials} label="User Name"></material-input>
  
  <material-input name="newEmail" focusChanged={checkCredentials} type="email" label="User Email"></material-input>
  
  <material-input error="{error}" name="newPassword" type="password" label="User Password"></material-input>

  <material-input focusChanged={checkCredentials}  error="{error}" name="repeatNewPassword" type="password" label="Repeat Password"></material-input>
  
</form>
<div class="buttons">
<material-button name="qwer" class="ui" disabled="true" onclick={onSignUp}>
    <div class="text">Signup</div>
</material-button>
<material-button class="ui" onclick={this.opts.onsignupback}>
    <div class="text">back</div>
</material-button>
</div>
<script>

// this.disabled = true;
// this.dynamicAttributes = ['disabled'];
// setTimeout(function(){
//     this.update({disabled:false});
// }.bind(this),10000);


this.state = 'signup'

this.onLogin = ()=>{
    console.log('login')
    riot.route('main')
}

this.checkCredentials = (isFocused)=>{
    this.allInputsComplete();
    if (!isFocused){
        if (this.newPassword.querySelector('input').value.length > 0 && this.repeatNewPassword.querySelector('input').value.length > 0){
            if (this.newPassword.querySelector('input').value === this.repeatNewPassword.querySelector('input').value){
                this.error = false;
            }else{
                this.error = true;
            }
            this.update();
        }
    }else{
        this.error = false;
        this.update();
    }
}


this.allInputsComplete = () => {
    
    if (this.newUser.querySelector('input').value.length > 0 && this.newEmail.querySelector('input').value.length > 0 
        && this.repeatNewPassword.querySelector('input').value.length > 0 && this.repeatNewPassword.querySelector('input').value.length > 0){
            this.update({disabled:false})
        }else{
            this.update({disabled:true});
        }
}

this.onSignUp = () => {
    if (this.newPassword.querySelector('input').value === this.repeatNewPassword.querySelector('input').value){
        this.newPsw = this.newPassword.querySelector('input').value
        this.error = false;
    }else{
        this.error = true;
    }
    const newUserCredentials = {
        userName: this.newUser.querySelector('input').value,
        email: this.newEmail.querySelector('input').value,
        password: this.newPsw
    }
    this.state = 'signin'

}
</script>
<style>
    
</style>
</signup>