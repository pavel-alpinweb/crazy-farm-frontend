import {AbstractView} from "../../framework/interface/AbstractView";
import {eventBusUser} from "../../model/user.model";
import {$t} from "../../utils/helpers";

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
                <li data-language="en" class="language-switcher__item">EN</li>
                <li data-language="ru" class="language-switcher__item">RU</li>
           </ul>
        ` : ''}
    <div>
`;

export class LanguageSwitcherComponent extends AbstractView {
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
        this.emits.setClickEvent = (callback: (data: Concrete) => void) => {
            this.events.click = callback;
        };
    }

    setHandlers() {
        this.element?.addEventListener("click", () => {
            this.state.isOpen = !this.state.isOpen;
            this.rerenderElement();
        });
        const langItems = this.element?.querySelectorAll("[data-language]");
        langItems?.forEach((element) => {
            element.addEventListener("click", () => {
                if (element instanceof HTMLElement && element.dataset.language && this.events.click) {
                    this.events.click(element.dataset.language);
                }
            });
        });

        const setLanguage = (value: language) => {
            this.state.language = value;
            this.rerenderElement();
            console.log($t("welcome"));
        };

        eventBusUser.off("User:language", setLanguage);
        eventBusUser.on("User:language", setLanguage);
    }

    protected setState(props: Props): void {
        this.state.language = props.activeLanguage;
    }

    get template(): string {
        return createLanguageSwitcherTemplate(this.state);
    }
}