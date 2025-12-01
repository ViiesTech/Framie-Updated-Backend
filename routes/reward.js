const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const rewardControllers = require('../controllers/reward');
const validate = require('../middleware/validate');
const { createRewardValidation, updateRewardValidation } = require('../validation/reward');

router.route('/reward')
    .post(auth.verifyAdmin, validate(createRewardValidation), rewardControllers.createReward)
    .get(rewardControllers.getReward)

router.route('/reward/:rewardId')
    .patch(auth.verifyAdmin, validate(updateRewardValidation), rewardControllers.updateReward)
    .delete(auth.verifyAdmin, rewardControllers.deleteReward)
    .get(rewardControllers.getReward)

router.post("/reward/check", rewardControllers.checkUserReward);
router.post("/reward/claimReward", rewardControllers.claimReward);

module.exports = router