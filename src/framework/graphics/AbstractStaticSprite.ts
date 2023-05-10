import * as PIXI from "pixi.js";

export abstract class AbstractStaticSprite {
    protected abstract spriteURL: string;
    private texture: PIXI.Texture | null = null;
    private renderedSprite: PIXI.Sprite | null = null;

    private render(): PIXI.Sprite | null {
        this.texture = PIXI.Texture.from(this.spriteURL);
        const sprite = new PIXI.Sprite(this.texture);
        sprite.anchor.set(0.5);
        return sprite;
    }

    public get sprite(): PIXI.Sprite | null {
        if (!this.renderedSprite) {
            this.renderedSprite = this.render();
        }
        return this.renderedSprite;
    }
}