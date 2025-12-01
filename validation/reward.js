const Joi = require("joi");

const createRewardValidation = Joi.object({
    type: Joi.string().valid("visit", "amount").required(),
    visitCount: Joi.number().min(1),
    amountSpend: Joi.number().min(1),
    discountPercent: Joi.number().min(1).max(100).required(),
    isActive: Joi.boolean()
}).custom((data, helper) => {
    // If type = visit → visitCount is required
    if (data.type === "visit" && !data.visitCount) {
        return helper.message("Visit reward must include visitCount");
    }

    // If type = amount → amountSpend is required
    if (data.type === "amount" && !data.amountSpend) {
        return helper.message("Amount reward must include amountSpend");
    }

    return data;
});

const updateRewardValidation = Joi.object({
    type: Joi.string().valid("visit", "amount"),
    visitCount: Joi.number().min(1),
    amountSpend: Joi.number().min(1),
    discountPercent: Joi.number().min(1).max(100),
    isActive: Joi.boolean()
}).custom((data, helper) => {
    // Only check visitCount if type is provided
    if (data.type === "visit" && data.visitCount === undefined) {
        return helper.message("Visit reward must include visitCount when type is 'visit'");
    }

    if (data.type === "amount" && data.amountSpend === undefined) {
        return helper.message("Amount reward must include amountSpend when type is 'amount'");
    }

    return data;
});

module.exports = {
    createRewardValidation , updateRewardValidation
};
