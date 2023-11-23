import { AbstractStaticScreen } from "../framework/interface/AbstractStaticScreen";
import { appContainer } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import { Error404Screen } from "../view/screens/404.screen";
import {AbstractController} from "../framework/AbstractController";
import {AbstractScreen} from "../framework/interface/AbstractScreen";

export default class Error404ScreenController extends AbstractController{
  public methods: Methods = {};
  protected Screen: AbstractScreen | AbstractStaticScreen = new Error404Screen();

  init(): void {
    this.Screen = new Error404Screen();
    appContainer?.insertAdjacentElement(
        AbstractView.positions.BEFOREEND,
        <Element>this.Screen.element
    );
  }
}
