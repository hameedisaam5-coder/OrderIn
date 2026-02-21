const fs = require('fs');
const file = 'src/services/mockData.ts';
let data = fs.readFileSync(file, 'utf8');

// Fix Meals
data = data.replace(/1529193591184-b1d580690dd0/g, '1509722747741-090ed30b7c72'); // Gyro/BBQ -> Sub
data = data.replace(/1596568359553-a56de6970068/g, '1512621776951-a57141f2eefd'); // Nike Shoe -> Salad

// Fix Kitchens dynamically mapped to their first meal
data = data.replace(/imageUrl: 'https:\/\/images\.unsplash\.com[^']+'/g, (match, offset, str) => {
    // Look ahead to find the menu: [meals[X]]
    const substr = str.substring(offset, offset + 200);
    const m1 = substr.match(/menu: \[meals\[(\d+)\]\]/);
    if (m1) return 'imageUrl: meals[' + m1[1] + '].image';

    const m2 = substr.match(/menu: \[meals\[(\d+)\],/);
    if (m2) return 'imageUrl: meals[' + m2[1] + '].image';

    return match;
});

fs.writeFileSync(file, data);
console.log('Fixed mockData.ts');
