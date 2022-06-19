const jwt = require("jsonwebtoken");
const accessRoles = [1, 2, 3, 4];
exports.getProducts = async (req, res) => {
    const token = req.headers.token;
    const token_data = jwt.verify(token, process.env.SECRET_KEY, (err, token_data) => {
        console.log('token_data', token_data);
        if (err) {
            res.status(401).send("Not authorized to access endpoint");
        }
        else {
            if (token_data.role != null && accessRoles.indexOf(token_data.role) != -1) {
                res.status(200).send("Products sent successfully");
            }
            else {
                res.status(401).send("Not authorized to access endpoint");
            }
        }
    });

}