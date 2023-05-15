import { AbstractScene } from "../../framework/graphics/AbstractScene";
import { GroundSprite } from "../sprites/Ground.sprite";
import { SproutPotatoSprite } from "../sprites/SproutPotato.sprite";

interface Props {
  farm: FarmState;
}

interface State {
  farm: Props["farm"];
}

export class FarmScene extends AbstractScene {
  protected state: State = {
    farm: {
      containers: {
        central: {
          isEmpty: true,
          isBlocked: true,
          character: {
            type: 'potato',
            stage: 1,
          },
        },
      },
    },
  };
  protected sprites: Sprites = {
    ground: null,
    sproutPotato: null,
  };
  protected containers: Containers = {
    central: {
      name: 'central',
      render: null,
    },
  };

  constructor(props: Props) {
    super();
    this.setState(props);
  }

  protected setState(props: Props): void {
    this.state.farm = props.farm;
  }

  protected initSprites(): void {
    this.sprites.ground = new GroundSprite();
    this.sprites.sproutPotato = new SproutPotatoSprite();
  }

  protected renderContainers(): void {
    this.renderContainer(this.containers.central);
    this.centerContainer(this.containers.central);
    this.centerPivotContainer(this.containers.central);
  }

  protected renderSprites(): void {
    if (this.state.farm.containers.central.isEmpty && !this.state.farm.containers.central.isBlocked) {
      let sprite = null;
      switch (this.state.farm.containers.central.character.stage) {
        case 1:
          sprite = this.sprites.ground?.sprite;
          break;
        case 2:
          sprite = this.sprites.sproutPotato?.sprite;
          break;
        default:
          break;
      }
      this.addSprite(this.containers.central, sprite);
    }
  }

  protected setEvents(): void {
    this.emits.setClickEvent = (callback: (data: Concrete) => void) => {
      this.events.click = callback;
    };
  }

  setHandlers() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.containers.central.render.eventMode = 'static';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.containers.central.render.on('pointerdown', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this.events.click(this.containers.central.name);
    });
  }

}
