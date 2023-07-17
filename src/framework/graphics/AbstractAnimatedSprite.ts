import * as PIXI from "pixi.js";
import { ANIMATED_SPRITE_URL } from "../../utils/constants";

export abstract class AbstractAnimatedSprite {
  private textureArray: Array<PIXI.Texture> = [];
  private renderedSprite: PIXI.AnimatedSprite | null = null;
  protected abstract animationSpeed: number;
  protected abstract spriteName: string;
  protected isDataSprite = false;
  protected abstract framesNumber: number;

  private render(): PIXI.AnimatedSprite | null {
    let animatedSprite = null;
    if (!this.isDataSprite) {
      for (let i = 1; i <= this.framesNumber; i++) {
        const texture = PIXI.Texture.from(
            `${ANIMATED_SPRITE_URL}/${this.spriteName}/${this.spriteName}-${i}.frame.png`
        );
        this.textureArray.push(texture);
      }
      animatedSprite = new PIXI.AnimatedSprite(this.textureArray);
    }

    if (animatedSprite) {
      animatedSprite.anchor.set(0.5);
      animatedSprite.animationSpeed = this.animationSpeed;
      animatedSprite?.play();
    }

    return animatedSprite;
  }

  public get sprite(): PIXI.AnimatedSprite | null {
    if (!this.renderedSprite) {
      this.renderedSprite = this.render();
    }
    return this.renderedSprite;
  }

  public set width(value: number) {
    if (this.sprite) {
      this.sprite.width = value;
    }
  }

  public set height(value: number) {
    if (this.sprite) {
      this.sprite.height = value;
    }
  }
}
