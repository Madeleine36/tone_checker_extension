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
        chrome.storage.sync.set({ 'toneLevel': slider.value }, function() {
            console.log("saving value");
            console.log(slider.value);
        });
    });
});
