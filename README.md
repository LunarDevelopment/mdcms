##To Do 

* free access to reviewers / brand championers ? 
* angular and lav logic to track who has been tweeted to. 
* outreaches count on main and dashboard 
* hide twead progress bar on med-and-down
* not just authenticated() but make sure user is subscribed. 
- Could run this on server side for every request and have a redirect in all successes on client to show a "Plans" modal then payment. 
* add into paymentcontroller.php && Angularjs controllers the post var for different plan subscriptions. 
* Contact us page probably needs: Not sending the JWT for specific requests
```
// This request will NOT send the token as it has skipAuthentication
$http({
  url: '/api/endpoint',
  skipAuthorization: true
  method: 'GET'
});
```