document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('toneSlider');
    const toneValue = document.getElementById('toneValue');
    const applyButton = document.getElementById('applyButton');


    // Update tone value when slider changes
    slider.addEventListener('input', function() {
        toneValue.textContent = this.value;
    });

    applyButton.addEventListener("click", () => {
        console.log("sdfgadfhaergf " + slider.value);
        chrome.storage.local.set({'toneLevel': slider.value }, function() {
            console.log("saved value");
            console.log(slider.value);
        });
    });
});
