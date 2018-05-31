# NEEO Driver for JVC DLA-X and RS Projectors IP Control

Very minimal at this point, only added what was necessary for my setup.

## Use
* This driver is setup to be used with SDK v0.50.0
* Set your player's IP in the `package.json` file
`"neeoSdkOptions": {
  "jvcIp": "192.168.1.10"
}`

## Command codes
* Sourced from [here](http://pro.jvc.com/pro/attributes/PRESENT/manual/MK8_Ext_spec_v1_0%20English_Final.pdf)
* Uses a [fork](https://github.com/mbalders/jvc-projector) to control projector [original](https://github.com/djMax/jvc-projector)

## TODO:
* Add more codes