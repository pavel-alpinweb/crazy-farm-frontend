import { AbstractScene } from "../../framework/graphics/AbstractScene";
import {
  CHARACTERS_NEEDS,
  CHARACTERS_SPRITES,
  DEFAULT_FARM_STATE,
} from "../../utils/constants";
import { DialogSprite } from "../sprites/Dialog.sprite";
import { BugSprite } from "../sprites/Bug.sprite";
import { HungerSprite } from "../sprites/Hunger.sprite";
import { DropSprite } from "../sprites/Drop";

interface Props {
  farm: FarmState;
}

interface State {
  farm: Props["farm"];
}

export class DevScene extends AbstractScene {
  private needIndex = 0;
  private needsInterval!: NodeJS.Timer;
  protected state: State = {
    farm: DEFAULT_FARM_STATE,
  };
  protected spritesList: SpritesArray = {
    potato: [],
    empty: [],
  };
  protected spritesCollection: SpritesCollection = {
    drop: null,
    bug: null,
    hunger: null,
    dialog: null,
  };
  protected containers: Containers = [
    {
      name: "central",
      render: null,
    },
    {
      name: "central-dialog",
      render: null,
    },
  ];
  constructor(props: Props) {
    super();
    this.setState(props);
  }

  protected initSprites(): void {
    for (const character in CHARACTERS_SPRITES) {
      CHARACTERS_SPRITES[character].forEach((Sprite) => {
        this.spritesList[character].push(new Sprite());
      });
    }
    this.spritesCollection.dialog = new DialogSprite();
    this.spritesCollection.bug = new BugSprite();
    this.spritesCollection.hunger = new HungerSprite();
    this.spritesCollection.drop = new DropSprite();

    this.spritesCollection.bug.width = 100;
    this.spritesCollection.bug.height = 100;

    this.spritesCollection.hunger.width = 100;
    this.spritesCollection.hunger.height = 100;

    this.spritesCollection.drop.width = 100;
    this.spritesCollection.drop.height = 100;

    this.spritesCollection.dialog.width = 200;
    this.spritesCollection.dialog.height = 200;
  }

  protected renderContainers(): void {
    this.containers.forEach((container) => {
      if (container.name !== "central-dialog") {
        this.renderContainer(container);
        this.centerContainer(container);
        this.centerPivotContainer(container);
      } else {
        this.renderContainer(container);
        this.setContainerX(container, 500);
        this.setContainerY(container, 100);
        this.setContainerPivotX(container, 0);
        this.setContainerPivotY(container, 0);
      }
    });
  }

  protected renderSprites(): void {
    this.state.farm.containers.forEach((cell) => {
      const container = this.containers.find((cont) => cont.name === cell.name);
      if (cell.character && container) {
        this.removeAllSprites(container);
        const sprite =
          this.spritesList[cell.character?.type][cell.character?.stage];
        this.addSprite(container, sprite?.sprite);

        const dialogContainer = this.containers.find(
          (cont) => cont.name === `${cell.name}-dialog`
        );

        if (dialogContainer && cell.character.needs.length > 0) {
          this.needIndex = 0;
          clearInterval(this.needsInterval);
          this.needsInterval = setInterval(() => {
            this.removeAllSprites(dialogContainer);
            this.addSprite(dialogContainer, this.spritesCollection.dialog?.sprite);
            switch (cell.character?.needs[this.needIndex]) {
              case CHARACTERS_NEEDS.HUNGER:
                this.addSprite(
                  dialogContainer,
                  this.spritesCollection.hunger?.sprite
                );
                break;
              case CHARACTERS_NEEDS.SICKNESS:
                this.addSprite(dialogContainer, this.spritesCollection.bug?.sprite);
                break;
              case CHARACTERS_NEEDS.THIRST:
                this.addSprite(dialogContainer, this.spritesCollection.drop?.sprite);
                break;
            }
            if (cell.character) {
              this.needIndex =
                this.needIndex === cell.character.needs.length - 1
                  ? 0
                  : (this.needIndex += 1);
            }
          }, 1500);
        }else if (dialogContainer) {
          this.needIndex = 0;
          clearInterval(this.needsInterval);
          this.removeAllSprites(dialogContainer);
        }
      } else if (container) {
        this.removeAllSprites(container);
        this.addSprite(container, this.spritesList?.empty[0]?.sprite);
      }
    });
  }

  protected setEvents(): void {
    this.emits.setClickEvent = (callback: (data: Concrete) => void) => {
      this.events.click = callback;
    };
  }

  protected setHandlers(): void {
    console.log("Init: setHandlers");
  }

  protected setState(props: Props): void {
    this.state.farm = props.farm;
  }
}
