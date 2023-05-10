import {AbstractScene} from "../../framework/graphics/AbstractScene";
import {GroundSprite} from "../sprites/Ground.sprite";
import {SproutPotatoSprite} from "../sprites/SproutPotato.sprite";

export class FarmScene extends AbstractScene{
    protected sprites: Sprites = {
        ground: null,
        sproutPotato: null,
    }

    protected initSprites(): void {
        this.sprites.ground = new GroundSprite();
        this.sprites.sproutPotato = new SproutPotatoSprite();
    }

    protected renderSprites(): void {
        this.addSprite(this.sprites.ground?.sprite);
        this.addSprite(this.sprites.sproutPotato?.sprite);
    }

}