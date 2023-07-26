import './index.css';
import { GridController, GridModel, GridView } from './grid';
import { DeckService } from './deck/deck.service';

const NUMBER_OF_COLUMNS = 2;
const NUMBER_OF_ROWS = 2;

new GridController(GridModel, GridView, 500, 500, NUMBER_OF_COLUMNS, NUMBER_OF_ROWS, DeckService);
