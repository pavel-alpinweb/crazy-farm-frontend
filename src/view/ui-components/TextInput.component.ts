import {AbstractView} from "../../framework/interface/AbstractView";

interface Props {
    value: string,
    placeholder: string,
    isDisabled: boolean,
    isError: boolean,
}

interface State {
    value: Props["value"],
    placeholder: Props["placeholder"],
    isDisabled: boolean,
    isError: boolean,
}

const createTextInputTemplate = (state: State) => `
<input
    class="text-input ${state.isError ? 'text-input--error' : ''}"
    type="text"
    ${state.isDisabled ? 'disabled' : ''}
    value="${state.value}"
    placeholder="${state.placeholder}"
/>
`;

export class TextInputComponent extends AbstractView {
    protected state: State = {
        value: '',
        placeholder: '',
        isDisabled: false,
        isError: false,
    }
    constructor(props: Props) {
        super();
        this.state = props;
    }
    get template(): string {
        return createTextInputTemplate(this.state);
    }
}