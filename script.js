const p = document.getElementById('p');

p.innerHTML = '777';

const fs = require('fs');

fs.readFile('text.txt', 'utf-8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(data);
});
    p.innerHTML = data;

