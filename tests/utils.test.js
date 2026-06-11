import {
    describe,
    it,
    expect
} from "vitest";

import { getCurrentTime } from "../src/utils.js";

/* =========================
   UTILS TESTS
========================= */

describe("getCurrentTime", () => {

    it("debe devolver un string", () => {

        const result = getCurrentTime();

        expect(typeof result)
            .toBe("string");

    });

    it("no debe devolver un string vacío", () => {

        const result = getCurrentTime();

        expect(result.length)
            .toBeGreaterThan(0);

    });

});