import * as PIXI from "pixi.js";
import { farmAssetsLoader } from "../../main";

export abstract class AbstractTilingSprite {
    protected abstract spriteName: string;
    protected abstract width: number;
    protected abstract height: number;
    private texture: PIXI.Texture | null = null;
    private renderedSprite: PIXI.TilingSprite | null = null;
    private bundle: any | null = null;

    private async render(): Promise<PIXI.TilingSprite | null> {
        let sprite = null;
        this.bundle = await farmAssetsLoader.load();
        if (this.bundle) {
            this.texture = this.bundle[this.spriteName].sprite;
        }
        if (this.texture) {
            sprite = new PIXI.TilingSprite(
                this.texture,
                this.width,
                this.height,
            );
            sprite.anchor.set(0.5);
            sprite.name = this.spriteName;
        }
        return sprite;
    }

    public async sprite(): Promise<PIXI.Sprite | null> {
        if (!this.renderedSprite) {
            this.renderedSprite = await this.render();
        }
        return this.renderedSprite;
    }
}