import { AbstractView } from "../../framework/interface/AbstractView";
import { $t } from "../../utils/helpers";
import { eventBusUser } from "../../model/user.model";

interface Props {
  link: string;
  classes: string;
  translationKey: string;
}

interface State {
  link: Props["link"];
  classes: Props["classes"];
  translationKey: Props["translationKey"];
}

const createLinkButtonComponent = (state: State) => `
    <a class="button ${state.classes}" href="${state.link}">${$t(
  state.translationKey
)}</a>
`;

export class LinkButtonComponent extends AbstractView {
  protected state: State = {
    link: "/#/",
    classes: "",
    translationKey: "",
  };
  constructor(props: Props) {
    super();
    this.setState(props);
    this.setEvents();
  }
  protected setEvents(): void {
    const setLanguage = () => {
      this.rerenderElement();
    };
    eventBusUser.on("User:language", setLanguage);
  }

  protected setState(props: Props): void {
    this.state = props;
  }

  get template(): string {
    return createLinkButtonComponent(this.state);
  }
}
