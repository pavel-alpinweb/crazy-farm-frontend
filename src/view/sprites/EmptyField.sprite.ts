import {AbstractStaticSprite} from "../../framework/graphics/AbstractStaticSprite";
import {STATIC_SPRITE_URL} from "../../utils/constants";

export class EmptyFieldSprite extends AbstractStaticSprite{
    protected spriteURL = `${STATIC_SPRITE_URL}/empty-field.sprite.png`;
}