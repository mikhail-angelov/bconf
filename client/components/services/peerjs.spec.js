describe('peerjs.service', ()=>{


  var peerjs;
  var eventBus;
  var rootScope;
  var EventBus;

  beforeEach(module('components.module'));
  beforeEach(inject(function ($injector) {
    peerjs = $injector.get('Peer');
    eventBus = $injector.get('EventBus');
    rootScope = $injector.get('$rootScope');
    EventBus = $injector.get('EventBus');
  }));

  it('should be defined', function () {
    expect(peerjs).toBeDefined();
  });

  it('should create peer connection', function(done){

    peerjs.init('guest', 'guest');

    peerjs.peer.on('open',()=>{

      done();
    });


  });


})