import * as PIXI from "pixi.js";
import { ANIMATED_SPRITE_URL } from "../../utils/constants";

export abstract class AbstractAnimatedSprite {
  private textureArray: Array<PIXI.Texture> = [];
  private renderedSprite!: PIXI.AnimatedSprite | null;
  protected abstract animationSpeed: number;
  protected abstract spriteName: string;
  protected abstract framesNumber: number;

  private async render(): Promise<PIXI.AnimatedSprite | null> {
    // let animatedSprite = null;
    // PIXI.Assets.load(`${ANIMATED_SPRITE_URL}/${this.spriteName}/${this.spriteName}.json`).then(() => {
    //   const animationsData = PIXI.Assets.cache.get(`${ANIMATED_SPRITE_URL}/${this.spriteName}/${this.spriteName}.json`).data;
    //   const spritesheet = new PIXI.Spritesheet(
    //       PIXI.BaseTexture.from(`${ANIMATED_SPRITE_URL}/${this.spriteName}/${this.spriteName}.png`),
    //       animationsData
    //   );
    //   spritesheet.parse().then(() => {
    //     animatedSprite = new PIXI.AnimatedSprite(spritesheet.animations[this.spriteName]);
    //     animatedSprite.anchor.set(0.5);
    //     animatedSprite.animationSpeed = this.animationSpeed;
    //     animatedSprite.play();
    //     return animatedSprite;
    //   });
    // });
    const animationsData = await PIXI.Assets.load(
      `${ANIMATED_SPRITE_URL}/${this.spriteName}/${this.spriteName}.json`
    );
    const spritesheet = new PIXI.Spritesheet(
      PIXI.BaseTexture.from(
        `${ANIMATED_SPRITE_URL}/${this.spriteName}/${this.spriteName}.png`
      ),
      animationsData.data
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
