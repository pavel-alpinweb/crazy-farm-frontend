import * as PIXI from "pixi.js";

export class AbstractStaticSprite {
    private readonly texture: PIXI.Texture | null = null;
    private renderedSprite: PIXI.Sprite | null = null;
    constructor(assetUrl: string) {
        this.texture = PIXI.Texture.from(assetUrl);
    }

    private render(): PIXI.Sprite | null {
        let sprite = null;
        if (this.texture) {
            sprite = new PIXI.Sprite(this.texture);
            sprite.anchor.set(0.5);
        }
        return sprite;
    }

    public get sprite(): PIXI.Sprite | null {
        if (!this.renderedSprite) {
            this.renderedSprite = this.render();
        }
        return this.renderedSprite;
    }
}