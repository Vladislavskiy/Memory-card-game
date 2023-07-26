import './card.css';

export const getCardHTML = (id) => {
    return `<li class="card" data-id="${id}">
                <div class="card__inner">
                    <div class="card__front">
                    </div>
                    <div class="card__back">
                        <p>rank</p>
                        <p>suit</p>
                    </div>
                </div>
            </li>`;
}
