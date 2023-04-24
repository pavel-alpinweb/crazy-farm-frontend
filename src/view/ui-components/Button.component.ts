import {AbstractView} from "../../framework/interface/AbstractView";

interface Props {
    title: string
}
interface State {
    isLoading: boolean,
    isDisabled: boolean,
    title: Props["title"],
}

const createButtonTemplate = (state: State) => `
<button type="button" ${state.isDisabled ? 'disabled' : ''}>
    ${state.isLoading ? 'Loading...' : state.title}
</button>
`;

export class ButtonComponent extends AbstractView {
    protected state: State = {
        isLoading: false,
        isDisabled: false,
        title: 'Отправить'
    };
    constructor(props: Props) {
        super();
        this.state.title = props.title;
    }
    get template(): string {
        return createButtonTemplate(this.state);
    }
}