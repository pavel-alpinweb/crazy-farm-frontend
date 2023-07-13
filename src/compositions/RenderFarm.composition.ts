import {CHARACTERS_SPRITES, DIALOG_SPRITE_SIZE, NEEDS_SPRITE_SIZE} from "../utils/constants";
import {DialogSprite} from "../view/sprites/Dialog.sprite";
import {BugSprite} from "../view/sprites/Bug.sprite";
import {HungerSprite} from "../view/sprites/Hunger.sprite";
import {DropSprite} from "../view/sprites/Drop";
import {RenderSceneComposition} from "./RenderScene.composition";
import * as PIXI from "pixi.js";

export class RenderFarmComposition {
    private scene!: PIXI.Application;
    private renderSceneComposition!: RenderSceneComposition;
    constructor(scene: PIXI.Application) {
        this.scene = scene;
        this.renderSceneComposition = new RenderSceneComposition(this.scene);
    }
    private readonly charactersSpriteList: SpritesArray = {
        potato: [],
        empty: [],
    };

    private readonly needsSpritesCollection: SpritesCollection = {
        drop: null,
        bug: null,
        hunger: null,
        dialog: null,
    };

    private readonly farmContainers: Containers = [
        {
            name: "central",
            render: null,
        },
        {
            name: "central-dialog",
            render: null,
        },
    ];

    public initCharactersSprite(): void {
        for (const character in CHARACTERS_SPRITES) {
            CHARACTERS_SPRITES[character].forEach((Sprite) => {
                this.charactersSpriteList[character].push(new Sprite());
            });
        }
    }

    public initNeedsCharacterSprites(): void {
        this.needsSpritesCollection.dialog = new DialogSprite();
        this.needsSpritesCollection.bug = new BugSprite();
        this.needsSpritesCollection.hunger = new HungerSprite();
        this.needsSpritesCollection.drop = new DropSprite();

        this.needsSpritesCollection.bug.width = NEEDS_SPRITE_SIZE;
        this.needsSpritesCollection.bug.height = NEEDS_SPRITE_SIZE;

        this.needsSpritesCollection.hunger.width = NEEDS_SPRITE_SIZE;
        this.needsSpritesCollection.hunger.height = NEEDS_SPRITE_SIZE;

        this.needsSpritesCollection.drop.width = NEEDS_SPRITE_SIZE;
        this.needsSpritesCollection.drop.height = NEEDS_SPRITE_SIZE;

        this.needsSpritesCollection.dialog.width = DIALOG_SPRITE_SIZE;
        this.needsSpritesCollection.dialog.height = DIALOG_SPRITE_SIZE;
    }

    public renderFarmContainers(): void {

    }
}