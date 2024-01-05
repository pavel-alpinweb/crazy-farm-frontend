/**
 * @jest-environment jsdom
 */

import {ToolComponent} from "./Tool.component";
import {beforeEach} from "@jest/globals";
import {eventBusFarm} from "../../model/farm.model";
import {eventBusAlmanac} from "../../model/almanac.model";

describe("Tool Component:", () => {
    let Tool: ToolComponent;
    let toolElement: Element;

    beforeEach(() => {
        Tool = new ToolComponent({
            tool: {
                name: "shovel",
                price: 0,
                key: 1,
            }
        });

        Tool.emits.setClickEvent((name: Concrete) => {
            return `Click on ${<string>name}`;
        });

        document.body.appendChild(<Element>Tool.element);
        toolElement = <Element>document.body.querySelector(".tool");

    });


    test("doesn't throw error when Tool Component constructed", () => {
        expect(() => {
            new ToolComponent({
                tool: {
                    name: "shovel",
                    price: 0,
                    key: 1,
                }
            });
        }).not.toThrowError();
    });

    test("Tool Component mounted in body successfully", () => {
        expect(toolElement).not.toBeNull();
    });

    test("Tool Component has correct markup", () => {

        expect(toolElement?.classList.contains("tool--shovel")).toBe(true);

        const price = toolElement?.querySelector('.tool__price')?.innerHTML;
        expect(price).toBe("0");

        const key = toolElement?.querySelector('.tool__key')?.innerHTML;
        expect(key).toBe("1");
    });

    test("Tool Component has correct markup after event Farm:set_tool", () => {
        eventBusFarm.emit("Farm:set_tool", "shovel");
        expect(toolElement?.classList.contains("tool--active")).toBe(true);

        eventBusFarm.emit("Farm:set_tool", "empty");
        expect(toolElement?.classList.contains("tool--active")).toBe(false);
    });

    test("Tool Component has correct markup after event Almanac:activate", () => {
        eventBusAlmanac.emit("Almanac:activate", true);
        expect(toolElement?.classList.contains("tool--highlight")).toBe(true);

        eventBusAlmanac.emit("Almanac:activate", false);
        expect(toolElement?.classList.contains("tool--highlight")).toBe(false);
    });

    test("Tool Component has correct markup after event Tutorial:update", () => {
        eventBusAlmanac.emit("Tutorial:update", {
            isActive: true,
            currentStep: 1,
            blockedTools: ["shovel"],
        });
        expect(toolElement?.classList.contains("tool--highlight")).toBe(false);
        expect(toolElement?.classList.contains("tool--active")).toBe(false);
        expect(toolElement?.classList.contains("tool--blocked")).toBe(true);

        eventBusAlmanac.emit("Tutorial:update", {
            isActive: true,
            currentStep: 2,
            blockedTools: ["fertilizer"],
        });

        expect(toolElement?.classList.contains("tool--highlight")).toBe(true);
        expect(toolElement?.classList.contains("tool--blocked")).toBe(false);
    });

    test("Tool Component has correct markup after event Tutorial:end", () => {
        eventBusAlmanac.emit("Tutorial:update", {
            isActive: true,
            currentStep: 1,
            blockedTools: ["shovel"],
        });

        eventBusAlmanac.emit("Tutorial:end");

        expect(toolElement?.classList.contains("tool--highlight")).toBe(false);
        expect(toolElement?.classList.contains("tool--active")).toBe(false);
        expect(toolElement?.classList.contains("tool--blocked")).toBe(false);
    });

    test("Tool Component emit correct name on click", () => {
        const value = Tool.events?.click("shovel");
        expect(value).toBe("Click on shovel");
    });
});