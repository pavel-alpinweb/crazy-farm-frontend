import { ANIMATED_SPRITE_URL, STATIC_SPRITE_URL } from "../../utils/constants";
import {ResolverManifest} from "pixi.js";

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
      name: "empty-field",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/empty-field.sprite.png`,
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
  ],
}
