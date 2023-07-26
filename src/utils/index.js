export class EventEmitter {
    events = {};

    subscribe(event, callback) {
        if (this.events[event]) {
            this.events[event].push(callback);
        } else {
            this.events[event] = [callback];
        }
    }

    emit(event, data) {
        if (this.events[event].length > 0) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    unsubscribe(event, calback) {
        this.events[event] = this.events[event].filter(eventCallback => eventCallback !== calback);
    }
}