declare global {
    interface Character {
        type: string,
        stage: number,
    }
    interface FarmState {
        containers: {
            [key: string]: {
                isEmpty: boolean,
                isBlocked: boolean,
                character: Character,
            },
        },
    }
}

export default class  FarmModel {
    private initialState: FarmState = {
        containers: {
            central: {
                isEmpty: true,
                isBlocked: false,
                character: {
                    type: 'potato',
                    stage: 2,
                },
            },
        },
    };

    public get state(): FarmState {
        return this.initialState;
    }
}