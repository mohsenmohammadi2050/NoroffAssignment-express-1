var express = require("express");
var router = express.Router();
var axios = require("axios");
var isAdminLoggedIn = require("../../middlewares/auth/isAdminLoggedIn")

router.get("/", isAdminLoggedIn, async function (req, res) {
    const user = req.user;
    let errorMessage;
    let memberships;
    const token = req.cookies?.adminToken

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get("http://localhost:3000/memberships/", config)
        if (response.status === "error") {
            errorMessage = "Error from server! try later on";
        }else {
            memberships = response.data.data.result;
        }
        res.render("memberships", { memberships: memberships, error: errorMessage, user: user});

    } catch (error) {
        errorMessage = "Error from server! try later on";
        res.render("memberships", { memberships: memberships, error: errorMessage, user: user});
    }
});

module.exports = router;