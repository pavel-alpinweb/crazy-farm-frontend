declare global {
    type AlmanacAction = 'show' | 'close';

    interface AlmanacState {
        isActive: boolean;
        currentTextKey: string;
        currentActions: AlmanacAction[];
    }
}



export class AlmanacModel {
    private almanacState: AlmanacState = {
        isActive: false,
        currentTextKey: '',
        currentActions: ['show', 'close'],
    };
}