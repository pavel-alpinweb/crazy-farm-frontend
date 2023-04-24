import {AbstractView} from "../../framework/interface/AbstractView";

interface Props {
    value: string,
    placeholder: string,
    isDisabled: boolean,
    isError: boolean,
    isPassword: boolean,
}

interface State {
    value: Props["value"],
    placeholder: Props["placeholder"],
    isPassword: Props["isPassword"],
    isDisabled: boolean,
    isError: boolean,
}

const createTextInputTemplate = (state: State) => `
<input
    class="text-input ${state.isError ? 'text-input--error' : ''}"
    type="${state.isPassword ? 'password' : 'text'}"
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
        isPassword: false,
    }
    constructor(props: Props) {
        super();
        this.state = props;
    }
    get template(): string {
        return createTextInputTemplate(this.state);
    }
}