import './index.css';
import { MatchGrid } from './grid/MatchGrid';
import { DeckService } from './deck/deck.service';

const NUMBER_OF_COLUMNS = 4;
const NUMBER_OF_ROWS = 4;

const deckServive = new DeckService();
const cards = deckServive.getDeck(NUMBER_OF_COLUMNS * NUMBER_OF_ROWS);
const TRUTH_HASH = deckServive.TRUTH_HASH;
const CARDS_HASH = deckServive.CARDS_HASH;

const grid = new MatchGrid(null, null, NUMBER_OF_COLUMNS, null, null, cards, TRUTH_HASH, CARDS_HASH);