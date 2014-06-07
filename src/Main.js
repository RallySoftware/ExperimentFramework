var preferenceManager;
$( document ).ready(function(){
  var baseUrl = "https://rally1.rallydev.com/slm/webservice/v2.0/Preference";
  preferenceManager = 
  {
    getPrefs:function(pref)
    {
      var deferred = Q.defer();
      superagent.get(baseUrl)
      .set('Access-Control-Allow-Origin', 'http://localhost:8000/')
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
  preferenceManager.getPrefs();
});
