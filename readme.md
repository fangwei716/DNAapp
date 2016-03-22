# A react native app for DNAfw

## Installation
Require node.js & xcode

1. `npm install`

2. `run DNA.xcodeproj`

3. Open AwesomeApp/ios/AwesomeApp/AppDelegate.m

4. Change the IP in the URL from localhost to your laptop's IP. On Mac, you can find the IP address in System Preferences / Network.

5. Using offline bundle （default）

to disable 

	a. Open AwesomeApp/ios/AwesomeApp/AppDelegate.m

	b. comment jsCodeLocation = [[NSBundle mainBundle] ...

6. The JS bundle will be built for dev or prod depending on your app's scheme (Debug = development build with warnings, Release = minified prod build with perf optimizations). To change the scheme navigate to Product > Scheme > Edit Scheme... in xcode and change Build Configuration between Debug and Release.

7. install to a generic device (for simulator, use master branch)

## Screenshots
![login](https://raw.githubusercontent.com/fangwei716/DNAapp/master/screenshot/login.gif)

## Compatibility and Responsibility

iPhone 6(s) plus - pass

iPhone 6(s) - pass

iphone 5(s) - pass

iphone4s - pass
