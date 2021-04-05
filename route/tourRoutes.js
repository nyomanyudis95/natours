const express = require('express');
const tourController = require('./../controller/tourController');

const router = express.Router();

router.param('id',tourController.checkID);

// Route Tours
router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody,tourController.insertTour);
router
    .route('/:id')
    .get(tourController.getOneTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteOneTour);

module.exports = router;