import { AbstractScene } from "../../framework/graphics/AbstractScene";
import { GroundSprite } from "../sprites/Ground.sprite";
import { SproutPotatoSprite } from "../sprites/SproutPotato.sprite";

export class FarmScene extends AbstractScene {
  protected sprites: Sprites = {
    ground: null,
    sproutPotato: null,
  };

  protected initSprites(): void {
    this.sprites.ground = new GroundSprite();
    this.sprites.sproutPotato = new SproutPotatoSprite();
  }

  protected renderSprites(): void {
    this.addSprite(this.sprites.ground?.sprite);
    setTimeout(() => {
      this.removeAllSprites();
      this.addSprite(this.sprites.sproutPotato?.sprite);
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
    this.container.name = 'Name №1';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.container.eventMode = 'static';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.container.on('pointerdown', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this.events.click(this.container?.name);
    });
  }
}
