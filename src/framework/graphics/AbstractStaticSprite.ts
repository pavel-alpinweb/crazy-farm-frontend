import * as PIXI from "pixi.js";
import { STATIC_SPRITE_URL } from "../../utils/constants";

export abstract class AbstractStaticSprite {
  protected abstract spriteName: string;
  private texture: PIXI.Texture | null = null;
  private renderedSprite: PIXI.Sprite | null = null;

  private render(): PIXI.Sprite | null {
    this.texture = PIXI.Texture.from(
      `${STATIC_SPRITE_URL}/${this.spriteName}.sprite.png`
    );
    const sprite = new PIXI.Sprite(this.texture);
    sprite.anchor.set(0.5);
    return sprite;
  }

  public sprite(): PIXI.Sprite | null {
    if (!this.renderedSprite) {
      this.renderedSprite = this.render();
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
