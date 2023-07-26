import './grid.css';
import { getCardHTML } from '/src/card/CardView';

export class GridView {
    constructor() {

    }

    renderGrid() {
        document.body.insertAdjacentHTML('beforeend', `<ul class="grid">${getCardHTML('6', '♥')}${getCardHTML('6', '♥')}${getCardHTML('6', '♥')}<li class="break">${getCardHTML('6', '♥')}${getCardHTML('6', '♥')}${getCardHTML('6', '♥')}<li class="break">${getCardHTML('6', '♥')}${getCardHTML('6', '♥')}${getCardHTML('6', '♥')}</ul>`)
    }
}