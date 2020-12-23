var fs = require('fs');

const passwordPhilosophy = () => {
  fs.readFile('./input.txt', 'utf8', function(err, data) {
    if(err) throw err;
    const rows = data.split('\n');
    rows.forEach(row => {
      let passwordRegexp = /(?<min>\d*)-(?<max>\d*) (?<letter>\w*): (?<password>\w*)/m;
      let match = passwordRegexp.exec(row);
      console.log(`Min ${match[1]} ${match[3]}, Max ${match[2]}`);
      let password = `${match[4]}`;
      password.split('')
      console.log(`Password: ${match[4]}`);

    });

  });
};

passwordPhilosophy();
