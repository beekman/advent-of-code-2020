const fs = require('fs');

const lines = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n\n').filter(x => x);

const rules = lines[0].split('\n').filter(x => x).map(rule => {
  const rx = /(?<field>[^:]+): (?<min1>\d+)-(?<max1>\d+) or (?<min2>\d+)-(?<max2>\d+)/;
  const { groups } = rx.exec(rule);
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
  for (const rule of rules) {
    if (matchesRule(rule, value)) {
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
for (const ticket of ticketsNearMe) {
  let validTicket = true;
  for (const value of ticket) {
    if (!matchesAtLeastOneRule(value)) {
      sum += value;
      validTicket = false;
    }
  }
  if (validTicket) {
    validTickets.push(ticket);
  }
}

console.log(`Part One: ${sum}`);
