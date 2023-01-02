// const { Pool } = require('pg');

// const pool = new Pool({
//     connectionString: 'postgresql://bocchi_admin:bocchi1q2w3e!@localhost:5432/bocchi_db',
// });
const Database = require("@replit/database")
const db = new Database()

exports.meal = (message) => {
    // pool.query('SELECT name FROM meals', (err, res) => {
    //     if (err) {
    //         throw err;
    //     }
    //     const meals = res.rows;
    //     if (meals.length === 0) {
    //         message.channel.send(`There is no meal in list!`);
    //         return;
    //     }
    //     const meal = meals[Math.floor(Math.random() * meals.length)].name;
    //     message.channel.send(`How about ${meal}?`);
    // })
    db.list().then(meals => {
        if (meals.length === 0) {
            message.channel.send(`There is no meal in list!`);
            return;
        }
        const meal = meals[Math.floor(Math.random() * meals.length)];
        message.channel.send(`${meal}食べろ`);
    });
}

exports.addMeal = (message, args) => {
    // const meal = args.join(' ');
    // if (meal === '') { return; }
    // pool.query(`SELECT name FROM meals WHERE name = '${meal}'`, (err, res) => {
    //     if (err) {
    //         throw err;
    //     }
    //     if (res.rows.length === 0) {
    //         pool.query(`INSERT INTO meals (name) VALUES ('${meal}') ON CONFLICT (name) DO NOTHING`, (err, res) => {
    //             if (err) {
    //                 throw err;
    //             }
    //             message.channel.send(`${meal} has been added to meal list!`);
    //         })
    //         return;
    //     }
    //     message.channel.send(`${meal} already exists!`);
    // })
    const meal = args.join(' ');
    if (meal === '') { return; }

    db.get(meal).then(value => {
        if (value !== null) {
            message.channel.send(`${meal} already exists!`);
            return;
        }
        db.set(meal, meal).then(() => {
            message.channel.send(`${meal} has been added to meal list!`);
            return;
        });
    });
}

exports.removeMeal = (message, args) => {
    // const meal = args.join(' ');
    // if (meal === '') { return; }
    // pool.query(`DELETE FROM meals WHERE name = '${meal}'`, (err, res) => {
    //     if (err) {
    //         throw err;
    //     }
    //     message.channel.send(`${meal} has been removed from meal list!`);
    // })
    const meal = args.join(' ');
    db.delete(meal).then(() => {
        message.channel.send(`${meal} has been removed from meal list!`);
    });
}

exports.mealList = (message) => {
    // let mealString = ``;
    // pool.query(`SELECT name FROM meals`, (err, res) => {
    //     if (err) {
    //         throw err;
    //     }
    //     for (const meal of res.rows) {
    //         mealString += `:white_small_square: ${meal.name}\n`
    //     }
    //     message.channel.send(`Current meal list is shown below.\n${mealString}`);
    // })
    let mealString = ``;
    db.list().then(keys => {
        for (const meal of keys) {
            mealString += `:white_small_square: ${meal}\n`
        }
        message.channel.send(`Current meal list is shown below.\n${mealString}`);
    });
}
