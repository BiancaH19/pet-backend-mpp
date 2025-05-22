const { faker } = require('@faker-js/faker');
const sequelize = require('./config/database');
const User = require('./models/user');
const Pet = require('./models/pet');

const NUM_USERS = 100002;
const NUM_PETS = 100002;

async function populate() {
  try {
    await sequelize.sync({ force: true }); 

    console.log('Populating Users...');
    const users = [];
    for (let i = 0; i < NUM_USERS; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number('07########'),
        city: faker.location.city(),
        age: faker.number.int({ min: 18, max: 100 }),
      });
    }
    const createdUsers = await User.bulkCreate(users, { returning: true });
    console.log(`Inserted ${createdUsers.length} users.`);

    console.log('Populating Pets...');
    const pets = [];
    for (let i = 0; i < NUM_PETS; i++) {
      const owner = faker.number.int({ min: 0, max: createdUsers.length - 1 });
      const animalNames = [
        'Bella', 'Max', 'Luna', 'Charlie', 'Milo', 'Rocky', 'Simba', 'Daisy', 'Toby', 'Nala',
        'Maggie', 'Willow', 'Lucy', 'Bailey', 'Rosie', 'Sadie', 'Lola',
        'Cooper', 'Teddy', 'Ollie', 'Bear', 'Finn', 'Leo',
        'Ralph', 'Oscar', 'George', 'Tigger', 'Alfie', 'Jasper', 'Tiger', 'Bob', 'Casper'
      ];
      pets.push({
        name: faker.helpers.arrayElement(animalNames),
        species: faker.helpers.arrayElement(['Dog', 'Cat']),
        age: faker.number.int({ min: 1, max: 30 }),
        status: faker.helpers.arrayElement(['Available', 'Adopted']),
        image: faker.image.url(),
        userId: createdUsers[owner].id,
      });
    }
    await Pet.bulkCreate(pets);
    console.log(`Inserted ${pets.length} pets.`);

    console.log('Data population complete.');
  } catch (error) {
    console.error('Error populating data:', error);
  } finally {
    await sequelize.close();
  }
}

populate();

//node populateData.js