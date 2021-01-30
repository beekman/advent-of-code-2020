const fs = require('fs');

const lines = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n\n').filter(x => x);

const rules = lines[0].split('\n').filter(x => x).map(rule => {
  const regex = /(?<field>[^:]+): (?<min1>\d+)-(?<max1>\d+) or (?<min2>\d+)-(?<max2>\d+)/;
  const { groups } = regex.exec(rule);
  groups.min1 = Number(groups.min1);
  groups.max1 = Number(groups.max1);
  groups.min2 = Number(groups.min2);
  groups.max2 = Number(groups.max2);
  return groups;
});

const matchesRule = (rule, value) => {
  return (value >= rule.min1 && value <= rule.max1) || (value >= rule.min2 && value <= rule.max2);
};

const matchesAtLeastOneRule = (value) => {
  for(const rule of rules) {
    if(matchesRule(rule, value)) {
      return (matchesRule(rule, value));
    }
  }
  return false;
};

const myTicket = lines[1].split('\n').filter(x => x)[1].split(',').map(x => Number(x));

let ticketsNearMe = lines[2].split('\n').filter(x => x);
ticketsNearMe.shift();
ticketsNearMe = ticketsNearMe.map(ticket => ticket.split(',').map(x => Number(x)));

let validTickets = [myTicket];
let sum = 0;

for(const ticket of ticketsNearMe) {
  let validTicket = true;
  for(const value of ticket) {
    if(!matchesAtLeastOneRule(value)) {
      sum += value;
      validTicket = false;
    }
  }
  if(validTicket) {
    validTickets.push(ticket);
  }
}

console.log(`Part One: ${sum}`);

let matches = [];

for(let i = 0; i < myTicket.length; i++) {
  for(const rule of rules) {
    let valid = true;
    for(const ticket of validTickets) {
      if(!matchesRule(rule, ticket[i])) {
        valid = false;
        break;
      }
    }
    if(valid) {
      matches.push({ rule: rule.field, index: i });
    }
  }
}

while(matches.length > rules.length) {
  for(let i = 0; i < myTicket.length; i++) {
    const rulesMatchingCurrentIndex = matches.filter(m => m.index == i);

    if(rulesMatchingCurrentIndex.length == 1) {
      const currentRule = rulesMatchingCurrentIndex[0];
      matches = matches.filter(m => {
        if(m.rule === currentRule.rule) {
          return m.index === currentRule.index;
        }
        return true;
      });
    }
  }
}

const departureFields = matches.filter(m => m.rule.startsWith('departure'));

let result = 1;

for(const field of departureFields) {
  result *= myTicket[field.index];
}

console.log(`Part Two: ${result}`);
