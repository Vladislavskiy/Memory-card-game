export class GridController {
    constructor(Model, View, width, height, numberOfColumns, cards, TRUTH_HASH, CARDS_HASH) {
        this.model = new Model(TRUTH_HASH, CARDS_HASH);
        this.view = new View(this.model);

        this.view.renderGrid(width, height, numberOfColumns, cards);
        this.view.addListener();

        this.view.subscribe('cardClick', id => {
            console.log(id);

            this.model.register(id);
        });
    }
}