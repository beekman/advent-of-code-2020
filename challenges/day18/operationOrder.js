const fs = require('fs');
const lines = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').filter(x => x);

const evaluate = (string) => {
  let tokens = string.split(' ');
  while(tokens.length > 1) {
    tokens = [eval(tokens.slice(0, 3).join(''))].concat(tokens.slice(3));
  }
  return tokens[0];
};

const evaluateWithRevisedRules = (string) => {
  while(/\+/.test(string)) {
    string = string.replace(/(\d+) \+ (\d+)/g, (match, firstNumber, secondNumber) => {
      return Number(firstNumber) + Number(secondNumber);
    });
  }
  return eval(string);
};

const evaluateWithParentheses = (string, evaluate) => {
  while(string.includes('(')) {
    string = string.replace(/\(([^()]+)\)/g, (match, group) => {
      return evaluate(group);
    });
  };
  return evaluate(string);
};

let sum = 0;
lines.forEach(line => {
  sum += evaluateWithParentheses(line, evaluate);
});

console.log(sum);

let revisedSum = 0;
lines.forEach(line => {
  revisedSum += evaluateWithParentheses(line, evaluateWithRevisedRules);
});
console.log(revisedSum);
