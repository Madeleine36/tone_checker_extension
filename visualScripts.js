document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('toneSlider');
    const toneValue = document.getElementById('toneValue');
    const applyButton = document.getElementById('applyButton');

    // this doesn't print to console but it still runs!
    applyButton.addEventListener("click", () => {
        toneValue.textContent = slider.value;
        chrome.storage.local.set({'toneLevel': slider.value }, function() {
            console.log("saved value");
            console.log(slider.value);
        });
    });
});
