import { Texture } from 'excalibur';
import sword from './images/sword.png';
import frog_click from './images/frog_click.png';

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
    Sword: new Texture(sword),
    Frog: new Texture(frog_click),
}

export { Resources }
