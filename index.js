//need to move this outside the exports.handler or else it doesn't fire
const AWS = require("aws-sdk");

exports.handler = (event) => {
	
	//see what is in the event
	console.log(event)
	console.log(event.Records)

//	event.Records.forEach((record) => {
//			console.log("record")
//			console.log(record);
//			
//			if (record.eventName == 'INSERT') {
//					console.log(record.dynamodb.NewImage)

	
	var apn = require('apn');

	// Set up apn with the APNs Auth Key
	var apnProvider = new apn.Provider({  
		 token: {
			key: 'apns.p8', // Path to the key p8 file
			keyId: 'K637M92SS6', // The Key ID of the p8 file (available at https://developer.apple.com/account/ios/certificate/key)
			teamId: 'F6HF4R7G4W', // The Team ID of your Apple Developer Account (available at https://developer.apple.com/account/#/membership/)
		},
		production: false // Set to true if sending a notification to a production iOS app
	});

	// Enter the device token from the Xcode console
	var deviceToken = '9f3f5df78fa37b82cd10886d49d910818cc37e2ef92f6ea131aff500e6a39c9f';

	// Prepare a new notification
	var notification = new apn.Notification();

	// Specify your iOS app's Bundle ID (accessible within the project editor)
	notification.topic = 'com.colinjpower.lemmehelp';

	// Set expiration to 1 hour from now (in case device is offline)
	notification.expiry = Math.floor(Date.now() / 1000) + 3600;

	// Set app badge indicator
	notification.badge = 3;

	// Play ping.aiff sound when the notification is received
	notification.sound = 'ping.aiff';

	// Display the following message (the actual notification text, supports emoji)
	notification.alert = 'Hello World \u270C';

	// Send any extra payload data with the notification which will be accessible to your app in didReceiveRemoteNotification
	notification.payload = {id: 123};

	// Actually send the notification
	apnProvider.send(notification, deviceToken).then(function(result) {  
		// Check the result for any failed devices
		console.log(result);
	});
	
	const response = {
			statusCode: 200,
			body: JSON.stringify('Hello from Lambda!'),
	};
	return response;
	
}