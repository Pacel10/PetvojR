document.addEventListener('DOMContentLoaded', () => {
  console.log("Petvoj Radio Widgets Initialized!");

  // Example of additional logic (if needed for interaction)
  const onDemandWidget = document.querySelector('.cc_ondemand_content');
  const requestWidget = document.querySelector('.cc_requests');

  if (onDemandWidget) {
    console.log("On-Demand widget loaded successfully!");
  }

  if (requestWidget) {
    console.log("Request widget loaded successfully!");
  }
});
