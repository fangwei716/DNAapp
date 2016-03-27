# A react native app for DNAfw

## Installation
Require node.js & xcode

1. `npm install`

2. `run DNA.xcodeproj`

3. run on xcode ios simulator (for generic device, check v0.1 - release branch)

## Screenshots
![login](https://raw.githubusercontent.com/fangwei716/DNAapp/master/screenshot/login.gif)

## Server side

node.js server side: https://github.com/fangwei716/ap-express (combined with Algorithm platform)

(passed the test for login and resposed with correct error message.)

### POST: ios-login  

```javascript
router.post('/ios-login', function(req, res, next) {
	var db = req.db,
		collection = db.get('usercollection'),
		user = req.body,
		md5 = crypto.createHash('md5'),
		password = md5.update(user.password).digest('base64');

	collection.findOne({
		"username": user.username
	}, function(err, theUser) {
		if (!theUser) {
			return res.send({
				error: true,
				loginState: "2"
			})
		} else {
			if (theUser.password == password) {
				return res.send({
					error: false,
					uid:theUser._id,
					username: theUser.username,
					loginState: "1",
					isFirstTime: "0" // should read from database
				})

			} else {
				return res.send({
					error: true,
					loginState: "3"
				})

			}
		}
	});

});
```

## Compatibility and Responsibility

iPhone 6(s) plus - pass

iPhone 6(s) - pass

iphone 5(s) - pass

iphone4s - pass


