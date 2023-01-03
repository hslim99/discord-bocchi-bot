const { pool } = require('./index');

exports.meal = (message) => {
  pool.query('SELECT name FROM meals', (err, res) => {
    if (err) {
      throw err;
    }
    const meals = res.rows;
    if (meals.length === 0) {
      message.channel.send(`There is no meal in list!`);
      return;
    }
    const meal = meals[Math.floor(Math.random() * meals.length)].name;
    message.channel.send(`How about ${meal}?`);
  });
};

exports.addMeal = (message, args) => {
  const meal = args.join(' ');
  if (meal === '') {
    return;
  }
  pool.query(
    `SELECT name
                FROM meals
                WHERE name = '${meal}'`,
    (err, res) => {
      if (err) {
        throw err;
      }
      if (res.rows.length === 0) {
        pool.query(
          `INSERT INTO meals (name)
                        VALUES ('${meal}') ON CONFLICT (name) DO NOTHING`,
          (err, res) => {
            if (err) {
              throw err;
            }
            message.channel.send(`${meal} has been added to meal list!`);
          },
        );
        return;
      }
      message.channel.send(`${meal} already exists!`);
    },
  );
};

exports.removeMeal = (message, args) => {
  const meal = args.join(' ');
  if (meal === '') {
    return;
  }
  pool.query(
    `DELETE
                FROM meals
                WHERE name = '${meal}'`,
    (err, res) => {
      if (err) {
        throw err;
      }
      message.channel.send(`${meal} has been removed from meal list!`);
    },
  );
};

exports.mealList = (message) => {
  let mealString = ``;
  pool.query(
    `SELECT name
                FROM meals`,
    (err, res) => {
      if (err) {
        throw err;
      }
      for (const meal of res.rows) {
        mealString += `:white_small_square: ${meal.name}\n`;
      }
      message.channel.send(`Current meal list is shown below.\n${mealString}`);
    },
  );
};
