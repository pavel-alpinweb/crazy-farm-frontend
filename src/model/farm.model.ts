import {DEFAULT_FARM_STATE} from "../utils/constants";
import {AbstractStaticSprite} from "../framework/graphics/AbstractStaticSprite";
import {AbstractAnimatedSprite} from "../framework/graphics/AbstractAnimatedSprite";

declare global {
    interface Character {
        type: string,
        stage: number,
    }
    interface Cell {
        isEmpty: boolean,
        isBlocked: boolean,
        name: string,
        character: Character | null,
    }
    interface FarmState {
        containers: Array<Cell>
    }
    interface CharactersSprites {
        [key: string]: Array<{ new(): AbstractStaticSprite } | { new(): AbstractAnimatedSprite }>
    }
}

export default class  FarmModel {
    private initialState: FarmState = DEFAULT_FARM_STATE;

    public get state(): FarmState {
        return this.initialState;
    }
}