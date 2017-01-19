<auth>
<div class='container'>
  <signin class="signin" if={state.sub==='signIn'} toSignUp={toSignUp} toForgetPassword={toForgetPassword} login={onLogin} http_error={error}/>
  <signup class="signin" if={state.sub==='signUp'} back={onBack} onSignUp={onSignUp} http_error={error}/>
  <forget class="signin" if={state.sub==='forget'} back={onBack} onForgetPassword={onForgetPassword} http_error={error}/>
  
  <div class="social">
    <material-button class="ui" shady="true" onclick={loginWith('/auth/google')}>
      <div class="text">google</div>
    </material-button>
    <!-- <material-button class="ui" shady="true" disabled=true>
        <div class="text">vk</div>
    </material-button> -->
    <material-button class="ui" shady="true" onclick={loginWith('/auth/twitter')}>
        <div class="text">twitter</div>
    </material-button>
    <material-button class="ui" shady="true" onclick={loginWith('/auth/facebook')}>
        <div class="text">facebook</div>
        <i class="material-icons"></i>
    </material-button>
    <material-button class="ui" shady="true" onclick={loginWith('/auth/yandex')}>
        <div class="text">yandex</div>
        <i class="material-icons"></i>
    </material-button>
  </div>
   <material-spinner class="progressBar" if={auth.status == "progress"}></material-spinner>
</div>

<script>

const store = require('../../services/store')
const actions = require('../../services/actions/index.js')
store.subscribe(()=>{
    this.state = store.getState().uiState
    this.auth = store.getState().auth
    this.error = this.auth.error
    this.update();
});
store.dispatch(actions.subState(actions.uiState.AUTH.signIn));

this.toSignUp = ()=>store.dispatch(actions.subState(actions.uiState.AUTH.signUp))
this.onBack = ()=>store.dispatch(actions.subState(actions.uiState.AUTH.signIn))
this.toForgetPassword = ()=>store.dispatch(actions.subState(actions.uiState.AUTH.forget))

this.onLogin = (credentials, rememberMe)=>{
  store.dispatch(actions.login(credentials, rememberMe));
}

this.onSignUp = (newUser)=>store.dispatch(actions.signUp(newUser))

this.onForgetPassword = (email)=>{
  store.dispatch(actions.forgetPassword(email))
}

this.loginWith = (url)=>()=>{
  document.location = url
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
    width: 300px;
    padding-right: 30px;
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
  .background-color {
    background-color: #cc0044;
  }

  .error {
    width: 235px;
    text-align: center;
    bottom: 20px;
    color: #cc0044;
    font-size: 12px;
}
  </style>

</auth>