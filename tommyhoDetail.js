document.addEventListener("DOMContentLoaded", function () {
  // BACK BUTTON
  document.querySelector("#btn-back").onclick = () => {
    let prevUrl = "tommyho.html";
    window.location.href = prevUrl;
  };

  // get current href
  let url = window.location.href;
  // console.log("url: " + url);

  let urlParameters = breakUpURLParameters(url);
  // console.log(urlParameters);
  // console.log(urlParameters.search);
  // console.log(urlParameters.search.img);

  // render specific image src from querystring
  let imgSrc = urlParameters.search.img;
  document.querySelector("#img-detail").src = imgSrc;
  // render specific caption from querystring
  document.querySelector("#caption-detail").innerHTML =
    urlParameters.search.caption.replace(/%20/g, " ").replace(/%27/g, "'");
  // render specific description from querystring
  document.querySelector("#description-detail").innerHTML =
    urlParameters.search.description.replace(/%20/g, " ").replace(/%27/g, "'");

  // if this img in cookie, set icon display to true
  // get imageNo from the url parameter (img) => s.length-5
  // CONSTRAINT: imageNo can ONLY be single-digit, OR use RegEx
  let imageNo = imgSrc.charAt(imgSrc.length - 5);
  if (document.cookie.includes(imageNo)) {
    // console.log('cookie here');
    document.querySelector(".detail-icon").style.display = "inline-block";
  }
});

// ********** PROVIDED FUNCTIONS **********
function breakUpURLParameters(url) {
  // analyze and output the url parameters as a useful array to caller
  // create a link in the DOM and set its href
  var link = document.createElement("a");
  link.setAttribute("href", url);
  console.log("path variable is " + url);

  //  return an easy-to-use object that breaks apart the path
  return {
    host: link.hostname, //  'example.com'
    port: link.port, //  12345
    search: mapMaker(link.search), //  {startIndex: 1, pageSize: 10}
    path: link.pathname, //  '/blog/foo/bar'
    protocol: link.protocol, //  'http:'
  };
}

function mapMaker(search, preserveDuplicates) {
  // responsible for obtaining all url params, representing them into an array
  // option to preserve duplicate keys (e.g. 'sort=name&sort=age')
  preserveDuplicates = preserveDuplicates || false; //  disabled by default

  var outputNoDupes = {};
  var returnableArray = []; //  optional output array to preserve duplicate keys

  // sanity check
  if (!search)
    throw new Error("mapMaker: your search input param is misformed?");

  // remove ? character from your url (?foo=1&bar=2 -> 'foo=1&bar=2')
  search = search.split("?")[1];

  // split apart your keys into a useful array of key/value pairs ('foo=1&bar=2' -> ['foo=1', 'bar=2'])
  search = search.split("&");

  // separate keys from values (['foo=1', 'bar=2'] -> [{foo:1}, {bar:2}])
  // then package as an array for your caller to use as variables
  returnableArray = search.map(function (keyval) {
    var out = {};
    keyval = keyval.split("=");
    out[keyval[0]] = keyval[1];
    // might as well do the no-dupe work too while we're in the loop
    outputNoDupes[keyval[0]] = keyval[1];
    return out;
  });
  return preserveDuplicates ? returnableArray : outputNoDupes;
}
