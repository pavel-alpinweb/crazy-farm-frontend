import * as PIXI from "pixi.js";
import { ResolverManifest } from "pixi.js";

export class AssetsLoader {
  private readonly manifest!: ResolverManifest;
  private bundle: PIXI.ResolverBundle | null = null;

  constructor(manifest: PIXI.ResolverManifest) {
    this.manifest = manifest;
  }

  async load(): Promise<PIXI.ResolverBundle | null> {
    if (!this.bundle) {
      console.log("Assets is loading...");
      await PIXI.Assets.init({ manifest: this.manifest });
      this.bundle = await PIXI.Assets.loadBundle(
        this.manifest.bundles.map((bundle) => bundle.name)
      );
    } else {
      console.log("Assets already loaded");
    }
    return this.bundle;
  }
}
