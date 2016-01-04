describe('ProfileStore', function () {

    var store;
    var eventBus;
    var rootScope;

    beforeEach(module('components.module'));
    beforeEach(inject(function ($injector) {
        store = $injector.get('ProfileStore');
        eventBus = $injector.get('EventBus');
        rootScope = $injector.get('$rootScope');
    }));

    it('should be defined', function () {
        expect(store).toBeDefined();
    });

    it('should notify subscribers is someone emit LOAD', function(done){
        var CODE = 42;
        var scope = rootScope.$new();
        store.subscribe(scope,function(){
            var profile = store.getProfile();
            expect(profile.code).toBe(CODE);
            done();
        });

        eventBus.emit(eventBus.profile.LOAD, {code:CODE});
    });



});