import { AbstractScene } from "../../framework/graphics/AbstractScene";
import { CHARACTERS_SPRITES, DEFAULT_FARM_STATE } from "../../utils/constants";

interface Props {
  farm: FarmState;
}

interface State {
  farm: Props["farm"];
}

export class FarmScene extends AbstractScene {
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

  protected setState(props: Props): void {
    this.state.farm = props.farm;
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
      if (!cell.isBlocked && cell.character && container) {
        this.removeAllSprites(container);
        const sprite = this.sprites[cell.character?.type][cell.character?.stage];
        this.addSprite(container, sprite?.sprite);
      }
    });
  }

  protected setEvents(): void {
    this.emits.setClickEvent = (callback: (data: Concrete) => void) => {
      this.events.click = callback;
    };
  }

  setHandlers() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const centralContainer = this.containers.find((container) => container.name === 'central')
    if (centralContainer) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      centralContainer.render.eventMode = "static";
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    centralContainer.render.on("pointerdown", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this.events.click(centralContainer.name);
    });
  }
}
