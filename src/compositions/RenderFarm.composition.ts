import {CHARACTERS_SPRITES, DIALOG_SPRITE_SIZE, NEEDS_SPRITE_SIZE} from "../utils/constants";
import { DialogSprite } from "../view/sprites/Dialog.sprite";
import { BugSprite } from "../view/sprites/Bug.sprite";
import { HungerSprite } from "../view/sprites/Hunger.sprite";
import { DropSprite } from "../view/sprites/Drop.sprite";
import {NEEDS_SPRITES_NAMES} from "../utils/constants";
import { RenderSceneComposition } from "./RenderScene.composition";
import * as PIXI from "pixi.js";

export class RenderFarmComposition {
  private readonly scene!: PIXI.Application;
  private renderSceneComposition!: RenderSceneComposition;
  private readonly ROWS_COUNT:number = 3;
  private readonly COLS_COUNT:number  = 4;
  private readonly CELL_SIZE:number  = 150;
  private readonly CELL_GAP: number = 5;
  private readonly NEEDS_GAP: number = 300;
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
      if (container.name.search('dialog') === -1) {
        this.renderSceneComposition.setContainerX(container, (x * this.CELL_SIZE) + this.scene.screen.width / 4.8 + (this.CELL_GAP * x));
        this.renderSceneComposition.setContainerY(container, (y * this.CELL_SIZE) + this.scene.screen.height / 4 + (this.CELL_GAP * y));
        this.renderSceneComposition.centerPivotContainer(container);
      } else {
        this.renderSceneComposition.setContainerX(container, (x * this.CELL_SIZE) + this.CELL_SIZE * 1.2 + (this.CELL_GAP * x));
        this.renderSceneComposition.setContainerY(container, (y * this.CELL_SIZE) + this.CELL_SIZE / 2 + (this.CELL_GAP * y));
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
    if (isEvenCellX && isEvenCellY || !isEvenCellX && !isEvenCellY) {
      emptySprite = await this.charactersSpriteList?.empty[0]?.sprite();
    } else {
      emptySprite = await this.charactersSpriteList?.empty[1]?.sprite();
    }
    if (cell.character && container) {
      if (
        container.render?.children[0] &&
        container.render?.children[0]?.name === "explosion-tomato"
      )
        return;
      this.renderSceneComposition.removeAllSprites(container);
      const sprite =
        this.charactersSpriteList[cell.character?.type][cell.character?.stage];
      this.renderSceneComposition.addSprite(container, await sprite?.sprite());
      const explosionSprite = <PIXI.AnimatedSprite>(
        await this.charactersSpriteList.tomato[5]?.sprite()
      );
      explosionSprite.onLoop = async () => {
        if (container.render?.children[0].name === "explosion-tomato") {
          this.renderSceneComposition.removeAllSprites(container);
          this.renderSceneComposition.addSprite(
            container,
            emptySprite
          );
        }
      };

      this.renderSceneComposition.setContainerWidth(container, this.CELL_SIZE);
      this.renderSceneComposition.setContainerHeight(container, this.CELL_SIZE);
    } else if (container) {
      this.renderSceneComposition.removeAllSprites(container);
      this.renderSceneComposition.addSprite(
        container,
        emptySprite
      );
      this.renderSceneComposition.setContainerWidth(container, this.CELL_SIZE);
      this.renderSceneComposition.setContainerHeight(container, this.CELL_SIZE);
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
      this.renderSceneComposition.setContainerWidth(dialogContainer, DIALOG_SPRITE_SIZE);
      this.renderSceneComposition.setContainerHeight(dialogContainer, DIALOG_SPRITE_SIZE);

      for (let needIndex = 0; needIndex < cell.character?.needs.length; needIndex++) {
        this.initNeedsCharacterSprites();
        const spriteName = NEEDS_SPRITES_NAMES[cell.character?.needs[needIndex]];
        const sprite = await this.needsSpritesCollection[spriteName]?.sprite();
        if (sprite) {
          sprite.width = NEEDS_SPRITE_SIZE;
          sprite.height = NEEDS_SPRITE_SIZE;
          sprite.x += needIndex * this.NEEDS_GAP;
        }
        this.renderSceneComposition.addSprite(
            dialogContainer,
            sprite
        );
      }
    }
  }
}
