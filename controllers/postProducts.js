const { access } = require("fs");
const jwt = require("jsonwebtoken");

const accessRoles = [1, 2];

exports.postProducts = async (req, res) => {
    const token = req.headers.token;
    const token_data = jwt.verify(token, process.env.SECRET_KEY, (err, token_data) => {
        console.log('token_data', token_data);
        if (err) {
            res.status(401).send("Not authorized to access endpoint");
        }
        else {
            if (token_data.role != null && accessRoles.indexOf(token_data.role) != -1) {
                res.status(201).send("Product added successfully");
            }
            else {
                res.status(401).send("Not authorized to access endpoint");
            }
        }
    });

}