import {
    describe,
    it,
    expect
} from "vitest";

import { character } from "../src/chat.js";

/* =========================
   CHARACTER TESTS
========================= */

describe("character", () => {

    it("debe llamarse Agatha Harkness", () => {

        expect(character.name)
            .toBe("Agatha Harkness");

    });

    it("debe tener una descripción", () => {

        expect(character.description.length)
            .toBeGreaterThan(0);

    });

    it("debe tener una personalidad definida", () => {

        expect(character.personality.length)
            .toBeGreaterThan(0);

    });

    it("debe incluir el rasgo inteligente", () => {

        expect(
            character.personality
        ).toContain("inteligente");

    });

});