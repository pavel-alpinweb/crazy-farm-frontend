import { AbstractView } from "../../framework/interface/AbstractView";

interface Props {
  title: string;
}
interface State {
  isLoading: boolean;
  isDisabled: boolean;
  title: Props["title"];
}

const createButtonTemplate = (state: State) => `
<button type="button" ${state.isDisabled || state.isLoading ? "disabled" : ""}>
    ${state.isLoading ? "Loading..." : state.title}
</button>
`;

export class ButtonComponent extends AbstractView {
  protected state: State = {
    isLoading: false,
    isDisabled: false,
    title: "Отправить",
  };
  constructor(props: Props) {
    super();
    this.setState(props);
    this.emits.setClickEvent = (callback: (data: string) => void) => {
      this.events.click = callback;
    }
  }
  protected setState(props: Props) {
    this.state.title = props.title;
  }
  setHandlers() {
    this.element?.addEventListener('click', (event) => {
      event.preventDefault();
      this.events.click('Click button!');
    });
  }
  get template(): string {
    return createButtonTemplate(this.state);
  }
}
