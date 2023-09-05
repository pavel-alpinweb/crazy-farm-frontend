import { CHARACTERS_NEEDS } from "../model/farm.model";
import { CHARACTERS_SPRITES, NEEDS_SPRITE_SIZE } from "../utils/constants";
import { DialogSprite } from "../view/sprites/Dialog.sprite";
import { BugSprite } from "../view/sprites/Bug.sprite";
import { HungerSprite } from "../view/sprites/Hunger.sprite";
import { DropSprite } from "../view/sprites/Drop.sprite";
import { RenderSceneComposition } from "./RenderScene.composition";
import * as PIXI from "pixi.js";

export class RenderFarmComposition {
  private readonly scene!: PIXI.Application;
  private renderSceneComposition!: RenderSceneComposition;
  private needIndex = 0;
  private needsInterval!: NodeJS.Timer;
  private readonly ROWS_COUNT:number = 3;
  private readonly COLS_COUNT:number  = 4;
  private readonly CELL_SIZE:number  = 150;
  private readonly CELL_GAP: number = 10;
  constructor(scene: PIXI.Application) {
    this.scene = scene;
    this.renderSceneComposition = new RenderSceneComposition(this.scene);
  }
  private readonly charactersSpriteList: SpritesArray = {
    potato: [],
    tomato: [],
    empty: [],
  };

  private readonly needsSpritesCollection: SpritesCollection = {
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
    for (const character in CHARACTERS_SPRITES) {
      CHARACTERS_SPRITES[character].forEach((Sprite) => {
        this.charactersSpriteList[character].push(new Sprite());
      });
    }
  }

  public initNeedsCharacterSprites(): void {
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
      }
    }
    console.log('initFarmContainers', this.containers);
  }

  public renderFarmContainers(): void {
    this.farmContainers.forEach((container) => {
      if (container.name !== "central-dialog") {
        const [x, y] = container.name.split("-").map((value) => Number(value));
        this.renderSceneComposition.renderContainer(container);
        this.renderSceneComposition.setContainerX(container, (x * this.CELL_SIZE) + this.CELL_SIZE + (this.CELL_GAP * x));
        this.renderSceneComposition.setContainerY(container, (y * this.CELL_SIZE) + this.CELL_SIZE + (this.CELL_GAP * y));
        this.renderSceneComposition.centerPivotContainer(container);
      } else {
        this.renderSceneComposition.renderContainer(container);
        this.renderSceneComposition.setContainerX(container, 500);
        this.renderSceneComposition.setContainerY(container, 100);
        this.renderSceneComposition.setContainerPivotX(container, 0);
        this.renderSceneComposition.setContainerPivotY(container, 0);
      }
    });
  }

  public async renderCharacterSprite(cell: Cell) {
    const container = this.farmContainers.find(
      (cont) => cont.name === cell.name
    );
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
            await this.charactersSpriteList?.empty[0]?.sprite()
          );
        }
      };

      this.renderSceneComposition.setContainerWidth(container, this.CELL_SIZE);
      this.renderSceneComposition.setContainerHeight(container, this.CELL_SIZE);
    } else if (container) {
      this.renderSceneComposition.removeAllSprites(container);
      this.renderSceneComposition.addSprite(
        container,
        await this.charactersSpriteList?.empty[0]?.sprite()
      );

      this.renderSceneComposition.setContainerWidth(container, this.CELL_SIZE);
      this.renderSceneComposition.setContainerHeight(container, this.CELL_SIZE);
    }
  }

  public renderNeedsSprites(cell: Cell) {
    const dialogContainer = this.farmContainers.find(
      (cont) => cont.name === `${cell.name}-dialog`
    );
    if (dialogContainer) {
      this.needIndex = 0;
      this.renderSceneComposition.removeAllSprites(<Container>dialogContainer);
      clearInterval(this.needsInterval);
    }
    if (cell.character?.needs.length && dialogContainer) {
      this.needsInterval = setInterval(async () => {
        this.renderSceneComposition.removeAllSprites(dialogContainer);
        this.renderSceneComposition.addSprite(
          dialogContainer,
          await this.needsSpritesCollection.dialog?.sprite()
        );
        if (this.needsSpritesCollection.dialog) {
          this.needsSpritesCollection.dialog.width = NEEDS_SPRITE_SIZE;
          this.needsSpritesCollection.dialog.height = NEEDS_SPRITE_SIZE;
        }
        switch (cell.character?.needs[this.needIndex]) {
          case CHARACTERS_NEEDS.HUNGER:
            this.renderSceneComposition.addSprite(
              dialogContainer,
              await this.needsSpritesCollection.hunger?.sprite()
            );
            if (this.needsSpritesCollection.hunger) {
              this.needsSpritesCollection.hunger.width = NEEDS_SPRITE_SIZE;
              this.needsSpritesCollection.hunger.height = NEEDS_SPRITE_SIZE;
            }
            break;
          case CHARACTERS_NEEDS.SICKNESS:
            this.renderSceneComposition.addSprite(
              dialogContainer,
              await this.needsSpritesCollection.bug?.sprite()
            );
            if (this.needsSpritesCollection.bug) {
              this.needsSpritesCollection.bug.width = NEEDS_SPRITE_SIZE;
              this.needsSpritesCollection.bug.height = NEEDS_SPRITE_SIZE;
            }
            break;
          case CHARACTERS_NEEDS.THIRST:
            this.renderSceneComposition.addSprite(
              dialogContainer,
              await this.needsSpritesCollection.drop?.sprite()
            );
            if (this.needsSpritesCollection.drop) {
              this.needsSpritesCollection.drop.width = NEEDS_SPRITE_SIZE;
              this.needsSpritesCollection.drop.height = NEEDS_SPRITE_SIZE;
            }
            break;
        }
        if (cell.character) {
          this.needIndex =
            this.needIndex === cell.character.needs.length - 1
              ? 0
              : (this.needIndex += 1);
        }
      }, 1000);
    }
  }
}
