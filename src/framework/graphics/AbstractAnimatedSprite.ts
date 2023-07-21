import * as PIXI from "pixi.js";
import { ANIMATED_SPRITE_URL } from "../../utils/constants";

export abstract class AbstractAnimatedSprite {
  private textureArray: Array<PIXI.Texture> = [];
  private renderedSprite!: PIXI.AnimatedSprite | null;
  protected abstract animationSpeed: number;
  protected abstract spriteName: string;
  protected abstract framesNumber: number;

  private async render(bundles: any | undefined): Promise<PIXI.AnimatedSprite | null> {
    const spritesheet = new PIXI.Spritesheet(
        bundles[this.spriteName].sprite_sheet,
        bundles[this.spriteName].sprite_data.data
    );
    await spritesheet.parse();
    const animatedSprite = new PIXI.AnimatedSprite(
      spritesheet.animations[this.spriteName]
    );
    animatedSprite.anchor.set(0.5);
    animatedSprite.animationSpeed = this.animationSpeed;
    animatedSprite.play();
    return animatedSprite;
  }

  public async sprite(bundles: any | undefined): Promise<PIXI.AnimatedSprite | null> {
    if (!this.renderedSprite) {
      this.renderedSprite = await this.render(bundles);
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
