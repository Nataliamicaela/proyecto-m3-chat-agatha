import { describe, it, expect } from "vitest";
import { character } from "../src/chat.js";

describe("character", () => {

    it("debe llamarse Agatha Harkness", () => {

        expect(character.name)
            .toBe("Agatha Harkness");

    });

    it("debe tener una descripción", () => {

        expect(character.description.length)
            .toBeGreaterThan(0);

    });

});