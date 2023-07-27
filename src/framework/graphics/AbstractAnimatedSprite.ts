import * as PIXI from "pixi.js";
import {farmAssetsLoader} from "../../main";

export abstract class AbstractAnimatedSprite {
  private textureArray: Array<PIXI.Texture> = [];
  private renderedSprite!: PIXI.AnimatedSprite | null;
  protected abstract animationSpeed: number;
  protected abstract spriteName: string;
  protected abstract framesNumber: number;
  private bundle: any | null = null;

  private async render(bundles: any | undefined): Promise<PIXI.AnimatedSprite | null> {
    let animatedSprite = null;
    this.bundle = await farmAssetsLoader.load();
    if (this.bundle) {
      const spritesheet = new PIXI.Spritesheet(
          this.bundle[this.spriteName].sprite_sheet,
          this.bundle[this.spriteName].sprite_data.data
      );
      await spritesheet.parse();
      animatedSprite = new PIXI.AnimatedSprite(
          spritesheet.animations[this.spriteName]
      );
      animatedSprite.anchor.set(0.5);
      animatedSprite.animationSpeed = this.animationSpeed;
      animatedSprite.play();
    }
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
