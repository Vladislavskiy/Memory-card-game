import './card.css';

export const getCardHTML = (rank, suit) => {
    return `<li class="card">
                <div class="card__inner">
                    <div class="card__front">
                    </div>
                    <div class="card__back">
                        <p>${rank}</p>
                        <p>${suit}</p>
                    </div>
                </div>
            </li>`;
}
