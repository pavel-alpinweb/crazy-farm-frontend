import * as PIXI from "pixi.js";
import {farmAssetsLoader} from "../../main";

export abstract class AbstractStaticSprite {
  protected abstract spriteName: string;
  private texture: PIXI.Texture | null = null;
  private renderedSprite: PIXI.Sprite | null = null;
  private readonly bundle: PIXI.ResolverBundle | null = farmAssetsLoader.bundle;

  private render(bundles: any | undefined): PIXI.Sprite | null {
    let sprite = null;
    if (this.bundle) {
      this.texture = bundles[this.spriteName].sprite;
    }
    if (this.texture) {
      sprite = new PIXI.Sprite(this.texture);
      sprite.anchor.set(0.5);
    }
    return sprite;
  }

  public sprite(bundles?: object): PIXI.Sprite | null {
    if (!this.renderedSprite) {
      this.renderedSprite = this.render(bundles);
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
