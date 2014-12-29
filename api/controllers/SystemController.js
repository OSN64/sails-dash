/**
 * SystemController
 *
 * @description :: Server-side logic for managing Systems
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  'new': function(req,res){
    res.view();    
  },

  create: function(req, res) {

    var paramObj = {

      uptime: req.param('uptime'),

      loadavg: req.param('loadavg'),

      freemem: req.param('freemem'),

      cpus: req.param('cpus'),

    }

    // Create a User with the params sent from 
    // the sign-up form --> new.ejs
    System.create(paramObj, function systemCreated(err, system) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/system/new');
      }

      // res.json(system);
      res.redirect('/system/show/' + system.id);

    });
  },

  show: function(req, res, next) {
    System.findOne(req.param('id'), function foundSystem(err, system) {
      if (err) return next(err);
      if (!system) return next();

      // res.json(system);
      res.view({
        system: system
      });
    });
  },

  index: function(req, res, next) {
    System.find(function foundSystems(err, systems) {
      if (err) return next(err);
      
      res.view({
        systems: systems
      });
    });
  },

  edit: function(req, res, next) {

    System.findOne(req.param('id'), function foundSystem(err, system) {
      if (err) return next(err);
      if (!system) return next('system doesn\'t exist.');

      res.view({
        system: system
      });
    });
  },

  update: function(req, res, next) {

    var paramObj = {

      uptime: req.param('uptime'),

      loadavg: req.param('loadavg'),

      freemem: req.param('freemem'),

      cpus: req.param('cpus'),

    }

    System.update(req.param('id'), paramObj, function systemUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        }

        return res.redirect('/system/edit/' + req.param('id'));
      }

      res.redirect('/system/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {

    System.findOne(req.param('id'), function foundSystem(err, system) {
      if (err) return next(err);

      if (!system) return next('System doesn\'t exist.');

      System.destroy(req.param('id'), function systemDestroyed(err) {
        if (err) return next(err);
    });        

      res.redirect('/system');

    });
  }
 

};

