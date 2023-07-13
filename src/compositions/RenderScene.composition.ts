import * as PIXI from "pixi.js";

export class RenderSceneComposition {
    public renderContainer(container: Container, scene: PIXI.Application): void {
        if (container.render) return;
        else {
            container.render = new PIXI.Container();
            scene.stage.addChild(container.render);
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

    public centerContainer(container: Container, scene: PIXI.Application): void {
        if (scene) {
            this.setContainerX(container, scene.screen.width / 2);
            this.setContainerY(container, scene.screen.height / 2);
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
}