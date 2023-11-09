import { AbstractScene } from "../../framework/graphics/AbstractScene";
import { DEFAULT_FARM_STATE, eventBusFarm } from "../../model/farm.model";
import { RenderFarmComposition } from "../../compositions/RenderFarm.composition";
import * as PIXI from "pixi.js";

interface Props {
  farm: FarmState;
}

interface State {
  farm: Props["farm"];
  isAlmanacActive: boolean;
}

export class FarmScene extends AbstractScene {
  private renderFarmComposition!: RenderFarmComposition;
  protected state: State = {
    farm: DEFAULT_FARM_STATE,
    isAlmanacActive: false,
  };
  constructor(props: Props) {
    super();
    this.setState(props);
  }

  protected setState(props: Props): void {
    this.state.farm = props.farm;
  }

  protected initSprites(): void {
    this.renderFarmComposition = new RenderFarmComposition(
      <PIXI.Application>this.scene
    );
    this.renderFarmComposition.initCharactersSprite();
    this.renderFarmComposition.initNeedsCharacterSprites();
  }

  protected renderContainers(): void {
    this.renderFarmComposition.initWoodlandsContainers();
    this.renderFarmComposition.renderWoodlandsContainers();
    this.renderFarmComposition.initFarmContainers();
    this.renderFarmComposition.renderFarmContainers();
  }

  protected async renderSprites(): Promise<void> {
    await this.renderFarmCells(this.state.isAlmanacActive);
    this.renderFarmComposition.renderDecorationSprites();
  }

  private async renderFarmCells(isAlmanacActive: boolean): Promise<void> {
    this.state.farm.containers.forEach((cell) => {
      this.renderFarmComposition.renderCharacterSprite(cell, isAlmanacActive);
      this.renderFarmComposition.renderNeedsSprites(cell);
    });
  }

  protected setEvents(): void {
    this.emits.setClickEvent = (callback: (data: Concrete) => void) => {
      this.events.click = callback;
    };
    const updateFarm = (data: FarmState) => {
      this.state.farm = data;
      this.renderFarmCells(this.state.isAlmanacActive);
    };
    eventBusFarm.off("Farm:update", updateFarm);
    eventBusFarm.on("Farm:update", updateFarm);
  }

  setHandlers() {
    for (const container of this.renderFarmComposition.containers) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      container.render.eventMode = "static";
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      container.render.on("pointerdown", () => {
        if (this.events.click) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          this.events.click(container.name);
        }
      });
    }
  }
}
