<welcome>
  <div class="welcome">
  
  
    <h1>BCONF</h1>
    <h3>SimpleMessager</h3>
    
     <div class='buttons'>
    <material-button class="ui" onclick={onLogin}>
      <div class="text">Login</div>
    </material-button>
    <material-button class="ui" onclick={onLoginGuest}>
      <div class="text">Try as Guest</div>
    </material-button>
    </div>
  
  
  </div>

<script>

const route = require('riot-route')
const store = require('../store')
const actions = require('../actions')

this.onLogin = ()=>{
    route('auth')
}

this.onLoginGuest = ()=>{
    store.dispatch(actions.loginGuest())
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
  material-button {
    background: #cc0044;
  }
  </style>

</welcome>