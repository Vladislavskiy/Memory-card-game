import './grid.css';
import { EventEmitter } from '/src/utils';
import { getCardHTML } from '/src/card/card.view';
import { SUITS } from '/src/constants';

export class GridView extends EventEmitter {
    intervalId;

    constructor(model) {
        super();
        this.model = model;

        this.model.subscribe('correct', this.remove);
        this.model.subscribe('false', this.close);
        this.model.subscribe('win', this.deleteGrid.bind(this));
    }

    renderGrid(width, height, numberOfColumns, timer, cards, theme) {
        const cardsHTML = cards.map(getCardHTML).join('');

        document.body.insertAdjacentHTML('beforeend', `
            <div class="wrapper">
                ${timer ? '<p id="timer">00:00</p>' : ''}
                <ul
                    class="grid"
                    style="
                        max-width: ${width || 500}px;
                        height: ${height || 500}px;
                        grid-template-columns: repeat(${numberOfColumns}, 1fr);
                    "
                >${cardsHTML}</ul>
            </div>
        `);

        if (theme) {
            document.querySelector('.wrapper').classList.add('wrapper_' + theme);
        }
    }

    addListener() {
        document.querySelector('.grid').addEventListener('click', (e) => {
            const cardEl = e.target.closest('.card');

            if (cardEl && this.cardIsNotFlipped(cardEl) && this.cardIsNotEmpty(cardEl) && this.noMoreThanOneCardOpened()) {
                cardEl.classList.add('card_flipped');
                this.emit('cardClick', cardEl.dataset.id);

                const card = this.model.getCard(cardEl.dataset.id);

                if (card.suit === SUITS.DIAMOND || card.suit === SUITS.HEART) {
                    cardEl.classList.add('card_red')
                }

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

            el.classList.remove('card_flipped', 'card_red');
        })
    }

    remove() {
        document.querySelectorAll('.card_flipped').forEach(el => {
            el.classList.add('card_empty');

            el.classList.remove('card_flipped', 'card_red');
        });
    }

    deleteGrid() {
        document.querySelector('.wrapper').remove();
        clearInterval(this.intervalId);
    }

    startTimer(timeLimit) {
        const dateOfExpiration = new Date(Date.now() + timeLimit).getTime();

        this.intervalId = setInterval(() => {
            const now = new Date().getTime();
            const distance = dateOfExpiration - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString();
            const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString();

            document.getElementById('timer').innerText = (minutes.length === 1 ? '0' + minutes : minutes) + ":" + (seconds.length === 1 ? '0' + seconds : seconds);

            if (distance < 0) {
                clearInterval(this.intervalId);
                document.getElementById('timer').innerHTML = "00:00";
                this.emit('timerFinished');
            }
        }, 1000);
    }

    cardIsNotFlipped(el) {
        return !el.classList.contains('card_flipped');
    }

    cardIsNotEmpty(el) {
        return !el.classList.contains('card_empty');
    }

    noMoreThanOneCardOpened() {
        return !(document.querySelectorAll('.card_flipped').length > 1);
    }
}