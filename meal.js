const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://bocchi_admin:bocchi1q2w3e!@localhost:5432/bocchi_db',
});

exports.meal = (message) => {
    pool.query('SELECT name FROM meals', (err, res) => {
        if (err) {
            throw err;
        }
        const meals = res.rows;
        const meal = meals[Math.floor(Math.random() * meals.length)].name;
        message.channel.send(`How about ${meal}?`);
    })
}

exports.addMeal = (message, args) => {
    const meal = args.join(' ');
    pool.query(`INSERT INTO meals (name) VALUES ('${meal}')`, (err, res) => {
        if (err) {
            throw err;
        }
        message.channel.send(`${meal} has been added to meal list!`);
    })
}

exports.mealList = (message) => {
    let mealString = ``;
    pool.query(`SELECT name FROM meals`, (err, res) => {
        if (err) {
            throw err;
        }
        for (const meal of res.rows) {
            mealString += `:white_small_square: ${meal.name}\n`
        }
        message.channel.send(`Current meal list is shown below.\n${mealString}`);
    })
}
