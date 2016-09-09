<auth>
<div class='container'>
<div id="singup" class="singin">

<form>
  User name:<br>
  <input type="text" name="username"><br>
  User password:<br>
  <input type="password" name="psw">
</form>
<div class="buttons">
<button onclick={onSingUp} class="waves-effect waves-light btn">SingUp</button>
<button onclick={onLogin} class="waves-effect waves-light btn">SingIn</button>
</div>
</div>
<div class="social">
  <button onclick={onLogin} class="waves-effect waves-light btn">google</button>
  <button onclick={onLogin} class="waves-effect waves-light btn">vk</button>
  <button onclick={onLogin} class="waves-effect waves-light btn">facebook</button>
  <button onclick={onLogin} class="waves-effect waves-light btn">twitter</button>
</div>
</div>
<script>

this.onBack = ()=>{
    console.log('to welcome')
    riot.route('welcome')
}

this.onLogin = ()=>{
    console.log('login')
    riot.route('main')
}
this.onSingUp = ()=>{
  console.log('login')
    riot.route('singup')
}
</script>

<style scoped>

 
  .container {
    display: flex;
    flex-flow: row-reverse wrap;
    justify-content: center;
    align-items: center;
    height: 100%; 
  }
  .singin {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
  }
  .social {
    display: flex;
    flex-flow: column wrap;
    margin-right: 35px;
    
  }
  .social button {
    margin-top: 10px;
    height: 35px;
    width: 300px;
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


  .buttons {
	
    
}

  </style>

</auth>