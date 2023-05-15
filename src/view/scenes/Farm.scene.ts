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
    main: {
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
    this.renderContainer(this.containers.main);
    this.centerContainer(this.containers.main);
    this.centerPivotContainer(this.containers.main);
  }

  protected renderSprites(): void {
    console.log('renderSprites', this.state);
    this.addSprite(this.containers.main, this.sprites.ground?.sprite);
    setTimeout(() => {
      this.removeAllSprites(this.containers.main);
      this.addSprite(this.containers.main, this.sprites.sproutPotato?.sprite);
    }, 3000);
  }

  protected setEvents(): void {
    this.emits.setClickEvent = (callback: (data: Concrete) => void) => {
      this.events.click = callback;
    };
  }

  setHandlers() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.containers.main.render.eventMode = 'static';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.containers.main.render.on('pointerdown', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this.events.click(this.containers.main.name);
    });
  }

}
