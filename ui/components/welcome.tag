<welcome>
  <div class="welcome">
  <div class='row'>
  
    <h1>BCONF</h1>
    <h3>SimpleMessager</h3>
    
     
    <button onclick={onLogin}>Login</button>
    <button onclick={onLoginGuest}>Try as a Guest</button>
  
  </div>
  </div>

  
<script>

onLogin(){
    console.log('login')
    riot.route('login')
}

console.log('constructor')
onLoginGuest(){
    console.log('yo')
    riot.route('main')
}
</script>

  <style scoped>

 
  .welcome {
    display: flex;
    justify-content: center;    
    height: 100%;   
  }
  .welcome .row {
    margin: auto;
    margin-top: 10%;
  }
  .welcome h1 {
    font-family: 'Oswald', sans-serif;
    font-size: 225;   
    
  }
  .welcome h3 {
    font-family: 'Oswald', sans-serif;
    font-size: 100;
    margin-left: 2%;
    
  }


  button {
	  color: #fff;
    background-color: #29c5e6;
    border: none;
    height: 50px;
    font-family: 'Oswald', sans-serif;
    margin-left: 16%;
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
  </style>

</welcome>