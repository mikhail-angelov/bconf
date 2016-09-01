const riot = require('riot')

window.addEventListener("DOMContentLoaded",function load() {
  var currentPage = null;

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

  subRoute('/login', function(){
    goTo('auth');
  });

  subRoute('/main', function() {
    goTo('main');
  });


  riot.route.exec(); //default redirect
},true)