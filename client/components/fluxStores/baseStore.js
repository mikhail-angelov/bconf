class BaseStore {

    constructor(EventBus) {
        this.EventBus = EventBus;
        this.id = 'none';
        this.data = {};
    }

    subscribe(scope, cb) {
        return scope.$on(this.id, cb);
    }

    emitChanges() {
        this.EventBus.emit(this.id);
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

}

export default BaseStore;