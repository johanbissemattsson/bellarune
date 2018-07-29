# bellarune

# Building for iOS with xcode
Follow https://docs.viromedia.com/docs/starting-a-new-viro-project-1

## TLDR, if prerequisites are installed (Xcode, Ruby and CocoaPods):
1. In the terminal, navigate to the root of your project (not your iOS project, but ViroReact project) and run the following command:
`./setup-ide.sh --ios`

2. Navigate to the ios directory `cd ios`
3. Run bellarune.xcworkspace `open bellarune.xcworkspace`
4. Select the project/app target *bellarune* and add bellarune as the team
5. Change devices to Universal
6. Change to the project/app target *bellaruneTests* and add bellarune as the team
7. Click run/play

### Building for production (iOS with xcode)
1. Select Product > Destination > Generic iOS Device
2. Run Product > Clean
3. Archive the project Product > Archive
4. Press export and choose either Development Deployment or App Store Deployment
5. Select Window in XCode Top Menu Bar > Select Devices & Simulators
6. Drag and drop ipa to device
7. If uploading to App Store remeber to check certificates for production (should be done in last step I think in XCode dialog box before uploading to App Store)
https://wiki.genexus.com/commwiki/servlet/wiki?34616,HowTo%3A+Create+an+.ipa+file+from+XCode

#### Alternative way
1. In the Xcode menu choose Product > Scheme > Edit Scheme
2. Duplicate scheme and name it bellaruneProd
3. Edit scheme again
4. Change Build Configuration to Release (Under Run > Info in edit Scheme)
5. Build app with release scheme using Product > Build in Xcode menu

## Change display name
1. Xcode > Project *bellarune* > General > Display Name 
1. Xcode > Project *bellarune* > Info > Bundle display Name