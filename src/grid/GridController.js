export class GridController {
    constructor(options, Model, View, DeckService) {
        this.deckServive = new DeckService();
        this.startGame(options, Model, View);
    }

    startGame(options, Model, View) {
        const { width, height, numberOfColumns, numberOfRows, timeLimit, theme } = options;
        const cards = this.deckServive.getDeck(numberOfColumns * numberOfRows);
        const TRUTH_HASH = this.deckServive.TRUTH_HASH;
        const CARDS_HASH = this.deckServive.CARDS_HASH;

        this.model = new Model(TRUTH_HASH, CARDS_HASH);
        this.view = new View(this.model);

        this.view.renderGrid(width, height, numberOfColumns, !!timeLimit, cards, theme);
        this.view.addListener();

        this.addSubscriptions(options, Model, View);
    }

    addSubscriptions(options, Model, View) {
        const { timeLimit } = options;

        this.view.subscribe('cardClick', id => {
            console.log(id);

            this.model.register(id);
        });

        this.model.subscribe('win', () => {
            alert('You win!');
            this.startGame(options, Model, View);
        });

        if (timeLimit) {
            this.view.startTimer(timeLimit);

            this.view.subscribe('timerFinished', () => {
                alert('Game over!');
                this.view.deleteGrid();
                this.startGame(options, Model, View);
            });
        }
    }
}
