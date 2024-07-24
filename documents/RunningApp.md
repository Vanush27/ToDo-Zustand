## Platforms Supported
- [x] iOS
- [x] Android


## Env. Requirement
```bash

$ node v18
$ react-native: "0.74.3"

```

## Initial setup - first time

```bash
# install dependencies
$ yarn
```
- Check with the team to add support for sentry with your local application

## Running IOS app

```bash
# Repeat Initial setup - if not working

# Install pod dependencies
$ yarn pod-install

# Run on simulator
$ yarn ios

```

## Running Android app

```bash
# To use your device: 
# Connect your device
# Check if the device is running
$ adb devices
# Then
# Or without connecting Run on simulator
$ yarn android

```
