import { AbstractScene } from "../../framework/graphics/AbstractScene";
import {
  CHARACTERS_NEEDS,
  DEFAULT_FARM_STATE,
} from "../../utils/constants";
import {RenderFarmComposition} from "../../compositions/RenderFarm.composition";
import * as PIXI from "pixi.js";

interface Props {
  farm: FarmState;
}

interface State {
  farm: Props["farm"];
}

export class DevScene extends AbstractScene{
  private needIndex = 0;
  private needsInterval!: NodeJS.Timer;
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
  }

  protected setHandlers(): void {
    console.log("Init: setHandlers");
  }

  protected setState(props: Props): void {
    this.state.farm = props.farm;
  }
}
