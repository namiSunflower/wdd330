import { getJSON, getLocation } from './utilities.js';
import QuakesController from './quakesController.js';

const quake = new QuakesController(`#quakeList`);
quake.init();