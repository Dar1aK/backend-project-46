const ACTIONS = {
  added: "added",
  removed: "removed",
  updated: "updated",
};

const printValue = (value) => {
  if (value === null) {
    return "null";
  }
  if (typeof value === "object") {
    return "[complex value]";
  }
  if (typeof value === "string") {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  let result = "";
  const iter = (value, string, actionObject) => {
    if (actionObject.action === ACTIONS.added) {
      result += `Property '${string}' was added with value: ${printValue(actionObject.newValue)}\n`;
    } else if (actionObject.action === ACTIONS.removed) {
      result += `Property '${string}' was removed\n`;
    } else if (actionObject.action === ACTIONS.updated) {
      result += `Property '${string}' was updated. From ${printValue(actionObject.oldValue)} to ${printValue(actionObject.newValue)}\n`;
    }

    if (!value || typeof value !== "object") {
      return;
    }

    const resultArray = Object.entries(value).map(([key, val], i, arr) => {
      const isStartsWithSign = key.startsWith("+") || key.startsWith("-");
      const arrKeys = key.split(" ");
      const newKey = (() => {
        const compareWithSign = arrKeys[1];
        const defaultValue = key;
        return (
          (string ? "." : "") +
          (isStartsWithSign ? compareWithSign : defaultValue)
        );
      })();
      const action = (() => {
        if (
          arr[i + 1]?.[0].split(" ")[1] &&
          arr[i + 1][0].split(" ")[1] === arrKeys[1]
        ) {
          return {
            action: ACTIONS.updated,
            newValue: arr[i + 1]?.[1],
            oldValue: val,
          };
        }
        if (
          arrKeys[0] === "+" &&
          arr[i - 1]?.[0].split(" ")[1] !== arrKeys[1]
        ) {
          return {
            action: ACTIONS.added,
            newValue: val,
          };
        }
        if (arrKeys[0] === "-") {
          return {
            action: ACTIONS.removed,
          };
        }
        return {};
      })();

      return iter(val, `${string}${newKey}`, action);
    });
  };

  iter(tree, "", {});

  console.log(result);
  return result;
};
export default plain;
