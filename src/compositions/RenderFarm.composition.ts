import { CHARACTERS_SPRITES, DECORATION_SPRITES } from "../utils/constants";
import { DialogSprite } from "../view/sprites/Dialog.sprite";
import { BugSprite } from "../view/sprites/Bug.sprite";
import { HungerSprite } from "../view/sprites/Hunger.sprite";
import { DropSprite } from "../view/sprites/Drop.sprite";
import { NEEDS_SPRITES_NAMES } from "../utils/constants";
import { RenderSceneComposition } from "./RenderScene.composition";
import * as PIXI from "pixi.js";
import {DropShadowFilter} from "@pixi/filter-drop-shadow";

export class RenderFarmComposition {
  private readonly scene!: PIXI.Application;
  private renderSceneComposition!: RenderSceneComposition;
  private readonly ROWS_COUNT: number = 3;
  private readonly COLS_COUNT: number = 4;
  private readonly CELL_SIZE: number = 150;
  private readonly CELL_GAP: number = 15;
  private readonly NEEDS_GAP: number = 130;
  private readonly DIALOG_SPRITE_SIZE: number = 100;
  private readonly NEEDS_SPRITE_SIZE: number = 230;
  private readonly CORRECT_CELL_X_NUMBER: number = 4;
  private readonly CORRECT_CELL_Y_NUMBER: number = 4;
  private readonly CORRECT_DIALOG_X_NUMBER: number = 2;
  private readonly CORRECT_DIALOG_Y_NUMBER: number = 1;
  private readonly CORRECT_NEED_X_NUMBER: number = 25;
  private readonly CORRECT_DECORATION_SIZE_NUMBER = 4;
  constructor(scene: PIXI.Application) {
    this.scene = scene;
    this.renderSceneComposition = new RenderSceneComposition(this.scene);
  }
  private charactersSpriteList: SpritesArray = {
    potato: [],
    tomato: [],
    empty: [],
  };

  private needsSpritesCollection: SpritesCollection = {
    drop: null,
    bug: null,
    hunger: null,
    dialog: null,
  };

  private Woodlands: DecorationContainer = {
    "fence-left": [108, 0, 64, 512 * 12],
    "fence-top": [500, 0, 512 * 6, 272 * 2],
    "fence-right": [878, 9, 64, 512 * 12],
    "fence-bottom": [483, 795, 512 * 6, 272],
    "tree-right": [950, 200, 912, 1536],
    "tree-left": [60, 400, 1040, 1840],
    "bush-right": [900, 850, 1280, 1280],
    "bush-left": [300, 850, 1040, 944],
  };

  private readonly farmContainers: Containers = [];

  private readonly woodlandContainers: Containers = [];

  private readonly effectsContainers: Array<EffectContainer> = [];

  public get containers(): Containers {
    return this.farmContainers;
  }

  public get woodContainers(): Containers {
    return this.woodlandContainers;
  }

  public get effContainers(): Array<EffectContainer> {
    return this.effectsContainers;
  }

  public initEffectContainers(): void {
    for (let y = 0; y < this.ROWS_COUNT; y++) {
      for (let x = 0; x < this.COLS_COUNT; x++) {
        this.effContainers.push({
          name: `${x}-${y}-effect`,
          render: null,
        });
      }
    }
  }

  public renderEffectContainers(): void {
    this.effContainers.forEach((container) => {
      const [x, y] = container.name.split("-").map((value) => Number(value));
      this.renderSceneComposition.renderEffectContainer(container);
      this.renderSceneComposition.setContainerWidth(container, this.CELL_SIZE);
      this.renderSceneComposition.setContainerHeight(container, this.CELL_SIZE);
      this.renderSceneComposition.setContainerX(
          container,
          x * this.CELL_SIZE +
          this.scene.screen.width / this.CORRECT_CELL_X_NUMBER +
          this.CELL_GAP * x
      );
      this.renderSceneComposition.setContainerY(
          container,
          y * this.CELL_SIZE +
          this.scene.screen.height / this.CORRECT_CELL_Y_NUMBER +
          this.CELL_GAP * y
      );
    });
  }

  public initFarmContainers(): void {
    for (let y = 0; y < this.ROWS_COUNT; y++) {
      for (let x = 0; x < this.COLS_COUNT; x++) {
        this.containers.push({
          name: `${x}-${y}`,
          render: null,
        });
        this.containers.push({
          name: `${x}-${y}-dialog`,
          render: null,
        });
      }
    }
  }

  public initWoodlandsContainers(): void {
    for (const item in this.Woodlands) {
      this.woodlandContainers.push({
        name: item,
        render: null,
      });
    }
  }

  public renderWoodlandsContainers(): void {
    this.woodContainers.forEach((container) => {
      const [x, y] = this.Woodlands[container.name];
      this.renderSceneComposition.renderContainer(container);
      this.renderSceneComposition.setContainerX(container, x);
      this.renderSceneComposition.setContainerY(container, y);
      this.renderSceneComposition.centerPivotContainer(container);
    });
  }

  public renderFarmContainers(): void {
    this.farmContainers.forEach((container) => {
      const [x, y] = container.name.split("-").map((value) => Number(value));
      this.renderSceneComposition.renderContainer(container);
      if (container.name.search("dialog") === -1) {
        this.renderSceneComposition.setContainerX(
            container,
            x * this.CELL_SIZE +
            this.scene.screen.width / this.CORRECT_CELL_X_NUMBER +
            this.CELL_GAP * x
        );
        this.renderSceneComposition.setContainerY(
            container,
            y * this.CELL_SIZE +
            this.scene.screen.height / this.CORRECT_CELL_Y_NUMBER +
            this.CELL_GAP * y
        );
        this.renderSceneComposition.centerPivotContainer(container);
      } else {
        this.renderSceneComposition.setContainerX(
            container,
            x * this.CELL_SIZE +
            this.CELL_SIZE * this.CORRECT_DIALOG_X_NUMBER +
            this.CELL_GAP * x
        );
        this.renderSceneComposition.setContainerY(
            container,
            y * this.CELL_SIZE +
            this.CELL_SIZE / this.CORRECT_DIALOG_Y_NUMBER +
            this.CELL_GAP * y
        );
        this.renderSceneComposition.centerPivotContainer(container);
      }
    });
  }

  public initCharactersSprite(): void {
    this.charactersSpriteList = {
      potato: [],
      tomato: [],
      empty: [],
    };
    for (const character in CHARACTERS_SPRITES) {
      CHARACTERS_SPRITES[character].forEach((Sprite) => {
        this.charactersSpriteList[character].push(new Sprite());
      });
    }
  }

  public initNeedsCharacterSprites(): void {
    this.needsSpritesCollection = {
      drop: null,
      bug: null,
      hunger: null,
      dialog: null,
    };
    this.needsSpritesCollection.dialog = new DialogSprite();
    this.needsSpritesCollection.bug = new BugSprite();
    this.needsSpritesCollection.hunger = new HungerSprite();
    this.needsSpritesCollection.drop = new DropSprite();
  }

  public renderDecorationSprites(): void {
    this.woodContainers.forEach(async (container) => {
      const [x, y, width, height] = this.Woodlands[container.name];
      const DecorationSprite = await new DECORATION_SPRITES[container.name]().sprite();
      if (DecorationSprite) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        DecorationSprite.filters = [new DropShadowFilter({
          offset: {x: 20, y: 20},
        })];
      }
      this.renderSceneComposition.addSprite(
        container,
        DecorationSprite
      );
      this.renderSceneComposition.setContainerWidth(
        container,
        width / this.CORRECT_DECORATION_SIZE_NUMBER
      );
      this.renderSceneComposition.setContainerHeight(
        container,
        height / this.CORRECT_DECORATION_SIZE_NUMBER
      );
    });
  }

  public async renderCharacterSprite(cell: Cell, isAlmanacActive: boolean, isTutorialActive: boolean) {
    this.initCharactersSprite();
    const container = this.farmContainers.find(
      (cont) => cont.name === cell.name
    );
    const [x, y] = cell.name.split("-").map((value) => Number(value));
    const isEvenCellX = x % 2 === 0;
    const isEvenCellY = y % 2 === 0;
    let emptySprite: PIXI.Sprite | PIXI.AnimatedSprite | null | undefined;
    if ((isEvenCellX && isEvenCellY) || (!isEvenCellX && !isEvenCellY)) {
      emptySprite = await this.charactersSpriteList?.empty[0]?.sprite();
    } else {
      emptySprite = await this.charactersSpriteList?.empty[1]?.sprite();
    }
    if (container?.render?.children.length === 0) {
      this.renderSceneComposition.addSprite(container, emptySprite);
      this.renderSceneComposition.setContainerWidth(container, this.CELL_SIZE);
      this.renderSceneComposition.setContainerHeight(container, this.CELL_SIZE);
    }
    if (cell.character && container?.render) {
      if (container.render?.children?.length >= 2) {
        this.renderSceneComposition.removeChildren(container, 1);
      }
      const sprite = await this.charactersSpriteList[cell.character?.type][
        cell.character?.stage
      ]?.sprite();
      if (sprite) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        sprite.filters = [new DropShadowFilter({
          offset: {x: 20, y: 10},
        })];
        this.renderSceneComposition.addSprite(container, sprite);
        sprite.y -= 200;
      }
    } else if (container && <number>container.render?.children?.length >= 2) {
      this.renderSceneComposition.removeChildren(container, 1);
    }

    /* Cell state filters */
    const colorMatrix = new PIXI.ColorMatrixFilter();
    if (container?.render && (isAlmanacActive || isTutorialActive) && !cell.isBlocked) {
      container.render.filters = [colorMatrix];
      let count = 0;
      this.scene.ticker.add(() => {
        count += 0.05;
        colorMatrix.contrast(Math.sin(count) * 0.3, false);
      });
    } else if (cell.isBlocked && container?.render) {
      container.render.filters = [colorMatrix];
      colorMatrix.greyscale(0.5, true);
    } else if (container?.render) {
      container.render.filters = [colorMatrix];
      this.scene.ticker.remove(() => {
        colorMatrix.reset();
      });
    }
  }

  public async renderNeedsSprites(cell: Cell) {
    const dialogContainer = this.farmContainers.find(
      (cont) => cont.name === `${cell.name}-dialog`
    );
    if (dialogContainer) {
      this.renderSceneComposition.removeAllSprites(<Container>dialogContainer);
    }
    if (cell.character?.needs.length && dialogContainer) {
      this.renderSceneComposition.addSprite(
        dialogContainer,
        await this.needsSpritesCollection.dialog?.sprite()
      );
      this.renderSceneComposition.setContainerWidth(
        dialogContainer,
        this.DIALOG_SPRITE_SIZE
      );
      this.renderSceneComposition.setContainerHeight(
        dialogContainer,
        this.DIALOG_SPRITE_SIZE
      );

      for (
        let needIndex = 0;
        needIndex < cell.character?.needs.length;
        needIndex++
      ) {
        this.initNeedsCharacterSprites();
        const spriteName =
          NEEDS_SPRITES_NAMES[cell.character?.needs[needIndex]];
        const sprite = await this.needsSpritesCollection[spriteName]?.sprite();
        if (sprite) {
          sprite.width = this.NEEDS_SPRITE_SIZE;
          sprite.height = this.NEEDS_SPRITE_SIZE;
          sprite.x +=
            needIndex * this.NEEDS_GAP -
            this.DIALOG_SPRITE_SIZE * ((cell.character?.needs.length - 1) / 2) -
            this.CORRECT_NEED_X_NUMBER;
        }
        this.renderSceneComposition.addSprite(dialogContainer, sprite);
      }
    }
  }
}
