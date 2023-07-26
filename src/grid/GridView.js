import './grid.css';
import { EventEmitter } from '../utils';
import { getCardHTML } from '/src/card/CardView';

export class GridView extends EventEmitter {
    constructor(model) {
        super();
        this.model = model;

        this.model.subscribe('correct', this.remove);
        this.model.subscribe('false', this.close);
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
        });
    }
}