<auth>
<div class='auth'>
<div class='row'>
<h1>Login</h1>
<form>
  User name:<br>
  <input type="text" name="username"><br>
  User password:<br>
  <input type="password" name="psw">
</form>
<button onclick={onBack}>Back</button>
<button onclick={onLogin}>Login</button>
</div>
</div>
<script>

this.onBack = ()=>{
    console.log('to welcom')
    riot.route('welcome')
}

this.onLogin = ()=>{
    console.log('login')
    riot.route('main')
}
</script>

<style scoped>

 
  .auth {
    display: flex;
    justify-content: center;    
    height: 100%;   
  }
  .auth .row {
    margin: auto;
    margin-top: 10%;
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


  .auth button {
	color: #fff;
    background-color: #29c5e6;
    border: none;
    height: 50px;
    font-family: 'Oswald', sans-serif;
    margin-left: 19%;
    width: 25%;
    font-size: 200%;
    margin-top: 10%;
}
input[type="text"] {
	background-color: #f3f3f3;
	border: 1px solid #e7e7e7;
	height: 30px;
	color: #b2b2b2;
	padding: 0 10px;
	vertical-align: top;
}
input[type="password"] {
	background-color: #f3f3f3;
	border: 1px solid #e7e7e7;
	height: 30px;
	color: #b2b2b2;
	padding: 0 10px;
	vertical-align: top;
}
  </style>

</auth>