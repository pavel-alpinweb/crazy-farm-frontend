import * as PIXI from "pixi.js";
import {manifest} from "../../assets/manifests/farm.manifest";

export class AssetsLoader {
    private readonly manifest!: string;
    public bundle: PIXI.ResolverBundle | null = null;

    constructor(manifestURl: string) {
        this.manifest = manifestURl;
    }

    async load(): Promise<void> {
        await PIXI.Assets.init({ manifest: this.manifest });
        this.bundle = await  PIXI.Assets.loadBundle(manifest.bundles.map(bundle => bundle.name));
    }
}