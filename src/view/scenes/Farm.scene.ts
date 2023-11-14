import { AbstractScene } from "../../framework/graphics/AbstractScene";
import { DEFAULT_FARM_STATE, eventBusFarm } from "../../model/farm.model";
import { RenderFarmComposition } from "../../compositions/RenderFarm.composition";
import * as PIXI from "pixi.js";
import { eventBusAlmanac } from "../../model/almanac.model";

interface Props {
  farm: FarmState;
}

interface State {
  farm: Props["farm"];
  isAlmanacActive: boolean;
  isTutorialActive: boolean;
}

export class FarmScene extends AbstractScene {
  private renderFarmComposition!: RenderFarmComposition;
  protected state: State = {
    farm: DEFAULT_FARM_STATE,
    isAlmanacActive: false,
    isTutorialActive: false,
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
    this.renderFarmComposition.initEffectContainers();
    this.renderFarmComposition.renderEffectContainers();
  }

  protected async renderSprites(): Promise<void> {
    await this.renderFarmCells(this.state.isAlmanacActive, this.state.isTutorialActive);
    this.renderFarmComposition.renderDecorationSprites();
  }

  private async renderFarmCells(isAlmanacActive: boolean, isTutorialActive: boolean): Promise<void> {
    this.state.farm.containers.forEach((cell) => {
      this.renderFarmComposition.renderCharacterSprite(cell, isAlmanacActive, isTutorialActive);
      this.renderFarmComposition.renderNeedsSprites(cell);
    });
  }

  protected setEvents(): void {
    this.emits.setClickEvent = (callback: (data: Concrete) => void) => {
      this.events.click = callback;
    };
    const updateFarm = (data: FarmState) => {
      this.state.farm = data;
      this.renderFarmCells(this.state.isAlmanacActive, this.state.isTutorialActive);
    };
    const setAlmanacState = (value: boolean) => {
      if (this.state.isTutorialActive) return;
      this.state.isAlmanacActive = value;
      this.renderFarmCells(this.state.isAlmanacActive, this.state.isTutorialActive);
    };

    const setTutorialState = (data: Tutorial) => {
      this.state.isTutorialActive = data.isActive;
      this.renderFarmCells(this.state.isAlmanacActive, this.state.isTutorialActive);
    };

    const endTutorial = () => {
      this.state.isTutorialActive = false;
      this.renderFarmCells(this.state.isAlmanacActive, this.state.isTutorialActive);
    };

    eventBusFarm.off("Farm:update", updateFarm);
    eventBusFarm.on("Farm:update", updateFarm);

    eventBusAlmanac.off("Almanac:activate", setAlmanacState);
    eventBusAlmanac.on("Almanac:activate", setAlmanacState);

    eventBusAlmanac.off("Tutorial:update", setTutorialState);
    eventBusAlmanac.on("Tutorial:update", setTutorialState);

    eventBusAlmanac.off("Tutorial:end", endTutorial);
    eventBusAlmanac.on("Tutorial:end", endTutorial);
  }

  setHandlers() {
    for (const container of this.renderFarmComposition.containers) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      container.render.eventMode = "static";
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      container.render.on("pointerdown", (event) => {
        if (this.events.click) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore

          this.renderFarmComposition.addParticleEffect(container.name, "bailer", event);
          this.events.click(container.name);
          console.log(container);
        }
      });
    }
  }
}
