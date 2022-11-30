public DefaultApexLwc{

    public static void callWeatherApi(){

       
        final String  baseUrl = 'http://api.weatherapi.com/v1/current.json?key=5a6a1bb6581448a29ae91822221107&q=London&aqi=no';
        HttpRequest req = new HttpRequest();
		req.setEndPoint(baseUrl);
        req.setMethod('GET');
        req.setHeader('Accept', 'application/json');
        
        HTTP h = new HTTP();
        HttpResponse response =  h.send(req);
        

        system.debug('Api is working+-->'+response);
       // Covid19Parser parse =  Covid19Parser.parse(response.getBody().replace('"Global":','"AllStates":'));
        
      
        



    }
}