import { AbstractView } from "../../framework/interface/AbstractView";
import {$t} from "../../utils/helpers";
import {eventBusUser} from "../../model/user.model";

interface Props {
  translationKey: string;
}

interface State {
  title: string;
  translationKey: Props["translationKey"];
}

const createPageHeaderTemplate = (state: State) => `
<div class="page-header">
    <h1>${state.title}</h1>
</div>
`;

export class PageHeaderComponent extends AbstractView {
  protected state: State = {
    title: "",
    translationKey: "",
  };
  constructor(props: Props) {
    super();
    this.setState(props);
    this.setEvents();
  }
  protected setState(props: Props) {
    this.state.title = $t(props.translationKey);
    this.state.translationKey = props.translationKey;
  }
  protected setEvents(): void {
    this.emits.setClickEvent = (callback: (data: Concrete) => void) => {
      this.events.click = callback;
    };
    const setLanguage = () => {
      this.state.title = $t(this.state.translationKey);
      this.rerenderElement();
    };
    eventBusUser.off("User:language", setLanguage);
    eventBusUser.on("User:language", setLanguage);
  }
  setHandlers() {
    this.element?.addEventListener("click", (event) => {
      event.preventDefault();
      this.events.click(this.state.title);
    });
  }
  get template(): string {
    return createPageHeaderTemplate(this.state);
  }
}
