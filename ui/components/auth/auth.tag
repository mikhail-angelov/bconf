<auth>
<div class='container'>
 <div  id="signin">
<signin class="signin" if={state==='signin'} onSignUp={onSignUp} onForgetPassword={onForgetPassword}/>
<signup class="signin" if={state==='signup'} onSignUpBack={onSignUpBack} onSignUpTrue={onSignUpTrue}/>
<forget class="signin" if={state==='forget'} onForgetPasswordBack={onForgetPasswordBack} onForgetPasswordTrue={onForgetPasswordTrue}/>


 </div>
<div class="social">
  <material-button class="ui" shady="true">
    <div class="text">google</div>
</material-button>
<material-button class="ui" shady="true">
    <div class="text">vk</div>
</material-button>
<material-button class="ui" shady="true">
    <div class="text">twitter</div>
</material-button>
<material-button class="ui" shady="true">
    <div class="text">facebook</div>
    <i class="material-icons"></i>
</material-button>
</div>
</div>
<script>
this.state = 'signin';

this.onLogin = ()=>{
    console.log('login')
    riot.route('main')
}
this.onSignUp = ()=>{
	this.state = 'signup'
	this.update()
  console.log('signup complete')
}
this.onSignUpBack = ()=>{
	this.state = 'signin'
	this.update()
  console.log('signin complete')
}
this.onSignUpTrue = ()=>{
  this.state = 'signin'
	this.update()
  alert("SignUp complete!")
  console.log('signun complete')
}
this.onForgetPassword = ()=>{
  this.state = 'forget'
  this.update()
  console.log('You forgetpassword')
}
this.onForgetPasswordBack = ()=>{
  this.state = 'signin'
	this.update()
}
this.onForgetPasswordTrue = ()=>{
  this.state = 'signin'
	this.update()
  alert("Your password send on your email!")
}
</script>

<style scoped>

 
  .container {
    display: flex;
    flex-flow: row-reverse wrap;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}
  .signin {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
  }
  #signin {
    width: 285px;
  }
  .social {
    display: flex;
    flex-flow: column wrap;
    margin-right: 35px;
    
  }
  .social material-button {
    margin-top: 10px;
    height: 40px;
    width: 250px;
  }
  .auth h1 {
    font-family: 'Oswald', sans-serif;
    font-size: 225;   
    
  }
  .auth h3 {
    font-family: 'Oswald', sans-serif;
    font-size: 100;
    margin-left: 2%;
    
  }
  .auth form {
    margin-left: 36%;
  }

material-button {
    background: #cc0044;
  }

  .buttons {
	
    
}

  </style>

</auth>