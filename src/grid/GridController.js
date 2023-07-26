export class GridController {
    constructor(Model, View, width, height, numberOfColumns, numberOfRows, DeckService) {
        this.deckServive = new DeckService();
        this.startGame(Model, View, width, height, numberOfColumns, numberOfRows);
    }

    startGame(Model, View, width, height, numberOfColumns, numberOfRows) {
        const cards = this.deckServive.getDeck(numberOfColumns * numberOfRows);
        const TRUTH_HASH = this.deckServive.TRUTH_HASH;
        const CARDS_HASH = this.deckServive.CARDS_HASH;

        this.model = new Model(TRUTH_HASH, CARDS_HASH);
        this.view = new View(this.model);

        this.view.renderGrid(width, height, numberOfColumns, cards);
        this.view.addListener();

        this.addSubscriptions(Model, View, width, height, numberOfColumns, numberOfRows);
    }

    addSubscriptions(Model, View, width, height, numberOfColumns, numberOfRows) {
        this.view.subscribe('cardClick', id => {
            console.log(id);

            this.model.register(id);
        });

        this.model.subscribe('win', () => {
            alert('You win!');
            this.startGame(Model, View, width, height, numberOfColumns, numberOfRows);
        });
    }
}
