import { AbstractView } from "../../framework/interface/AbstractView";

interface Props {
  title: string;
}

interface State {
  title: Props["title"];
}

const createPageHeaderTemplate = (state: State) => `
<div class="page-header">
    <h1>${state.title}</h1>
</div>
`;

export class PageHeaderComponent extends AbstractView {
  protected state: State = {
    title: "",
  };
  constructor(props: Props) {
    super();
    this.setState(props);
    this.setEvents();
  }
  protected setState(props: Props) {
    this.state = props;
  }
  protected setEvents(): void {
    this.emits.setClickEvent = (callback: (data: Concrete) => void) => {
      this.events.click = callback;
    };
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
