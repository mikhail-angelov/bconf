<signin>
<div class="signin">

<form>
  
  <material-input label="User Name"></material-input>
  
  <material-input label="User Password"></material-input>
  
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
this.state = 'signin'

this.onLogin = ()=>{
    console.log('login')
    riot.route('main')
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