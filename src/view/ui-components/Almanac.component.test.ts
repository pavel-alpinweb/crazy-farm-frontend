/**
 * @jest-environment jsdom
 */

import { AlmanacComponent } from "./Almanac.component";
import { beforeEach, expect } from "@jest/globals";
import i18next from "i18next";
import en from "../../localization/en.json";
import ru from "../../localization/ru.json";
import { eventBusAlmanac } from "../../model/almanac.model";
import { eventBusUser } from "../../model/user.model";

describe("Almanac Component:", () => {
  let Almanac: AlmanacComponent;
  let almanacElement: Element;

  beforeEach(async () => {
    await i18next.init({
      lng: "en",
      debug: false,
      resources: {
        en: {
          translation: en,
        },
        ru: {
          translation: ru,
        },
      },
    });

    Almanac = new AlmanacComponent({
      isActive: false,
      isShow: false,
      currentTextKey: "almanacDefault",
      currentActions: ["show", "close"],
    });

    Almanac.emits.setUnderstandClickEvent(() => {
      return "Click on data-action-close";
    });

    Almanac.emits.setActivateClickEvent(() => {
      return "Click on data-action-show";
    });

    Almanac.emits.setExitClickEvent(() => {
      return "Click on data-action-exit";
    });

    Almanac.emits.setRestartClickEvent(() => {
      return "Click on data-action-restart";
    });

    document.body.appendChild(<Element>Almanac.element);
    almanacElement = <Element>document.body.querySelector(".almanac");
  });

  test("doesn't throw error when Almanac Component constructed", () => {
    expect(() => {
      new AlmanacComponent({
        isActive: false,
        isShow: false,
        currentTextKey: "almanacDefault",
        currentActions: ["show", "close"],
      });
    }).not.toThrowError();
  });

  test("Almanac Component mounted in body successfully", () => {
    expect(almanacElement).not.toBeNull();
  });

  test("Almanac Component has correct markup", () => {
    const text = almanacElement?.querySelector(".almanac__text")?.innerHTML;
    expect(text).toBe("Hello! What can I help you with?");

    const showButton = almanacElement?.querySelector("[data-action-show]");
    const closeButton = almanacElement?.querySelector("[data-action-close]");

    expect(showButton).not.toBeNull();
    expect(closeButton).not.toBeNull();
  });

  test("Almanac Component has correct markup after event Almanac:toggleView", () => {
    eventBusAlmanac.emit("Almanac:toggleView", {
      isActive: false,
      isShow: true,
      currentTextKey: "character.potato.1",
      currentActions: ["restart", "no-close"],
    });

    expect(almanacElement.classList.contains("active")).toBe(true);

    const text = almanacElement?.querySelector(".almanac__text")?.innerHTML;
    expect(text).toBe(
      "A sprout of singing potatoes. Keep taking care of it, and your potato will burst into song. Resist the urge to unearth it now, for I do not pay for the sprouts. <br><br>Anything else you'd like to know?"
    );

    const showButton = almanacElement?.querySelector("[data-action-show]");
    const closeButton = almanacElement?.querySelector("[data-action-close]");
    const noButton = almanacElement?.querySelector("[data-action-no-close]");
    const restartButton = almanacElement?.querySelector(
      "[data-action-restart]"
    );

    expect(showButton).toBeNull();
    expect(closeButton).toBeNull();
    expect(noButton).not.toBeNull();
    expect(restartButton).not.toBeNull();
  });

  test("Almanac Component has correct language after event User:language", async () => {
    await i18next.changeLanguage("ru");
    eventBusUser.emit("User:language", "ru");

    const text = almanacElement?.querySelector(".almanac__text")?.innerHTML;
    expect(text).toBe("Привет, что тебе подсказать?");
  });

  test("Almanac Component emit correct action on btns click", () => {
    expect(Almanac.events?.clickUnderstand(false)).toBe(
      "Click on data-action-close"
    );
    expect(Almanac.events?.clickActivate(false)).toBe(
      "Click on data-action-show"
    );
    expect(Almanac.events?.clickExit(false)).toBe(
      "Click on data-action-exit"
    );
    expect(Almanac.events?.clickRestart(false)).toBe(
      "Click on data-action-restart"
    );
  });
});
