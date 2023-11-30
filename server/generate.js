const { faker } = require('@faker-js/faker');
var database = { exercises: []};
for (var i = 1; i<= 10; i++) {
        database.exercises.push({
        id: i,
        name: faker.lorem.slug({ min: 1, max: 3 }),
        description: faker.lorem.slug({ min: 1, max: 3 }),
        icon: faker.image.urlLoremFlickr({ width: number = 100, height: number = 100, randomize: boolean = false ,category: 'sports' }),
        duration: faker.number.int({ min: 1500, max: 15000 })
});
}
console.log(JSON.stringify(database));