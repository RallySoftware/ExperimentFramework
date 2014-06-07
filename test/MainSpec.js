describe('Main', function() {
  beforeEach(function(){
  });

  describe('test',function(){
    it('should default the url to have the expected trailing / ',function(){
      expect(true).toBe(false); 
    });
    it('should pass the test by finding the global varible',function(){
      var globalVar = globalVar || undefined;
      expect(globalVar).toBe('ninjas'); 
    });
  });

});
