const riot = require('riot')

window.addEventListener("DOMContentLoaded",function load() {
  var currentPage = null;
  var currentSingup = null;

  riot.mount('*');

  var subRoute = riot.route.create()

  var goTo = function(page){
      console.log('route', page )
    if (currentPage) {
      currentPage.unmount(true); //unmount and keep parent tag
    }
    
    const mounted = riot.mount('div#content',page)
    if(mounted){
      currentPage= mounted[0];
    }
    
    
  };

  subRoute(function() {
    goTo('welcome');
  });

  subRoute('/auth', function(){
    goTo('auth');
  });

  subRoute('/main', function() {
    goTo('main');
  });

  riot.route.start();

  const redirectToken = getAuthRedirectToken()
  if(redirectToken){
    localStorage.setItem('token', redirectToken)
  }

  riot.route.exec(goTo);

  function getAuthRedirectToken(){
    if(document.location.hash && document.location.hash.indexOf('#auth-redirect=') === 0){
      return document.location.hash.substr(15)
    }
  }
},true)