import { AbstractScene } from "../../framework/graphics/AbstractScene";
import {
  CHARACTERS_NEEDS,
  CHARACTERS_SPRITES,
  DEFAULT_FARM_STATE, DIALOG_SPRITE_SIZE, NEEDS_SPRITE_SIZE,
} from "../../utils/constants";
import { eventBus } from "../../main";
import { DialogSprite } from "../sprites/Dialog.sprite";
import { BugSprite } from "../sprites/Bug.sprite";
import { HungerSprite } from "../sprites/Hunger.sprite";
import { DropSprite } from "../sprites/Drop";
import DEFAULT_TIMEOUT_INTERVAL = jasmine.DEFAULT_TIMEOUT_INTERVAL;

interface Props {
  farm: FarmState;
}

interface State {
  farm: Props["farm"];
}

export class FarmScene extends AbstractScene {
  private needIndex = 0;
  private needsInterval!: NodeJS.Timer;
  protected state: State = {
    farm: DEFAULT_FARM_STATE,
  };
  protected sprites: SpritesArray = {
    potato: [],
    empty: [],
  };
  needsSprite: SpritesCollection = {
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

  protected setState(props: Props): void {
    this.state.farm = props.farm;
  }

  protected initSprites(): void {
    for (const character in CHARACTERS_SPRITES) {
      CHARACTERS_SPRITES[character].forEach((Sprite) => {
        this.sprites[character].push(new Sprite());
      });
    }

    this.needsSprite.dialog = new DialogSprite();
    this.needsSprite.bug = new BugSprite();
    this.needsSprite.hunger = new HungerSprite();
    this.needsSprite.drop = new DropSprite();

    this.needsSprite.bug.width = NEEDS_SPRITE_SIZE;
    this.needsSprite.bug.height = NEEDS_SPRITE_SIZE;

    this.needsSprite.hunger.width = NEEDS_SPRITE_SIZE;
    this.needsSprite.hunger.height = NEEDS_SPRITE_SIZE;

    this.needsSprite.drop.width = NEEDS_SPRITE_SIZE;
    this.needsSprite.drop.height = NEEDS_SPRITE_SIZE;

    this.needsSprite.dialog.width = DIALOG_SPRITE_SIZE;
    this.needsSprite.dialog.height = DIALOG_SPRITE_SIZE;
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
          this.sprites[cell.character?.type][cell.character?.stage];
        this.addSprite(container, sprite?.sprite);

        const dialogContainer = this.containers.find(
          (cont) => cont.name === `${cell.name}-dialog`
        );

        if (dialogContainer && cell.character.needs.length > 1) {
          this.needIndex = 0;
          clearInterval(this.needsInterval);
          this.needsInterval = setInterval(() => {
            this.removeAllSprites(dialogContainer);
            this.addSprite(dialogContainer, this.needsSprite.dialog?.sprite);
            switch (cell.character?.needs[this.needIndex]) {
              case CHARACTERS_NEEDS.HUNGER:
                this.addSprite(dialogContainer, this.needsSprite.hunger?.sprite);
                break;
              case CHARACTERS_NEEDS.SICKNESS:
                this.addSprite(dialogContainer, this.needsSprite.bug?.sprite);
                break;
              case CHARACTERS_NEEDS.THIRST:
                this.addSprite(dialogContainer, this.needsSprite.drop?.sprite);
                break;
            }
            if (cell.character) {
              this.needIndex = this.needIndex === cell.character.needs.length - 1 ? 0 : this.needIndex += 1;
            }
          }, 1500);
        } else if (dialogContainer && cell.character.needs.length === 1) {
          this.needIndex = 0;
          clearInterval(this.needsInterval);
          this.removeAllSprites(dialogContainer);
          this.addSprite(dialogContainer, this.needsSprite.dialog?.sprite);
          switch (cell.character?.needs[this.needIndex]) {
            case CHARACTERS_NEEDS.HUNGER:
              this.addSprite(dialogContainer, this.needsSprite.hunger?.sprite);
              break;
            case CHARACTERS_NEEDS.SICKNESS:
              this.addSprite(dialogContainer, this.needsSprite.bug?.sprite);
              break;
            case CHARACTERS_NEEDS.THIRST:
              this.addSprite(dialogContainer, this.needsSprite.drop?.sprite);
              break;
          }
        } else if (dialogContainer) {
          this.needIndex = 0;
          clearInterval(this.needsInterval);
          this.removeAllSprites(dialogContainer);
        }
      }
    });
  }

  protected setEvents(): void {
    this.emits.setClickEvent = (callback: (data: Concrete) => void) => {
      this.events.click = callback;
    };
    const updateFarm = (data: FarmState) => {
      this.state.farm = data;
      this.renderSprites();
    };
    eventBus.off("Farm:update", updateFarm);
    eventBus.on("Farm:update", updateFarm);
  }

  setHandlers() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const centralContainer = this.containers.find(
      (container) => container.name === "central"
    );
    if (centralContainer) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      centralContainer.render.eventMode = "static";
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    centralContainer.render.on("pointerdown", () => {
      if (this.events.click) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.events.click(centralContainer.name);
      }
    });
  }
}
