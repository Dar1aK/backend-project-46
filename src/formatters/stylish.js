const stylish = (tree, replacer = " ", spacesCount = 4) => {
  const iter = (value, depth) => {
    if (!value || typeof value !== "object") {
      return `${value}`;
    }

    const result =
      "{\n" +
      Object.entries(value).reduce((acc, [key, val]) => {
        const signWidth = key.startsWith("-") || key.startsWith("+") ? 2 : 0;

        return (
          acc +
          replacer.repeat(spacesCount * (depth + 1) - signWidth) +
          `${key}: ${iter(val, depth + 1)}\n`
        );
      }, "") +
      `${replacer.repeat(spacesCount * depth)}}`;

    return result;
  };

  const iterResult = iter(tree, 0);

  iterResult.split("\n").forEach((element) => console.log(element));

  return iterResult;
};

export default stylish;
