const fs = require('fs');
let content = fs.readFileSync('src/data/mockData.ts', 'utf8');

// Add user fields
content = content.replace(/labxPoints: (\d+),/g, (match, p1) => {
  return `${match}\n    rank: Math.floor(Math.random() * 500) + 1,\n    followersCount: Math.floor(Math.random() * 3000),\n    followingCount: Math.floor(Math.random() * 500),\n    connectionsCount: Math.floor(Math.random() * 800),`;
});

// Add project fields
content = content.replace(/contributorCount: (\d+),/g, (match, p1) => {
  return `${match}\n    fundingStatus: 'NOT_STARTED',\n    ownerId: 'u1',`;
});

fs.writeFileSync('src/data/mockData.ts', content);
console.log('Done');
