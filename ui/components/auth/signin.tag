<signin>
    <form>
    
    <material-input name="user_name" value={userName} label="User Name"></material-input>
    
    <material-input type="password" name="user_password" value={userPassword} label="User Password"></material-input>
    
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
<script>

const localStorageCredentials = localStorage.getItem('credentials');
if (localStorageCredentials){
    const localCredentials = JSON.parse(localStorageCredentials);

    this.userName = localCredentials.email;
    this.userPassword = localCredentials.password;
}
const store = require('../../services/store')
const actions = require('../../services/actions/index.js')

this.state = 'signin'
this.onLogin = ()=>{
    const credentials = {
        email: this.user_name.querySelector('input').value,
        password: this.user_password.querySelector('input').value
    }
    const rememberMe = this.checker.querySelector('input').value == 'true';
    console.log('checker',this.checker.querySelector('input').value)

    store.dispatch(actions.login(credentials, rememberMe))

    console.log('login')
    
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
     
</style>
</signin>