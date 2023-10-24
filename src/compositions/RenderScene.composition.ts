import * as PIXI from "pixi.js";
import { DEFAULT_FARM_STATE } from "../model/farm.model";

export class RenderSceneComposition {
  private scene!: PIXI.Application;

  constructor(scene: PIXI.Application) {
    this.scene = scene;
  }
  public renderContainer(container: Container): void {
    if (container.render) return;
    else {
      container.render = new PIXI.Container();
      this.scene.stage.addChild(container.render);
    }
  }

  public setContainerWidth(container: Container, width: number) {
    if (container.render) {
      container.render.width = width;
    }
  }

  public setContainerHeight(container: Container, height: number) {
    if (container.render) {
      container.render.height = height;
    }
  }

  public setContainerX(container: Container, x: number): void {
    if (container.render) {
      container.render.x = x;
    }
  }

  public setContainerY(container: Container, y: number): void {
    if (container.render) {
      container.render.y = y;
    }
  }

  public setContainerPivotX(container: Container, x: number): void {
    if (container.render) {
      container.render.pivot.x = x;
    }
  }

  public setContainerPivotY(container: Container, y: number): void {
    if (container.render) {
      container.render.pivot.y = y;
    }
  }

  public centerContainer(container: Container): void {
    if (this.scene) {
      this.setContainerX(container, this.scene.screen.width / 2);
      this.setContainerY(container, this.scene.screen.height / 2);
    }
  }

  public centerPivotContainer(container: Container): void {
    if (container.render) {
      this.setContainerPivotX(container, container.render.width / 2);
      this.setContainerPivotY(container, container.render.height / 2);
    }
  }

  public addSprite(
    container: Container,
    sprite: PIXI.Sprite | PIXI.AnimatedSprite | null | undefined
  ): void {
    if (container.render && sprite) {
      container.render.addChild(sprite);
    }
  }

  public removeSprite(
    container: Container,
    sprite: PIXI.Sprite | PIXI.AnimatedSprite | null | undefined
  ): void {
    if (container.render && sprite) {
      container.render.removeChild(sprite);
    }
  }

  public removeAllSprites(container: Container) {
    container.render?.removeChildren();
  }

  public removeChildren(container: Container, index: number) {
    container.render?.removeChildren(index);
  }
}
