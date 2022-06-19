const bcrypt = require("bcrypt");
const client = require("../configs/database");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const data = await client.query(`SELECT * FROM users WHERE username= $1;`, [username]) //Verifying if the user exists in the database
        const user = data.rows;
        if (user.length === 0) {
            res.status(400).json({
                error: "User is not registered",
            });
        }
        else {
            bcrypt.compare(password, user[0].password, (err, result) => { //Comparing the hashed password
                if (err) {
                    res.status(500).json({
                        error: "Server error",
                    });
                } else if (result === true) { //Checking if credentials match
                    console.log("user --------------------", user);
                    const token = jwt.sign(
                        {
                            username: username,
                            role: user[0].role

                        },
                        process.env.SECRET_KEY
                    );
                    res.status(200).json({
                        message: "signin successful",
                        token: token,
                    });
                }
                else {
                    //Declaring the errors
                    if (result != true)
                        res.status(400).json({
                            error: "Enter correct password!",
                        });
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in!",
        });
    };
};