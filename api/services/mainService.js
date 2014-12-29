var os = require('os');
var os_utils = require('os-utils');
var Promise = require('bluebird');
var spawn = require('child_process').spawn;

module.exports = {
  init: function(cb) {
    // Promise.promisifyAll(mainService.getfreeMem)
    console.log('start');
    // os.uptime
    // os.loadavg()
    // os.freemem()
    // os.cpus();
    cb();
    // loop
    setInterval(function updateSystemVal() {
        mainService.getfreeMem(); //try and change this again to promise
        var paramObj = {
          uptime: os.uptime(),
          loadavg: os.loadavg(),
          freemem: sails.sysfreemem,
          cpus: os.cpus(),
        }
        mainService.pushStats(paramObj);
      }, 5000) // every 5 seconds
  },
  pushStats: function(stat) {
    // console.log(stat)
      System.create(stat, function systemCreated(err, system) {
        if (err) {
          console.log("Serious system error")
        }
        System.publishCreate(system)
      });
  },
  getOsDetail: function() {
    var reOs = {};
    reOs.hostname = os.hostname();
    reOs.type = os.type();
    reOs.platform = os.platform();
    reOs.arch = os.arch();
    reOs.release = os.release();
    reOs.totalMem = os.totalmem();
    reOs.netInte = os.networkInterfaces();
    reOs.cpus = os.cpus();
    return reOs;
  },
  getfreeMem: function(next) {
    // console.log("stst")
    var prc = spawn('free', ['-b']);
    prc.stdout.setEncoding('utf8');
    prc.stdout.on('data', function(data) {
      var str = data.toString()
      var lines = str.split(/\n/g);
      for (var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].split(/\s+/);
      }
      // console.log('your real memory usage is', lines[2][2]);
      sails.sysfreemem = lines[2][2];
    });
  }
}
