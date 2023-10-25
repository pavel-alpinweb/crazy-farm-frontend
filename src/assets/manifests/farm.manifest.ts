import { ANIMATED_SPRITE_URL, STATIC_SPRITE_URL } from "../../utils/constants";
import { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
  bundles: [
    {
      name: "dialog",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/dialog.sprite.png`,
      },
    },
    {
      name: "drop",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/drop.sprite.png`,
      },
    },
    {
      name: "bug",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/bug.sprite.png`,
      },
    },
    {
      name: "hunger",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/hunger.sprite.png`,
      },
    },
    {
      name: "dark-field",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/dark-field.sprite.png`,
      },
    },
    {
      name: "light-field",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/light-field.sprite.png`,
      },
    },
    {
      name: "land",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/land.sprite.png`,
      },
    },
    {
      name: "sprout-potato",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/sprout-potato/sprout-potato.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/sprout-potato/sprout-potato.json`,
      },
    },
    {
      name: "child-potato",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/child-potato/child-potato.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/child-potato/child-potato.json`,
      },
    },
    {
      name: "kid-potato",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/kid-potato/kid-potato.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/kid-potato/kid-potato.json`,
      },
    },
    {
      name: "adult-potato",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/adult-potato/adult-potato.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/adult-potato/adult-potato.json`,
      },
    },
    {
      name: "ghost-potato",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/ghost-potato/ghost-potato.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/ghost-potato/ghost-potato.json`,
      },
    },
    {
      name: "sprout-tomato",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/sprout-tomato/sprout-tomato.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/sprout-tomato/sprout-tomato.json`,
      },
    },
    {
      name: "child-tomato",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/child-tomato/child-tomato.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/child-tomato/child-tomato.json`,
      },
    },
    {
      name: "kid-tomato",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/kid-tomato/kid-tomato.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/kid-tomato/kid-tomato.json`,
      },
    },
    {
      name: "adult-tomato",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/adult-tomato/adult-tomato.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/adult-tomato/adult-tomato.json`,
      },
    },
    {
      name: "explosion",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/explosion/explosion.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/explosion/explosion.json`,
      },
    },
    {
      name: "explosion-child-tomato",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/explosion-child-tomato/explosion-child-tomato.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/explosion-child-tomato/explosion-child-tomato.json`,
      },
    },
    {
      name: "explosion-kid-tomato",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/explosion-kid-tomato/explosion-kid-tomato.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/explosion-kid-tomato/explosion-kid-tomato.json`,
      },
    },
    {
      name: "explosion-adult-tomato",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/explosion-adult-tomato/explosion-adult-tomato.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/explosion-adult-tomato/explosion-adult-tomato.json`,
      },
    },
  ],
};
