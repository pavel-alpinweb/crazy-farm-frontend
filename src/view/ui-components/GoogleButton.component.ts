import { AbstractView } from "../../framework/interface/AbstractView";
import Cookies from "js-cookie";

interface Props {
  size: string;
  theme: string;
}

interface State {
  size: Props["size"];
  theme: Props["size"];
  clientId: string;
}

const createGoogleButtonTemplate = () => `
    <div id="buttonDiv"></div>
`;

export class GoogleButtonComponent extends AbstractView {
  protected state: State = {
    size: "large",
    theme: "outline",
    clientId: <string>process.env.GOOGLE_CLIENT_ID,
  };

  constructor(props: Props) {
    super();
    this.setState(props);
    this.setEvents();
  }

  protected setEvents(): void {
    this.emits.setCredentialResponseEvent = (
      callback: (data: Concrete) => void
    ) => {
      this.events.credentailResponseHandler = callback;
    };
  }
  setHandlers() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (typeof google !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      google?.accounts?.id?.initialize({
        client_id: this.state.clientId,
        callback: (response: Concrete) => {
          if (this.events.credentailResponseHandler) {
            this.events.credentailResponseHandler(response);
          }
        },
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      google.accounts.id.renderButton(this.element, {
        theme: this.state.theme,
        size: this.state.size,
        width: 230,
        height: 45,
        locale: Cookies.get("crazy-farm-lang") ?? "en",
      });
    }
  }

  protected setState(props: Props): void {
    this.state.size = props.size;
    this.state.theme = props.theme;
  }

  get template(): string {
    return createGoogleButtonTemplate();
  }
}
