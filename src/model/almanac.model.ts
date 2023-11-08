declare global {
    type AlmanacAction = 'show' | 'close';

    interface AlmanacState {
        isActive: boolean;
        isShow: boolean;
        currentTextKey: string;
        currentActions: AlmanacAction[];
    }
}



export class AlmanacModel {
    private almanacState: AlmanacState = {
        isActive: false,
        isShow: false,
        currentTextKey: '',
        currentActions: ['show', 'close'],
    };
}