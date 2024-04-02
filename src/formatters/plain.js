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

const getAction = (arr, i, arrKeys, val) => {
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
  if (arrKeys[0] === "+" && arr[i - 1]?.[0].split(" ")[1] !== arrKeys[1]) {
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
};

const combineLine = (actionObject, string) => {
  if (actionObject.action === ACTIONS.added) {
    return `\nProperty '${string}' was added with value: ${printValue(actionObject.newValue)}`;
  }
  if (actionObject.action === ACTIONS.removed) {
    return `\nProperty '${string}' was removed`;
  }
  if (actionObject.action === ACTIONS.updated) {
    return `\nProperty '${string}' was updated. From ${printValue(actionObject.oldValue)} to ${printValue(actionObject.newValue)}`;
  }
  return "";
};

const plain = (tree) => {
  let result = "";
  const iter = (value, string, actionObject) => {
    result = `${result}${combineLine(actionObject, string)}`;
    if (!value || typeof value !== "object") {
      return;
    }

    Object.entries(value).forEach(([key, val], i, arr) => {
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
      const action = getAction(arr, i, arrKeys, val);

      return iter(val, `${string}${newKey}`, action);
    });
  };

  iter(tree, "", {});

  console.log(result);
  return result.slice(1);
};
export default plain;
