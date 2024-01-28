import { describe, expect, test } from "vitest";
import { removeNullDeep } from "./remove-null-deep";

describe("removeNullDeep", () => {
  test("null 삭제되어야 함", () => {
    const result = removeNullDeep({
      a: 1,
      b: "hello",
      c: null,
      d: [],
    });

    expect(result).toMatchInlineSnapshot(`
      {
        "a": 1,
        "b": "hello",
        "d": [],
      }
    `);
  });

  test("undefined 삭제되어야 함", () => {
    const result = removeNullDeep({
      a: 1,
      b: "hello",
      c: undefined,
      d: [],
    });

    expect(result).toMatchInlineSnapshot(`
      {
        "a": 1,
        "b": "hello",
        "d": [],
      }
    `);
  });

  test("중첩되어 있을 경우 삭제되어야 함", () => {
    const result = removeNullDeep({
      a: { b: { num: 1, c: null } },
      b: [[{ num: 1, c: null }]],
    });

    expect(result).toMatchInlineSnapshot(`
      {
        "a": {
          "b": {
            "num": 1,
          },
        },
        "b": [
          {
            "0": {
              "num": 1,
            },
          },
        ],
      }
    `);
  });

  test("배열의 원소는 삭제되지 않아야 함.", () => {
    const result = removeNullDeep({
      t: [1, null, undefined, 0, null],
    });

    expect(result).toMatchInlineSnapshot(`
      {
        "t": [
          1,
          null,
          undefined,
          0,
          null,
        ],
      }
    `);
  });
});
