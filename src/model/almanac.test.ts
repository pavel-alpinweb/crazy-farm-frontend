import { AlmanacModel } from "./almanac.model";
import { beforeEach } from "@jest/globals";
import { tutorialState } from "../mock/tutorial.mock";

describe("Almanac Model:", () => {
  let almanac: AlmanacModel;

  beforeEach(() => {
    almanac = new AlmanacModel();
  });

  test("doesn't throw error when Almanac Model constructed", () => {
    expect(() => {
      new AlmanacModel();
    }).not.toThrowError();
  });

  test("method: setTutorialState", () => {
    almanac.setTutorialState({
      isActive: true,
      currentStep: 1,
      blockedTools: ["shovel", "bailer"],
    });

    expect(almanac.tutorial).toEqual({
      isActive: true,
      currentStep: 1,
      blockedTools: ["shovel", "bailer"],
    });

    expect(almanac.state).toEqual({
      isShow: true,
      isActive: false,
      currentTextKey: "tutorial.1",
      currentActions: ["close"],
    });
  });

  test("method: toggleAlmanac", () => {
    // set tutorial
    almanac.setTutorialState({
      isActive: tutorialState[1].isActive,
      currentStep: 1,
      blockedTools: tutorialState[1].blockedTools,
    });

    // close almanac modal
    almanac.toggleAlmanac();

    // open almanac modal
    almanac.toggleAlmanac();

    expect(almanac.state).toEqual({
      isActive: false,
      isShow: true,
      currentTextKey: "tutorial.1",
      currentActions: ["close"],
    });

    // set tutorial
    almanac.setTutorialState({
      isActive: false,
      currentStep: 7,
      blockedTools: [],
    });

    // close almanac modal
    almanac.toggleAlmanac();

    // open almanac modal
    almanac.toggleAlmanac();

    expect(almanac.state).toEqual({
      isActive: false,
      isShow: true,
      currentTextKey: "almanacDefault",
      currentActions: ["show", "close"],
    });
  });

  test("method: showExitMessage", () => {
    almanac.showExitMessage();
    expect(almanac.state).toEqual({
      isActive: false,
      isShow: true,
      currentTextKey: "exit",
      currentActions: ["exit", "no-close"],
    });
  });

  test("method: showRestartMessage", () => {
    almanac.showRestartMessage();
    expect(almanac.state).toEqual({
      isActive: false,
      isShow: true,
      currentTextKey: "restart",
      currentActions: ["restart", "no-close"],
    });
  });

  test("method: activateAlmanac", () => {
      // open almanac modal
      almanac.toggleAlmanac();

      almanac.activateAlmanac();

      expect(almanac.state).toEqual({
          isActive: true,
          isShow: false,
          currentTextKey: "almanacDefault",
          currentActions: ["show", "close"],
      });
  });

  test("method: deactivateAlmanac", () => {
      almanac.setAlmanacState({
          isActive: true,
          isShow: false,
          currentTextKey: "almanacDefault",
          currentActions: ["show", "close"],
      });

      almanac.deactivateAlmanac();

      expect(almanac.state).toEqual({
          isActive: false,
          isShow: false,
          currentTextKey: "",
          currentActions: [],
      });
  });

  test("method: setAlmanacDataForCharacter", () => {
      // open almanac modal
      almanac.toggleAlmanac();

      almanac.activateAlmanac();

      almanac.setAlmanacDataForCharacter(tutorialState[2].cell);

      expect(almanac.state).toEqual({
          isActive: false,
          isShow: true,
          currentTextKey: "character.potato.0",
          currentActions: ["show", "close"],
      });

      almanac.activateAlmanac();

      almanac.setAlmanacDataForCharacter(tutorialState[0].cell);

      expect(almanac.state).toEqual({
          isActive: false,
          isShow: true,
          currentTextKey: "character.empty",
          currentActions: ["show", "close"],
      });
  });

  test("method: setAlmanacDataForTools", () => {
      // open almanac modal
      almanac.toggleAlmanac();

      almanac.activateAlmanac();

      almanac.setAlmanacDataForTools('shovel');

      expect(almanac.state).toEqual({
          isActive: false,
          isShow: true,
          currentTextKey: "tools.shovel",
          currentActions: ["show", "close"],
      });
  });
});
