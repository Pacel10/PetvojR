document.addEventListener('DOMContentLoaded', () => {
    console.log("Petvoj Radio Widgets Initialized!");

    const onDemandWidget = document.querySelector('.cc_ondemand_content');
    const requestWidget = document.querySelector('.cc_requests');

    if (onDemandWidget) {
        console.log("On-Demand widget detected in DOM.");
    } else {
        console.error("On-Demand widget is missing!");
    }

    if (requestWidget) {
        console.log("Request widget detected in DOM.");
    } else {
        console.error("Request widget is missing!");
    }

    // Monitor interactions
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            console.log(`Button clicked: ${button.textContent}`);
        });
    });
});
