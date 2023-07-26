import { GridController } from './GridController';
import { GridView } from './GridView';
import { GridModel } from './GridModel';

export class MatchGrid {
    constructor(width, height, numberOfColumns, timeLimit, theme, cards, TRUTH_HASH, CARDS_HASH) {
        const grid = new GridController(GridModel, GridView, width, height, numberOfColumns, cards, TRUTH_HASH, CARDS_HASH)
    }
}