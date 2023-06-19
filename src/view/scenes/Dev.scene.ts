import {AbstractScene} from "../../framework/graphics/AbstractScene";
import { CHARACTERS_SPRITES, DEFAULT_FARM_STATE } from "../../utils/constants";
import {DialogSprite} from "../sprites/Dialog.sprite";
import {BugSprite} from "../sprites/Bug.sprite";
import {HungerSprite} from "../sprites/Hunger.sprite";
import {DropSprite} from "../sprites/Drop";

interface Props {
  farm: FarmState;
}

interface State {
  farm: Props["farm"];
}

export class DevScene extends AbstractScene {
  protected state: State = {
    farm: DEFAULT_FARM_STATE,
  };
  protected sprites: SpritesArray = {
    potato: [],
  };
  needsSprite: SpritesCollection = {
    drop: null,
    bug: null,
    hunger: null,
    dialog: null,
  }
  protected containers: Containers = [
    {
      name: "central",
      render: null,
    },
    {
      name: "dialog",
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
        this.sprites[character].push(new Sprite());
      });
    }
    this.needsSprite.dialog = new DialogSprite();
    this.needsSprite.bug = new BugSprite();
    this.needsSprite.hunger = new HungerSprite();
    this.needsSprite.drop = new DropSprite();

    this.needsSprite.bug.width = 100;
    this.needsSprite.bug.height = 100;

    this.needsSprite.hunger.width = 100;
    this.needsSprite.hunger.height = 100;

    this.needsSprite.drop.width = 100;
    this.needsSprite.drop.height = 100;

    this.needsSprite.dialog.width = 200;
    this.needsSprite.dialog.height = 200;
  }

  protected renderContainers(): void {
    this.containers.forEach((container) => {
      if (container.name !== "dialog") {
        this.renderContainer(container);
        this.centerContainer(container);
        this.centerPivotContainer(container);
      }
    });
    const dialogContainer = this.containers.find((item) => item.name === "dialog");
    this.renderContainer(<Container>dialogContainer);
    this.setContainerX(<Container>dialogContainer, 500);
    this.setContainerY(<Container>dialogContainer, 100);
    this.setContainerPivotX(<Container>dialogContainer, 0);
    this.setContainerPivotY(<Container>dialogContainer, 0);
  }

  protected renderSprites(): void {
    this.state.farm.containers.forEach((cell) => {
      const container = this.containers.find((cont) => cont.name === cell.name);
      if (cell.character && container) {
        this.removeAllSprites(container);
        const sprite =
          this.sprites[cell.character?.type][cell.character?.stage];
        this.addSprite(container, sprite?.sprite);
      }
    });
    const dialogContainer = this.containers.find((item) => item.name === "dialog");
    this.addSprite(<Container>dialogContainer, this.needsSprite.dialog?.sprite);
    this.addSprite(<Container>dialogContainer, this.needsSprite.bug?.sprite);
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
