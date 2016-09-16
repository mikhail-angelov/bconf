<welcome>
  <div class="welcome">
  
  
    <h1>BCONF</h1>
    <h3>SimpleMessager</h3>
    
     <dic class='buttons'>
    <material-button class="ui" onclick={onLogin}>
      <div class="text">Login</div>
    </material-button>
    <material-button class="ui" onclick={onLoginGuest}>
      <div class="text">Try as Guest</div>
    </material-button>
    </div>
  
  
  </div>

<script>

this.onLogin = ()=>{
    console.log('login')
    riot.route('auth')
}

console.log('constructor')
this.onLoginGuest = ()=>{
    console.log('yo')
    riot.route('main')
}
</script>

  <style scoped>

 
  .welcome {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;  
    height: 100%;   
    width: 100%;
  }
  
  .welcome h1 {
    font-family: 'Oswald', sans-serif;
    font-size: 225;   
    margin-bottom: 25px;
    font-weight: 100;
    margin:0;
  }
  .welcome h3 {
    font-family: 'Oswald', sans-serif;
    font-size: 100;
    font-weight:100;
    margin:0
  }
  .welcome .buttons{
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  </style>

</welcome>