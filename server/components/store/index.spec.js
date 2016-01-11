'use strict';

import store  from './session';

describe('Session', function () {

  var testClient = {id:'1',key:'2',token:'test',ip:'0',socket:{}};

  it('should add, get, delete client', function () {

    store.add(testClient);
    var client = store.getById(testClient.id);
    expect(client, testClient);

    store.delete(testClient);
    var client = store.getById(testClient.id);
    expect(client, null);
  });

  it('should return unuque id', function () {
    var id = store.generateUniquId()
    id.should.be.defined
  });

});
