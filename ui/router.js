window.addEventListener("DOMContentLoaded",function load() {
  var currentPage = null;

  var subRoute = riot.route.create()

  var goTo = function(page){
      console.log('route', page )
    if (currentPage) {
      currentPage.unmount(true); //unmount and keep parent tag
    }
    riot.compile(function() {
      currentPage= riot.mount('div#content',page)[0]
    })
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