const bcrypt = require("bcrypt");

const client = require("../configs/database");

const jwt = require("jsonwebtoken");
const { use } = require("../routes/user");

//Registration Function
exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const data = await client.query(`SELECT * FROM users WHERE username= $1;`, [username]);
        const arr = data.rows;
        if (arr.length != 0) {
            return res.status(400).json({
                error: "username already there.",
            });
        }
        else {
            const roles = await client.query(`SELECT * FROM roles WHERE role= $1;`, [role]);
            console.log('roles', roles);
            const roleId = roles.rows[0].role_id;
            bcrypt.hash(password, 10, (err, hash) => {
                if (err)
                    res.status(err).json({
                        error: "Server error",
                    });
                const user = {
                    username,
                    role: roleId,
                    password: hash,
                };
                var flag = 1;
                //Insert data to the database

                client
                    .query(`INSERT INTO users (username, password, role) VALUES ($1,$2,$3);`, [user.username, user.password, user.role], (err) => {

                        if (err) {
                            flag = 0;
                            console.error(err);
                            return res.status(500).json({
                                error: "Database error"
                            })
                        }
                        else {
                            flag = 1;
                            res.status(200).send({ message: 'User added' });
                        }
                    })
                if (flag) {
                    console.log("user --------------------", user);
                    const token = jwt.sign(
                        {
                            username: user.username,
                            role: user.role
                        },
                        process.env.SECRET_KEY
                    );
                };
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user!", //Database connection error
        });
    };
}