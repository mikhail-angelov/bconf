<forget>
<form>
  
  <material-input label="User Email"></material-input>
  
</form>
<div class="buttons">
<material-button class="ui" onclick={this.opts.onforgetpasswordtrue}>
    <div class="text">send</div>
</material-button>
<material-button class="ui" onclick={this.opts.onforgetpasswordback}>
    <div class="text">back</div>
</material-button>
<script>
  this.state = 'forgetpassword'
</script>
</forget>