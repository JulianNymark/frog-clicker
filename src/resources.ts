import { ImageSource } from 'excalibur';
import sword from './images/sword.png';
import frog_click from './images/frog_click.png';

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
    Sword: new ImageSource(sword),
    Frog: new ImageSource(frog_click),
}

export { Resources }
