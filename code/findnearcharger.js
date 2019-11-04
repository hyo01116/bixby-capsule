var http = require('http');
var console = require('console');
var config = require('config');
function makeURL(t){
  let url = '';
  const baseURL = config.get("chargerURL");
  const key = secret.get("key");
  url = baseURL+ 'pageNo='+t+'&numOfRows=1000&ServiceKey='+key;
  
  return url;
}
function makeURL1(t, near){
  let url = '';
  const baseURL = config.get("chargerURL");
  const key = secret.get("key");
  url = baseURL + 'addr='+near+'&pageNo='+t+'&numofRows=1000&ServiceKey='+key;
  
  return url;
}
function getdistance(lat1, lon1, lat2, lon2){
  const dLat = Math.abs(lat1 - lat2);
  const dLon = Math.abs(lon1 - lon2);
  const a = dLat + dLon;
  
  return a;
}
function check(near){
  if((near == "가까운") || (near == "주변") || (near == "근처") || (near == "가까이") || (near == "빨리") || (near == "빠르게"))
    return true;
  else
    return false;
}
module.exports.function = function findnearcharger (near, point) {
  console.log(near);
  console.log(point);
  chargerinfo =[];
 
  let url = '';
  var max_distance = 2;
  if(check(near)){
    for(var t = 1; t <= 5; t++){
      url = makeURL(t);
      var urlResponse = http.getUrl(url, {format : "xmljs"});
      var items = urlResponse.response.body.items;
      var item = items.item;
      if(item == null)
        break;
      for(var i = 0; i < item.length; i++){
        distance = getdistance(point.point.latitude, point.point.longitude, item[i].lat, item[i].longi);
        if(distance < max_distance){
          max_distance = distance;
          var address = item[i].addr;
        }
      }
      chargerinfo.push(address);
    }
  }
  else{
    for(var t = 1; t <= 5; t++){
      url = makeURL1(t, near);
      var urlResponse = http.getUrl(url, {format : "xmljs"});
      var items = urlResponse.response.body.items;
      var item = items.item;
      if(item == null)
        break;
      for(var i = 0; i < item.length; i++){
        var addr = item[i].addr;
        chargerinfo.push(addr);
      }
    }
  }
  return chargerinfo
}
