import './grid.css';
import { EventEmitter } from '../utils';
import { getCardHTML } from '/src/card/CardView';

export class GridView extends EventEmitter {
    constructor(model) {
        super();
        this.model = model;

        this.model.subscribe('correct', this.remove);
        this.model.subscribe('false', this.close);
        this.model.subscribe('win', this.deleteGrid);
    }

    renderGrid(width, height, numberOfColumns, cards) {
        const cardsHTML = cards.map(getCardHTML).join('');

        document.body.insertAdjacentHTML('beforeend', `<ul class="grid" style="width: ${width || 500}px; height: ${height || 500}px; grid-template-columns: repeat(${numberOfColumns}, 1fr);">${cardsHTML}</ul>`)
    }

    addListener() {
        document.querySelector('.grid').addEventListener('click', (e) => {
            const cardEl = e.target.closest('.card');

            if (cardEl && !cardEl.classList.contains('card_flipped') && !cardEl.classList.contains('card_empty') && !(document.querySelectorAll('.card_flipped').length > 1)) {
                cardEl.classList.add('card_flipped');
                this.emit('cardClick', cardEl.dataset.id);

                const card = this.model.getCard(cardEl.dataset.id);

                if (card) {
                    cardEl.querySelector('.card__rank').innerText = card.rank;
                    cardEl.querySelector('.card__suit').innerText = card.suit;
                }
            }
        });
    }

    close() {
        document.querySelectorAll('.card_flipped').forEach(el => {
            el.querySelector('.card__rank').innerText = '';
            el.querySelector('.card__suit').innerText = '';

            el.classList.remove('card_flipped');
        })
    }

    remove() {
        document.querySelectorAll('.card_flipped').forEach(el => {
            el.classList.add('card_empty');

            el.classList.remove('card_flipped');
        });
    }

    deleteGrid() {
        document.querySelector('.grid').remove();
    }
}