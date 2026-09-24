const fs = require('fs'); let data = fs.readFileSync('src/data/mockData.ts', 'utf8'); data = data.replace(/rank:\s*\d+,?/g, ''); fs.writeFileSync('src/data/mockData.ts', data);
