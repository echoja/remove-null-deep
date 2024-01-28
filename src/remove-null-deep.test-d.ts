import { expectTypeOf, test } from "vitest";
import { removeNullDeep } from "./remove-null-deep";

test("멤버가 없어져야 함", () => {
  expectTypeOf(
    removeNullDeep({
      a: 1,
      b: "hello",
      c: null,
      d: [2, 3],
      e: undefined,
    })
  ).toMatchTypeOf<{ a: number; b: string; d: number[] }>();
});

test("배열에서의 `null` 과 `undefined`는 그대로 남아있어야 함", () => {
  expectTypeOf(
    removeNullDeep({
      arr: [undefined, null, "abcde"],
      obj: {
        arr: [undefined, null, "abcde"],
      },
    })
  ).toMatchTypeOf<{
    arr: (undefined | null | string)[];
    obj: {
      arr: (undefined | null | string)[];
    };
  }>();
});

test("중첩된 구조에서도 잘 동작해야 함", () => {
  expectTypeOf(
    removeNullDeep({
      arr1: [
        { arr2: [{ a: 1, b: "hello", c: null, d: [2, 3], e: undefined }] },
      ],
    })
  ).toMatchTypeOf<{
    arr1: {
      arr2: {
        a: number;
        b: string;
        d: number[];
      }[];
    }[];
  }>();
});
