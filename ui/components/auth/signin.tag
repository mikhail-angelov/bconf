<signin>
    <form class="position_relative">
    
    <material-input error={error} name="user_name" value={userName} label="User Name"></material-input>
    
    <material-input error={error} type="password" name="user_password" value={userPassword} label="User Password"></material-input>
    <div class="error" show={opts.http_error}>Incorrect password or user name</div>
    <material-checkbox name="checker" checked=true>
        Remember me
    </material-checkbox>
    
    </form>
    <div class="buttons">
        <material-button class="background-color ui" onclick={onLogin}>
            <div class="text">SignIn</div>
        </material-button>
        <material-button class="background-color ui" onclick={this.opts.tosignup}>
            <div class="text">SignUp</div>
        </material-button>
    </div>
    <a href='' onclick={this.opts.toforgetpassword}>Forget Password</a>
<script>


const localStorageCredentials = localStorage.getItem('credentials');

this.onLogin = ()=>{
    
    const credentials = {
        email: this.user_name.querySelector('input').value,
        password: this.user_password.querySelector('input').value
    }
    const rememberMe = this.checker.querySelector('input').value == 'true';
    console.log('checker',this.checker.querySelector('input').value);

    this.opts.login(credentials, rememberMe)
}

</script>
<style>
  material-input {
    display: block;
    padding: 10px 0;
    position: relative;
    width: 235;
    height: 50px;
}
.buttons {
    display: flex;
    flex-direction: row;
}
.buttons material-button {
    margin-right: 5px;
}

.progressBar {
    position: absolute;
    left: 0;
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
  }
     
</style>
</signin>