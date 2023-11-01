import {AbstractView} from "../../framework/interface/AbstractView";

interface Props {
    activeLanguage: language;
}
interface State {
    language: Props["activeLanguage"];
    isOpen: boolean;
}

const createLanguageSwitcherTemplate = (state: State) => `
    <div class="language-switcher">
        <div class="language-switcher__current">${state.language}</div>
        ${state.isOpen ? `
           <ul class="language-switcher__menu">
                <li class="language-switcher__item">EN</li>
                <li class="language-switcher__item">RU</li>
           </ul>
        ` : ''}
    <div>
`;

export class LanguageSwitcherComponent extends AbstractView{
    protected state: State = {
        language: 'en',
        isOpen: false,
    };

    constructor(props: Props) {
        super();
        this.setState(props);
        this.setEvents();
    }

    protected setEvents(): void {
        console.warn('setEvents');
    }

    protected setState(props: Props): void {
        this.state.language = props.activeLanguage;
    }

    get template(): string {
        return createLanguageSwitcherTemplate(this.state);
    }
}