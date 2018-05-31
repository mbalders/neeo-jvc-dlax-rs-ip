# NEEO Driver for Oppo UDP-203 and 205 IP Control

This driver only implements commands to replace the remote control, but network control protocol is capable of more. It allows for querying of state (e.g. query playback status) and directly setting player features (e.g. set output resolution to 1080p).

## Use
* This driver is setup to be used with SDK v0.50.0
* Set your player's IP in the `package.json` file
`"neeoSdkOptions": {
  "oppoIp": "192.168.1.10"
}`

## Command codes
* Sourced from [here](https://www.oppodigital.co.uk/UserFiles/Docs/PDF/UDP-20X_Simple_IP_Control_Protocol_v1.0.pdf) 

## TODO:
* Missing codes for Input and HDR buttons

## BDP-10x Players
This driver could easily be modified for BDP-10X players with commands found [here](http://cinema-therapy.de/wp-content/downloads/OPPO_BDP10x_IP_Remote_Control_Protocol_v2.0.pdf)  
* Comm port changes to 48360
* Command structure changes to "REMOTE <COMMAND>"

