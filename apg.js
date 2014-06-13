var parseQueryString = function( queryString ) {
  var params = {}, queries, temp, i, l;

  // Split into key/value pairs
  queries = queryString.split("&");

  // Convert the array of strings into an object
  for ( i = 0, l = queries.length; i < l; i++ ) {
    temp = queries[i].split('=');
    params[temp[0]] = temp[1];
  }

  return params;
};

var getCampaign = function() {
  var re = new RegExp("campaign=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}

var apg = function() {

  var head = document.getElementsByTagName("head")[0];

  // Create a script element for our JSON
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'campaigns.json';
  script.className = "json";
  script.async = false;
  head.appendChild(script);

};

apg.params = parseQueryString(window.location.search.substring(1));

apg.process = function(data) {
  data.campaigns.forEach( function( campaign ) {
    if ( campaign.match(apg.params) ) {
      apg.campaign = campaign.name;
    }
  });
  document.cookie = "/js/campaign="+apg.campaign;
}

apg();
