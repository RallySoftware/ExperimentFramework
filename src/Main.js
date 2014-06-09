var preferenceManager,profileManager;
$( document ).ready(function(){
  var baseUrl = "https://rally1.rallydev.com/slm/webservice/v2.0/";
  var prefUrl = baseUrl + "preference";
  var userUrl = baseUrl + "user";
  preferenceManager = 
  {
    getPrefs:function()
    {
      var deferred = Q.defer();
      superagent.get(prefUrl)
      .withCredentials()
      .end(function(e,res){
        if(e) deferred.reject(e);
        else if(res.error) deferred.reject(new Error(res.body.message));
        else deferred.resolve(res.body);
      });
      return deferred.promise;
    },
    savePrefs:function(pref){
      var deferred = Q.defer();
      superagent.post(baseUrl)
      .send({})
      .withCredentials()
      .end(function(e,res){
        if(e) deferred.reject(e);
        else if(res.error) deferred.reject(new Error(res.body.message));
        else deferred.resolve(res.body);
      });
      return deferred.promise;
    }
    
  };

  profileManager = 
  {
    getCurrentUser:function()
    {
      var deferred = Q.defer();
      superagent.get(userUrl)
      .withCredentials()
      .end(function(e,res){
        if(e) deferred.reject(e);
        else if(res.error) deferred.reject(new Error(res.body.message));
        else deferred.resolve(JSON.parse(res.text).User);
      });
      return deferred.promise;
    },
    getImageUrl:function(){
      return profileManager.getCurrentUser().then(function(user){
        return new Q('https://rally1.rallydev.com/slm/profile/image/'+user.ObjectID + '/50.sp');
      });
    }
  };

  profileManager.getImageUrl().then(function(imageUrl){
    var profile = $('#profile');
    profile[0].src = imageUrl;
    profile.removeClass('hide')
  });;
});
