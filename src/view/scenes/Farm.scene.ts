import {AbstractScene} from "../../framework/graphics/AbstractScene";
import {GroundSprite} from "../sprites/Ground.sprite";
import {SproutPotatoSprite} from "../sprites/SproutPotato.sprite";

export class FarmScene extends AbstractScene{

    protected sprites: Sprites = {
        ground: null,
        sproutPotato: null,
    }
    constructor() {
        super();
    }

    protected initSprites(): void {
        this.sprites.ground = new GroundSprite();
        this.sprites.sproutPotato = new SproutPotatoSprite();
    }

    protected renderSprites(): void {
        if (this.sprites.ground?.sprite) {
            this.container?.addChild(this.sprites.ground.sprite);
        }
        if (this.sprites.sproutPotato?.sprite) {
            this.container?.addChild(this.sprites.sproutPotato.sprite);
        }
    }

}