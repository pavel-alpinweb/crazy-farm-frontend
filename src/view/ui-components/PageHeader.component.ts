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
    this.state = props;
  }
  setHandlers() {
    console.log('Implement setHandlers: renderedElement', this.element);
    this.renderedElement?.addEventListener('click', (event) => {
      event.stopPropagation();
      console.log('Click!');
    });
  }
  get template(): string {
    return createPageHeaderTemplate(this.state);
  }
}
