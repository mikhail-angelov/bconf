import '../common/material-input-with-error.tag'
<signin>
    <form class="position_relative">
  
    <!--<material-input-with-error error={error_user_name} name="user_name" value={userName} label="User Name"></material-input-with-error>  -->
    <material-input error={opts.http_error} name="user_name" value={userName} label="User Name"></material-input>

    <material-input error={opts.http_error} type="password" name="user_password" value={userPassword} label="User Password"></material-input>

    <material-checkbox name="checker" checked=true>
        Remember me
    </material-checkbox>
    
    </form>
    <div class="error_notification_area">
        <div class="error_notification_show" show={opts.http_error}>
            <i class="material-icons error_icon">error_outline</i>
            <div class="error_name">Incorrect password or user name</div>
        </div>
    </div>
    <div class="buttons">
        <material-button class="ui" onclick={onLogin}>
            <div class="text">SignIn</div>
        </material-button>
        <material-button class="ui" onclick={this.opts.tosignup}>
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