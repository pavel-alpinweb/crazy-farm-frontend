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
      name: "fence-left-vertical",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/fence-left-vertical.sprite.png`,
      },
    },
    {
      name: "fence-top-horizontal",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/fence-top-horizontal.sprite.png`,
      },
    },
    {
      name: "fence-right-vertical",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/fence-right-vertical.sprite.png`,
      },
    },
    {
      name: "fence-bottom-horizontal",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/fence-bottom-horizontal.sprite.png`,
      },
    },
    {
      name: "tree-right",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/tree-right.sprite.png`,
      },
    },
    {
      name: "tree-left",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/tree-left.sprite.png`,
      },
    },
    {
      name: "bush-right",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/bush-right.sprite.png`,
      },
    },
    {
      name: "bush-left",
      assets: {
        sprite: `${STATIC_SPRITE_URL}/bush-left.sprite.png`,
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
      name: "mini-explosion",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/mini-explosion/mini-explosion.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/mini-explosion/mini-explosion.json`,
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
    {
      name: "withered-tomato-sprout",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/withered-tomato-sprout/withered-tomato-sprout.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/withered-tomato-sprout/withered-tomato-sprout.json`,
      },
    },
    {
      name: "withered-potato-sprout",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/withered-potato-sprout/withered-potato-sprout.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/withered-potato-sprout/withered-potato-sprout.json`,
      },
    },
    {
      name: "onion-sprout",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/onion-sprout/onion-sprout.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/onion-sprout/onion-sprout.json`,
      },
    },
    {
      name: "withered-onion-sprout",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/withered-onion-sprout/withered-onion-sprout.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/withered-onion-sprout/withered-onion-sprout.json`,
      },
    },
    {
      name: "onion-child",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/onion-child/onion-child.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/onion-child/onion-child.json`,
      },
    },
    {
      name: "onion-kid",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/onion-kid/onion-kid.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/onion-kid/onion-kid.json`,
      },
    },
    {
      name: "onion-adult",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/onion-adult/onion-adult.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/onion-adult/onion-adult.json`,
      },
    },
    {
      name: "onion-death",
      assets: {
        sprite_sheet: `${ANIMATED_SPRITE_URL}/onion-death/onion-death.png`,
        sprite_data: `${ANIMATED_SPRITE_URL}/onion-death/onion-death.json`,
      },
    },
  ],
};
