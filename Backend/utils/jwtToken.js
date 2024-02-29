export const sendToken = (user, statusCode, message, res) => {
    const token = user.getJWTToken();
    const options = {
      expires: new Date(
        Date.now() + parseInt(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000 // Parse COOKIE_EXPIRE as an integer
      ),
      httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      message,
      token,
    });
  };
  