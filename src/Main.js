
var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

$( document ).ready(function(){
  var preferenceManager,profileManager;
  var baseUrl = "https://rally1.rallydev.com/slm/webservice/v2.0/";
  var prefUrl = baseUrl + "preference";
  var userUrl = baseUrl + "user?fetch=ObjectID,DefaultProject,userprofile";
  var experimentId;
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
    save:function(experimentId,field,value,prefObectId){
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
        return new Q('https://rally1.rallydev.com/slm/profile/image/'+user.ObjectID + '/200.sp');
      });
    }
  };
  
  function setUp(){
    var imageUrl = sessionStorage.getItem("imageUrl" , imageUrl);
    function setImageUrl(imageUrl){
      var profile = $('#profile');
      profile[0].src = imageUrl;
      sessionStorage.setItem("imageUrl" , imageUrl);
      profile.removeClass('hide');
      return new Q();
    }
    if(imageUrl){
      return new Q(setImageUrl(imageUrl));
    }
    else{
      return profileManager.getImageUrl()
        .then(setImageUrl)
    }
  }
  setUp()
  .then(function(){
    return new Q(new guid());
  })
  .then(function(experimentID){
    function onBlur(a){ 
      console.log(a.currentTarget.id,a.currentTarget.value);
    }
    $('textarea').blur(onBlur);
    $('input').blur(onBlur);
  })
});
