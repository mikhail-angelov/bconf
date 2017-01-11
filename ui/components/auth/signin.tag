<signin>
    <form class="position_relative">
    
    <material-input error={error} name="user_name" value={userName} label="User Name"></material-input>
    
    <material-input error={error} type="password" name="user_password" value={userPassword} label="User Password"></material-input>
    <div class="incorrect_password" show={loginError}>Incorrect password or user name</div>
    <material-checkbox name="checker" checked=true>
        Remember me
    </material-checkbox>
    
    </form>
    <div class="buttons">
        <material-button class="ui" onclick={onLogin}>
            <div class="text">SignIn</div>
        </material-button>
        <material-button class="ui" onclick={this.opts.onsignup}>
            <div class="text">SignUp</div>
        </material-button>
    </div>
    <a href='' onclick={this.opts.onforgetpassword}>Forget Password</a>
    <material-spinner class="progressBar" if={progress}></material-spinner>
<script>

const store = require('../../services/store')
const actions = require('../../services/actions/index.js')
store.subscribe(()=>{
    this.contacts = store.getState().contacts;
    this.chats = store.getState().chats;
    this.state = store.getState().uiState;
    this.auth = store.getState().auth;
    if (this.auth.status == "error") {
        this.loginError = true;
        this.error = true;
    }
    if (this.auth.status == "done") {
        this.loginError = false;
        this.error = false;
    }
    if (this.auth.status == "progress") {
        this.progress = true;
    }else{
        this.progress = false;
    }
    this.update();
});
this.loginError = false;
const localStorageCredentials = localStorage.getItem('credentials');
if (localStorageCredentials){
    const localCredentials = JSON.parse(localStorageCredentials);

    this.userName = localCredentials.email;
    this.userPassword = localCredentials.password;
}
this.state = 'signin'
this.onLogin = ()=>{
    
    const credentials = {
        email: this.user_name.querySelector('input').value,
        password: this.user_password.querySelector('input').value
    }
    const rememberMe = this.checker.querySelector('input').value == 'true';
    console.log('checker',this.checker.querySelector('input').value);
    store.dispatch(actions.login(credentials, rememberMe));
    console.log('login');
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
.incorrect_password {
    position: absolute;
    width: 235px;
    text-align: center;
    bottom: 20px;
    color: #cc0044;
    font-size: 12px;
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