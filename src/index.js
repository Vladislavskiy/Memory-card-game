import './index.css';
import { GridController, GridModel, GridView } from './grid';
import { DeckService } from './deck/deck.service';

const OPTIONS = {
    width: 500,
    height: 500,
    numberOfColumns: 4,
    numberOfRows: 4,
    // timeLimit: 10000,
    // theme: 'night',
}

new GridController(OPTIONS, GridModel, GridView, DeckService);
