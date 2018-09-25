'use strict';

const neeoapi = require('neeo-sdk');

const JVC = require("jvc-projector").default;
const winston = require('winston');

const packageFile = require(process.cwd() + '/package.json');
const sdkOptions = packageFile.neeoSdkOptions || {};

if (sdkOptions.jvcIp == undefined) {
  console.log('[JVC DLA-X,RS IP] No IP address defined. package.json -> sdkOptions -> jvcIp');
}

const JVC_IP = sdkOptions.jvcIp;
const JVC_PORT = 20554;

//var key;
//var jj;

var code;
var jj = new JVC(winston, JVC_IP, JVC_PORT)
  .on("ready", function(){
    winston.info("Ready", code);
    

    switch (code){
      case "POWER ON":
        jj.setPowerState(true);
        break;
      case "POWER OFF":
        jj.setPowerState(false);
        break;
      case "INPUT HDMI 1":
        jj.setInputState(true);
        break;
      case "INPUT HDMI 2":
        jj.setInputState(false);
        break;
      case "LOW LATENCY ON":
        //jj.sendCommand([0x21, 0x89, 0x01, 0x50, 0x4D, 0x4C, 0x4C, 0x31, 0x0A]);
        break;
      case "LOW LATENCY OFF":
        //jj.sendCommand([0x21, 0x89, 0x01, 0x50, 0x4D, 0x4C, 0x4C, 0x30, 0x0A]);
        break;

      //operation vs reference, PJ fixed, id fixed, P (picture), M (adjust), L (low), L (latencty), off : on, end
      //0x21, 0x89, 0x01, 0x50, 0x4D, 0x4C, 0x4C, 0x30 : 0x31, 0x0A
    }



  })
  .on("ack", function(foo, foo2){
    winston.info("ack", foo, foo2);
    
    // when job is complete
    jj.disconnect();

    winston.info('wtf');
  })
  .on("unknown", function(foo, foo2){
    winston.info("unknown", foo, foo2);
    
    // when job is complete
    //jj.disconnect();
  })
  .on("connected", function(foo, foo2){
    winston.info("Connected");
    
    // when job is complete
    //jj.disconnect();
  })
  .on("response", function(foo, foo2){
    winston.info("response", foo, foo2);
    
    // when job is complete
    jj.disconnect();
  });

const controller = {
  onButtonPressed: function onButtonPressed(name) {
    console.log(`[CONTROLLER] ${name} button pressed`);

    code = name;

    //do we need to connect everytime?
    //is there a way restart?
    //jj.connect();

    //if not, should we disconnect?
    //test to see what responses are both ways

    jj = new JVC(winston, JVC_IP, JVC_PORT)
      .on("ready", function(){
        winston.info("Ready", code);
        
        switch (code){
          case "POWER ON":
            jj.setPowerState(true);
            break;
          case "POWER OFF":
            jj.setPowerState(false);
            break;
          case "INPUT HDMI 1":
            jj.setInputState(true);
            break;
          case "INPUT HDMI 2":
            jj.setInputState(false);
            break;
          case "LOW LATENCY ON":
            jj.sendCommand([0x21, 0x89, 0x01, 0x50, 0x4D, 0x4C, 0x4C, 0x31, 0x0A]);
            break;
          case "LOW LATENCY OFF":
            jj.sendCommand([0x21, 0x89, 0x01, 0x50, 0x4D, 0x4C, 0x4C, 0x30, 0x0A]);
            break;
    
          //operation vs reference, PJ fixed, id fixed, P (picture), M (adjust), L (low), L (latencty), off : on, end
          //0x21, 0x89, 0x01, 0x50, 0x4D, 0x4C, 0x4C, 0x30 : 0x31, 0x0A
        }


      })
      .on("ack", function(foo, foo2){
        winston.info("ack", foo, foo2);
        // when job is complete
        //this does not seem to work...
        jj.disconnect();
      })
      .on("response", function(foo, foo2){
        winston.info("response", foo, foo2);
      });

    jj.connect();   
  }
};

const jvc = neeoapi.buildDevice('JVC DLA-X,RS IP')
  .setManufacturer('JVC')
  .setType('PROJECTOR')

  .addButtonGroup('Power')

  .addButton({ name: 'INPUT HDMI 1', label: 'HDMI 1' })
  .addButton({ name: 'INPUT HDMI 2', label: 'HDMI 2' })
  .addButton({ name: 'LOW LATENCY ON', label: 'Low Latency On' })
  .addButton({ name: 'LOW LATENCY OFF', label: 'Low Latency Off' })

  .addButtonHander(controller.onButtonPressed);


module.exports = {
  devices: [jvc]
};
