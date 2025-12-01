// middleware/validate.js
const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, msg: error.details[0].message });
    }
    req.body = value; // overwrite req.body with validated value
    next();
};

module.exports = validate;
