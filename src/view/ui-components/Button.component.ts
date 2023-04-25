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
  private methods = {
    clickHandler: () => {
      console.log('click', this.state);
    },
  }
  constructor(props: Props) {
    super();
    this.state.title = props.title;
  }
  setHandlers() {
    console.log('Implement setHandlers: renderedElement', this.element);
    this.renderedElement?.addEventListener('click', (event) => {
      event.stopPropagation();
      console.log('Click!');
    });
  }
  get template(): string {
    return createButtonTemplate(this.state);
  }
}
