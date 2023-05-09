import * as PIXI from "pixi.js";
export abstract class AbstractAnimatedSprite {
    private textureArray: Array<PIXI.Texture> = [];
    private renderedSprite: PIXI.AnimatedSprite | null = null;
    protected abstract spriteFrames: Array<string>;
    protected abstract animationSpeed: number;

    private render(): PIXI.AnimatedSprite | null {
        for (const frame of this.spriteFrames) {
            const texture = PIXI.Texture.from(frame);
            this.textureArray.push(texture);
        }
        const animatedSprite = new PIXI.AnimatedSprite(this.textureArray);
        animatedSprite.anchor.set(0.5);
        animatedSprite.animationSpeed = this.animationSpeed;
        animatedSprite.play();

        return animatedSprite;
    }

    public get sprite(): PIXI.AnimatedSprite | null {
        if (!this.renderedSprite) {
            this.renderedSprite = this.render();
        }
        return this.renderedSprite;
    }
}