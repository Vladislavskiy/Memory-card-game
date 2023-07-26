import './index.css';
import { GridView } from './grid/GridView';
import { DeckService } from './deck/deck.service';

const service = new DeckService();

console.log(service.getDeck(16));
console.log(service.TRUTH_HASH);

const grid = new GridView();

grid.renderGrid();