<signup>
<form>
  
  <material-input label="User Name"></material-input>
  
  <material-input type="password" label="User Password"></material-input>
  
  <material-input type="password" label="Repeat Password"></material-input>
  
</form>
<div class="buttons">
<material-button class="ui" onclick={this.opts.onsignuptrue}>
    <div class="text">Signup</div>
</material-button>
<material-button class="ui" onclick={this.opts.onsignupback}>
    <div class="text">back</div>
</material-button>
</div>
<script>
this.state = 'signup'

this.onLogin = ()=>{
    console.log('login')
    riot.route('main')
}
</script>
</signup>