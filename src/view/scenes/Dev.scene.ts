import { AbstractScene } from "../../framework/graphics/AbstractScene";
import { CHARACTERS_SPRITES, DEFAULT_FARM_STATE } from "../../utils/constants";

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
  };
  protected containers: Containers = [
    {
      name: "central",
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
  }

  protected renderContainers(): void {
    this.containers.forEach((container) => {
      this.renderContainer(container);
      this.centerContainer(container);
      this.centerPivotContainer(container);
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
