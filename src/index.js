import './index.css';
import { GridController, GridModel, GridView } from '/src/grid';
import { DeckService } from '/src/deck/deck.service';

const OPTIONS = {
    width: 500,
    height: 500,
    numberOfColumns: 3,
    numberOfRows: 4,
    // timeLimit: 10000,
    // theme: 'night',
}

new GridController(OPTIONS, GridModel, GridView, DeckService);
