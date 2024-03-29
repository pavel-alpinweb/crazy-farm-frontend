import * as PIXI from "pixi.js";
import { farmAssetsLoader } from "../../main";

export abstract class AbstractStaticSprite {
  protected abstract spriteName: string;
  private texture: PIXI.Texture | null = null;
  private renderedSprite: PIXI.Sprite | null = null;
  private bundle: any | null = null;

  private async render(): Promise<PIXI.Sprite | null> {
    let sprite = null;
    this.bundle = await farmAssetsLoader.load();
    if (this.bundle) {
      this.texture = this.bundle[this.spriteName].sprite;
    }
    if (this.texture) {
      sprite = new PIXI.Sprite(this.texture);
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

  public set width(value: number) {
    if (this.renderedSprite) {
      this.renderedSprite.width = value;
    }
  }

  public set height(value: number) {
    if (this.renderedSprite) {
      this.renderedSprite.height = value;
    }
  }
}
