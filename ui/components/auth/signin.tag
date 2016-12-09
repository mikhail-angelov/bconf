<signin>
<div class="signin">

<form>
  
  <material-input name="user_name" label="User Name"></material-input>
  
  <material-input type="password" name="user_password" label="User Password"></material-input>
  
  <material-checkbox name="checker">
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
</div>
<script>
const store = require('../../services/store')
const actions = require('../../services/actions/index.js')

this.state = 'signin'

this.onLogin = ()=>{
    const credentials = {
        email:this.user_name.children[1].lastElementChild.value,
        password:this.user_password.children[1].lastElementChild.value
    }
    const rememberMe = this.checker.lastElementChild.value == 'true';
    console.log(this.checker.lastElementChild.value)

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
   /*.buttons {
      display: flex;
       flex-direction: row;
   }*/
  .buttons material-button {
      margin-right: 5px;
  }    
     
</style>
</signin>