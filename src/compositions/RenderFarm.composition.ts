import { CHARACTERS_SPRITES } from "../utils/constants";
import { DialogSprite } from "../view/sprites/Dialog.sprite";
import { BugSprite } from "../view/sprites/Bug.sprite";
import { HungerSprite } from "../view/sprites/Hunger.sprite";
import { DropSprite } from "../view/sprites/Drop.sprite";
import { NEEDS_SPRITES_NAMES } from "../utils/constants";
import { RenderSceneComposition } from "./RenderScene.composition";
import * as PIXI from "pixi.js";

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
  private readonly CORRECT_CELL_X_NUMBER: number = 4.8;
  private readonly CORRECT_CELL_Y_NUMBER: number = 4;
  private readonly CORRECT_DIALOG_X_NUMBER: number = 1.4;
  private readonly CORRECT_DIALOG_Y_NUMBER: number = 3;
  private readonly CORRECT_NEED_X_NUMBER: number = 25;
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

  private readonly farmContainers: Containers = [];

  public get containers(): Containers {
    return this.farmContainers;
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

  public async renderCharacterSprite(cell: Cell) {
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
    if (cell.character && container) {
      if (container.render?.children?.length === 2) {
        this.renderSceneComposition.removeChildren(container, 1);
      }
      const sprite = await this.charactersSpriteList[cell.character?.type][
        cell.character?.stage
      ]?.sprite();
      if (sprite) {
        this.renderSceneComposition.addSprite(container, sprite);
        sprite.y -= 200;
      }
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
