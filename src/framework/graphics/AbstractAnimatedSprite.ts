import * as PIXI from "pixi.js";
import { farmAssetsLoader } from "../../main";

export abstract class AbstractAnimatedSprite {
  private textureArray: Array<PIXI.Texture> = [];
  private renderedSprite!: PIXI.AnimatedSprite | null;
  private spritesheet!: PIXI.Spritesheet;
  protected abstract animationSpeed: number;
  protected abstract spriteName: string;
  protected abstract framesNumber: number;
  private bundle: any | null = null;
  protected isLoop = true;
  protected spriteNameAfterLoop: string | null = null;
  protected animationSpeedAfterLoop: number | null = null;

  private async render(): Promise<PIXI.AnimatedSprite | null> {
    let animatedSprite: PIXI.AnimatedSprite | null = null;
    this.bundle = await farmAssetsLoader.load();
    if (this.bundle) {
      if (!this.spritesheet?.animations[this.spriteName]) {
        PIXI.utils.clearTextureCache();
        this.spritesheet = new PIXI.Spritesheet(
            this.bundle[this.spriteName].sprite_sheet,
            this.bundle[this.spriteName].sprite_data.data
        );
        await this.spritesheet.parse();
      }
      animatedSprite = new PIXI.AnimatedSprite(
        this.spritesheet.animations[this.spriteName]
      );
      animatedSprite.anchor.set(0.5);
      animatedSprite.animationSpeed = this.animationSpeed;
      animatedSprite.name = this.spriteName;
      animatedSprite.loop = this.isLoop;
      animatedSprite.play();
      if (
        !this.isLoop &&
        this.spriteNameAfterLoop &&
        this.animationSpeedAfterLoop
      ) {
        animatedSprite.onComplete = async () => {
          if (animatedSprite instanceof PIXI.AnimatedSprite) {
            if (!this.spritesheet.animations[<string>this.spriteNameAfterLoop]) {
              this.spritesheet = new PIXI.Spritesheet(
                  this.bundle[<string>this.spriteNameAfterLoop].sprite_sheet,
                  this.bundle[<string>this.spriteNameAfterLoop].sprite_data.data
              );
              await this.spritesheet.parse();
            }
            animatedSprite.textures =
              this.spritesheet.animations[<string>this.spriteNameAfterLoop];
            animatedSprite.loop = false;
            animatedSprite.play();
          }
        };
      } else if (!this.isLoop) {
        animatedSprite.onComplete = () => {
          if (animatedSprite instanceof PIXI.AnimatedSprite) {
            animatedSprite.destroy();
          }
        };
      }
    }
    return animatedSprite;
  }

  public async sprite(): Promise<PIXI.AnimatedSprite | null> {
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
