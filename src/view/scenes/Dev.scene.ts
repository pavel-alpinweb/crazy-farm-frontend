import { AbstractScene } from "../../framework/graphics/AbstractScene";
import { CHARACTERS_SPRITES, DEFAULT_FARM_STATE } from "../../utils/constants";
import {DialogSprite} from "../sprites/Dialog.sprite";
import {AbstractStaticSprite} from "../../framework/graphics/AbstractStaticSprite";
import {AnimatedSprite, Sprite} from "pixi.js";

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
  protected sprites: Sprites = {
    potato: [],
    dialogs: [],
  };
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
    this.sprites.dialogs.push(new DialogSprite());
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
    this.setContainerX(<Container>dialogContainer, 430);
    this.setContainerY(<Container>dialogContainer, 250);
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
    const dialogSprite = this.sprites.dialogs[0];
    this.addSprite(<Container>dialogContainer, dialogSprite?.sprite);
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
