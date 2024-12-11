// Load Request Widget
(function () {
  let requestScript = document.createElement("script");
  requestScript.src = "https://control.internet-radio.com:2199/system/request.js";
  document.body.appendChild(requestScript);
})();

// Load On-Demand Widget
(function () {
  let onDemandScript = document.createElement("script");
  onDemandScript.src = "https://control.internet-radio.com:2199/system/ondemand.js";
  document.body.appendChild(onDemandScript);
})();
