import { RANK, SUITS } from '../constants';

export class DeckService {
    DECK = [];
    TRUTH_HASH = {};
    CARDS_HASH = {};

    constructor() {
        Object.entries(RANK).forEach(([, rankValue]) => {
            Object.entries(SUITS).forEach(([, suitValue]) => {
                this.DECK.push({
                    suit: suitValue,
                    rank: rankValue,
                })
            })
        });
    }

    getDeck(numberOfCards) {
        const half = [...this.DECK].sort(() => .5 - Math.random()).slice(0, numberOfCards / 2);

        return half.reduce((acc, card) => {
            const firstId = this.uniqueId();
            const secondId = this.uniqueId();

            acc.push(firstId);
            acc.push(secondId);

            this.CARDS_HASH[firstId] = card;
            this.CARDS_HASH[secondId] = card;

            this.TRUTH_HASH[firstId + secondId] = true;

            return acc;
        }, []).sort(() => .5 - Math.random())
    }

    uniqueId() {
        const dateString = Date.now().toString(36);
        const randomness = Math.random().toString(36).substr(2);

        return dateString + randomness;
    }
}