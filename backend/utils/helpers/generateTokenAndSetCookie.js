import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECERET, { expiresIn: "17d" });

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 17 * 24 * 60 * 60 * 1000,
        samesize: "strict",
    });

    return token;
};

export default generateTokenAndSetCookie;