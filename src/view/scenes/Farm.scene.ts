import { AbstractScene } from "../../framework/graphics/AbstractScene";
import {
  DEFAULT_FARM_STATE,
} from "../../utils/constants";
import { eventBus } from "../../main";
import {RenderFarmComposition} from "../../compositions/RenderFarm.composition";
import * as PIXI from "pixi.js";

interface Props {
  farm: FarmState;
}

interface State {
  farm: Props["farm"];
}

export class FarmScene extends AbstractScene {
  private renderFarmComposition!: RenderFarmComposition;
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

  protected setState(props: Props): void {
    this.state.farm = props.farm;
  }

  protected initSprites(): void {
    this.renderFarmComposition = new RenderFarmComposition(<PIXI.Application>this.scene);
    this.renderFarmComposition.initCharactersSprite();
    this.renderFarmComposition.initNeedsCharacterSprites();
  }

  protected renderContainers(): void {
    this.renderFarmComposition.renderFarmContainers();
  }

  protected renderSprites(): void {
    this.state.farm.containers.forEach((cell) => {
      this.renderFarmComposition.renderCharacterSprite(cell);
      this.renderFarmComposition.renderNeedsSprites(cell);
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
    const centralContainer = this.renderFarmComposition.containers.find(
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
