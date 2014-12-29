var os;

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function updateFreeMem(freeMem) {
    var memUsed;
    // memUsed = freeMem;
    usedMem = (os.totalMem - freeMem);
    memUsed = usedMem / os.totalMem;

    console.log(os.totalMem)
    console.log(freeMem)
    console.log(usedMem)
      // console.log(bytesToSize(freeMem))
      // console.log(bytesToSize(os.totalMem))


    $('#os-memUsed').text(memUsed)
  }
  // os.totalcpuusage
function updateCpus(cpus) {
  var totCpu  =0
  console.log(cpus)
  for (var i = 0, len = cpus.length; i < len; i++) {

    var cpu = cpus[i],
      total = 0;
    for (type in cpu.times) {
      total += cpu.times[type];
    }
    cpu.times.usage = 0;
    for (type in cpu.times) {
      if (type != "idle")
        cpu.times.usage += Math.round(100 * cpu.times[type] / total)
        // console.log("\t", type,Math.round(100 * cpu.times[type] / total))
    }
    totCpu += cpu.times.usage;
    displayUpdatedCpuData(i,cpu.times.usage)
  }
  os.totalcpuusage = totCpu * 4 /100; // pretty sure that allot of the cpu calculations are wrong
}
function displayUpdatedCpuData (cpu,usage){
    console.log("CPU " + cpu + ": " + usage);
    $('#os-cpu-'+cpu).val(usage).trigger('change');
}
$(document).ready(function() {
  io.socket.on('connect', function() {
    // io.socket.emit('msg', "Hello just joined");
    // subscribe to data
    // watch for new system data
    io.socket.get('/system/watch');
    console.log("connected to server")
  });
  io.socket.on("statinit", function(osDetail) {
    console.log(osDetail);
    os = osDetail;
    // set os details on screen
    $('#os-platform').text(capitalise(os.platform))
    $('#os-hostname').text(os.hostname)
    $('#os-arch').text(os.arch)
    $('#os-type').text(os.type)
    $('#os-release').text(os.release)
    $('#os-totmem').text(bytesToSize(os.totalMem))
    updateCpus(os.cpus);

  });
  io.socket.on('system',function onServerSentSystemEvent(msg){
    // Let's see what the server has to say...
      switch(msg.verb) {
        case 'created':
          console.log("system create")
          console.log(msg)
          break;

        default: return; // ignore any unrecognized messages
      }
  })
});
// arch: "x64"
// cpus: Array[8]
// hostname: "dave-mint-pc"
// netInte: Object
// platform: "linux"
// release: "3.13.0-37-generic"
// totalMem: 8267407360
// type: "Linux"
