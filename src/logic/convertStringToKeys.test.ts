import { convertStringToArray } from "./convertStringToKeys";

describe("convertStringToArray", () => {
  it("should convert string into array of keys", () => {
    expect(convertStringToArray("nested.uncontrolled.test")).toEqual([
      "nested",
      "uncontrolled",
      "test",
    ]);

    expect(convertStringToArray("nested.controlled[0].test")).toEqual([
      "nested",
      "controlled",
      0,
      "test",
    ]);
  });
});
