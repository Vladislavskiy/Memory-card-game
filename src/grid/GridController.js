export class GridController {
    constructor({ width, height, numberOfColumns, numberOfRows }, Model, View, DeckService) {
        this.deckServive = new DeckService();
        this.startGame({ width, height, numberOfColumns, numberOfRows }, Model, View);
    }

    startGame({ width, height, numberOfColumns, numberOfRows }, Model, View) {
        const cards = this.deckServive.getDeck(numberOfColumns * numberOfRows);
        const TRUTH_HASH = this.deckServive.TRUTH_HASH;
        const CARDS_HASH = this.deckServive.CARDS_HASH;

        this.model = new Model(TRUTH_HASH, CARDS_HASH);
        this.view = new View(this.model);

        this.view.renderGrid(width, height, numberOfColumns, cards);
        this.view.addListener();

        this.addSubscriptions({ width, height, numberOfColumns, numberOfRows }, Model, View);
    }

    addSubscriptions(options, Model, View) {
        this.view.subscribe('cardClick', id => {
            console.log(id);

            this.model.register(id);
        });

        this.model.subscribe('win', () => {
            alert('You win!');
            this.startGame(options, Model, View);
        });
    }
}
