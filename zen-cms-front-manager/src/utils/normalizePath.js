export default function normalizaPath(path) {
  const arr = path.split('/');
  const stack = [];
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    if (arr[i] === "" || arr[i] === ".") {
      continue;
    } else if (arr[i] === "..") {
      stack.pop();
    } else {
      stack.push(arr[i]);
    }
  }

  return '/' + stack.join('/');
}