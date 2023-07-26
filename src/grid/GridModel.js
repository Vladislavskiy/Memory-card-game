import { EventEmitter } from '../utils';

export class GridModel extends EventEmitter {
    opened = [];

    constructor(TRUTH_HASH, CARDS_HASH) {
        super();
        this.TRUTH_HASH = TRUTH_HASH;
        this.CARDS_HASH = CARDS_HASH;
    }

    register(id) {
        if (this.opened.length === 0) {
            this.opened.push(id);
        } else if (this.opened.length === 1) {
            this.opened.push(id);

            setTimeout(this.check.bind(this), 1000);
        }
    }

    check() {
        if (this.TRUTH_HASH[this.opened.join('')] || this.TRUTH_HASH[this.opened.reverse().join('')]) {
            this.emit('correct');
        } else {
            this.emit('false');
        }

        this.opened = [];
    }

    getCard(id) {
        if (this.CARDS_HASH[id]) {
            return this.CARDS_HASH[id];
        }
    }
}