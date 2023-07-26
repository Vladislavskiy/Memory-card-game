import './grid.css';
import { EventEmitter } from '../utils';
import { getCardHTML } from '/src/card/CardView';

export class GridView extends EventEmitter {
    constructor(model) {
        super();
        this.model = model;
    }

    renderGrid(width, height, numberOfColumns, cards) {
        const cardsHTML = cards.reduce((acc, id, i) => {
            acc.push(getCardHTML(id));

            if ((i+1) % (numberOfColumns) === 0) {
                acc.push('<li class="break"></li>');
            }

            return acc;
        }, []).join('');

        document.body.insertAdjacentHTML('beforeend', `<ul class="grid">${cardsHTML}</ul>`)
    }
}