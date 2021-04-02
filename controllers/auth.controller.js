const User = require('../models/user.model');

const AuthController = () => {
    this.signup = (req, res) => {
        try {
            let user = new User();

            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;

            user.save()
                .then(function () {
                    return res.json({ user: user.toAuthJSON() });
                })
                .catch(function (error) {
                    return res.status(400).json(error);
                });
        } catch (error) {
            return res.status(400).json(error);
        }
    };

    this.login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findByCredentials(email, password);

            if (!user) {
                return res.status(401).send({
                    error: 'Login failed! Check authentication credentials',
                });
            }

            res.send({ user: user.toAuthJSON() });
        } catch (error) {
            res.status(400).send({ error: 'Login failed' });
        }
    };

    this.logout = async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token;
            });

            await req.user.save();
            res.send({ message: 'Logout Done!' });
        } catch (error) {
            res.status(500).send(error);
        }
    };

    this.logoutAll = async (req, res) => {
        try {
            req.user.tokens.splice(0, req.user.tokens.length);
            await req.user.save();
            res.send({ message: 'Logout Done!' });
        } catch (error) {
            res.status(500).send(error);
        }
    };

    return this;
};

module.exports = AuthController();
