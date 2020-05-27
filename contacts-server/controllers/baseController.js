var express = require('express'),
    mongoose = require('mongoose');

var update = function (req, res) {
    console.log(req.model);
    if (req.body._id)
        delete req.body._id;

    for (var item in req.body) {
        req.model[item] = req.body[item];
    }


    req.model.save(function (err) {
        if (err)
            res.status(500).send(err);
        else {
            req.model.increment();
            res.json(req.model);
        }

    });
};

var routes = function (service) {
    var router = express.Router();


    router.route('/')
        .post(function (req, res) {

            delete req.body._id;

            var generalModel = mongoose.model('Model', service);
            var model = new generalModel(req.body);
            console.log(req.body);
            //Validing model
            model.validate(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    model.save();
                    res.status(201).send(model);
                }
            });
        })
        .get(function (req, res) {

            var model = mongoose.model('Model', service);
            var query = req.query;
            res.status(200)

            model.find(query, function (err, models) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(models);
            });
        })
        .put(function (req, res) {

            var generalModel = mongoose.model('Model', service);

            generalModel.findById(req.body._id, function (err, model) {
                if (err)
                    res.status(500).send(err);
                else if (model) {
                    req.model = model;

                    if (req.body._id)
                        delete req.body._id;

                    for (var item in req.body) {
                        req.model[item] = req.body[item];
                    }


                    req.model.save(function (err) {
                        if (err)
                            res.status(500).send(err);
                        else {
                            req.model.increment();
                            res.json(req.model);
                        }

                    });
                } else {
                    res.status(404).send("No data found.");
                }
            });
        })
        .delete(function (req, res) {

            var generalModel = mongoose.model('Model', service);

            generalModel.findById(req.query.id, function (err, model) {
                if (err)
                    res.status(500).send(err);
                else if (model) {
                    req.model = model;

                    if (req.body._id)
                        delete req.body._id;

                    req.model.active = false;

                    req.model.save(function (err) {
                        if (err)
                            res.status(500).send(err);
                        else {
                            req.model.increment();
                            res.status(204).send('The data was successfully deleted.');
                        }

                    });
                } else {
                    res.status(404).send("No data found.");
                }
            });

        });;

    // router.route('/:id')
    // .delete(function (req, res){
    //     res.status(204).send('The data was successfully deleted.');

    // });

    return router;
};



module.exports = routes;