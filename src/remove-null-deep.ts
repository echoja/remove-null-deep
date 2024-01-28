// /* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */

export type NullRemoved<T> = T extends null
  ? never
  : T extends Array<infer U>
  ? Array<NullRemovedArrayItem<U>>
  : T extends object
  ? { [P in keyof T]: NullRemoved<T[P]> }
  : T;

export type NullRemovedArrayItem<T> = T extends null ? null : NullRemoved<T>;

/**
 * 어떤 객체에서 `null` 을 모두 삭제합니다.
 * GraphQL 의 코드젠을 통해 생성된 타입 중 `InputMaybe` 는
 * `T | null | undefined` 등으로 처리되는데,
 * 이를 `T | undefined` 로 바꿀 때 사용됩니다.
 * 배열에서는 `null` 혹은 `undefined`가 요소라도 삭제하지 않습니다.
 */
export const removeNullDeep = <T extends Record<string, unknown>>(
  obj: T
): NullRemoved<T> => {
  type Item = T[Extract<keyof T, string>];

  if (obj === null || obj === undefined || typeof obj !== "object") {
    throw new Error("Invalid argument");
  }

  const result = {
    ...obj,
  };

  for (const key in result) {
    const value = result[key];

    if (value === null || value === undefined) {
      delete result[key];
      continue;
    }

    if (Array.isArray(value)) {
      result[key] = value.map((item: unknown) => {
        if (item === null || item === undefined || typeof item !== "object") {
          return item;
        }

        return removeNullDeep(item as Record<string, unknown>);
      }) as Item;
      continue;
    }

    if (typeof value === "object") {
      result[key] = removeNullDeep(value as Record<string, unknown>) as Item;
      continue;
    }
  }

  return result as NullRemoved<T>;
};
