import { AbstractView } from "../../framework/interface/AbstractView";
import { eventBus } from "../../main";

interface Props {
  user: UserData;
}

interface State {
  user: Props["user"];
}

const createUserInfoTemplate = (state: State) => `
<div class="user-info">
    <h3>Пользователь:</h3>
    <h4>${state.user.login}</h4>
    <h3>Пароль:</h3>
    <h4>${state.user.password}</h4>
    <h3>Email:</h3>
    <h4>${state.user.email}</h4>
</div>
`;

export class UserInfoComponent extends AbstractView {
  protected state: State = {
    user: {
      userId: "",
      login: "",
      password: "",
      email: "",
    },
  };
  constructor(props: Props) {
    super();
    this.setState(props);
    this.setEvents();
  }

  protected setState(props: Props) {
    this.state.user = props.user;
  }

  protected setEvents(): void {
    this.emits.setClickEvent = (callback: (data: Concrete) => void) => {
      this.events.click = callback;
    };
    const updateElement = (data: UserData) => {
      this.state.user = data;
      this.rerenderElement();
    };
    eventBus.on("User:update", updateElement);
  }

  setHandlers() {
    this.element?.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Click UserInfo!", this.state);
    });
  }
  get template(): string {
    return createUserInfoTemplate(this.state);
  }
}
