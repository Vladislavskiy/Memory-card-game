import './index.css';
import { GridController, GridModel, GridView } from './grid';
import { DeckService } from './deck/deck.service';

const OPTIONS = {
    width: 500,
    height: 500,
    numberOfColumns: 2,
    numberOfRows: 2,
}

new GridController(OPTIONS, GridModel, GridView, DeckService);
