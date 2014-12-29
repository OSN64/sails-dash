/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res) {
    var osDet = mainService.getOsDetail();
    var cpus = _.pairs(osDet.cpus);
    var netInter = osDet.netInte;
    for (var i = 0; i < cpus.length; i++) {
      cpus[i][1].index = i;
    };
    var formNetInter = [];
    _.each(netInter,function(index, el) {
      var dev = {};
      dev.name = el;
      dev.values = index;
      formNetInter.push(dev)
    });
    // console.log(formNetInter);
    return res.view("home/dashboard", {
      title: "Home",
      cpus: cpus,
      netInter: formNetInter
    });
  },
};
