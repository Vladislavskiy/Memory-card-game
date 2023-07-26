import { EventEmitter } from '/src/utils';

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

            delete this.CARDS_HASH[this.opened[0]];
            delete this.CARDS_HASH[this.opened[1]];

            this.emit('correct');

            if (Object.keys(this.CARDS_HASH).length === 0) {
                this.emit('win');
            }
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