export function convertStringToArray(input: string) {
  let stringBucket = "";
  const stringAsArray = [];

  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i);

    if (char === ".") {
      stringAsArray.push(stringBucket.slice(stringAsArray.length ? 1 : 0));
      stringBucket = "";
    } else if (char === "[") {
      stringAsArray.push(stringBucket.slice(1));
      stringBucket = "";
    } else if (input.length - 1 === i) {
      stringAsArray.push(stringBucket.slice(1) + char);
    }

    stringBucket += char;
  }

  return stringAsArray.map((name) => {
    return /\[*\]/.test(name) ? Number(name.slice(1, -1)) : name;
  });
}
