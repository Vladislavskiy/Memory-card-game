import { EventEmitter } from '../utils';

export class GridModel extends EventEmitter {
    opened = [];

    constructor(TRUTH_HASH, CARDS_HASH) {
        super();
        this.TRUTH_HASH = TRUTH_HASH;
        this.CARDS_HASH = CARDS_HASH;
    }

    register(id) {

    }

    check() {

    }

    getCard(id) {
        if (this.CARDS_HASH[id]) {
            return this.CARDS_HASH[id];
        }
    }
}