import { AbstractScene } from "../../framework/graphics/AbstractScene";
import {
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
  private renderFarmComposition!: RenderFarmComposition;
  protected state: State = {
    farm: DEFAULT_FARM_STATE,
  };
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

  protected renderSprites(bundles: object): void {
    console.log('renderSprites', bundles);
    this.state.farm.containers.forEach((cell) => {
      this.renderFarmComposition.renderCharacterSprite(cell, bundles);
      this.renderFarmComposition.renderNeedsSprites(cell, bundles);
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
