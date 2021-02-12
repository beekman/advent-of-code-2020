const fs = require('fs');

const lines = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n\n').filter(x => x);

const rules = {};

lines[0].split('\n').forEach((rule) => {
    const { groups } = /^(?<key>\d+): (?<value>.*)$/.exec(rule);
    rules[groups.key] = groups.value;
});

const messages = lines[1].split('\n');

let regexFromRules = {};

function computeRules(value, rules) {
    if(value in regexFromRules) {
        return regexFromRules[value];
    }
    let result = '';
    if(/^".*"$/.test(value)) {
        result = value.replace(/"/g, '');
    } else if(/\|/.test(value)) {
        const options = value.split(' | ');
        result = `(${computeRules(options[0], rules)}|${computeRules(options[1], rules)})`;
    } else {
        const keys = value.split(' ');
        result = keys.map(key => computeRules(rules[key], rules)).join('');
    }
    regexFromRules[value] = result;
    return result;
}

computeRules(rules[0], rules);

const mainRule = new RegExp('^' + regexFromRules[rules[0]] + '$');

let sum = 0;
for(const message of messages) {
    if(mainRule.test(message)) {
        sum++;
    }
}
console.log(sum);
