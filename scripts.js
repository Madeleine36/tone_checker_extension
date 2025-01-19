document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('toneSlider');
    const toneValue = document.getElementById('toneValue');
    const applyButton = document.getElementById('applyButton');

    // Update tone value when slider changes
    slider.addEventListener('input', function() {
        toneValue.textContent = this.value;
    });

    // Apply button functionality
    applyButton.addEventListener('click', function() {
        console.log('Hello World');
        document.body.style.backgroundColor = 'blue';
    });
});
