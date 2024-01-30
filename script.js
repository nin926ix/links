document.addEventListener('DOMContentLoaded', () => {
    const firstNumber = document.getElementById('first-number');
    const secondNumber = document.getElementById('second-number');
    const lowerNumber = document.getElementById('lower-number');
    const upperNumber = document.getElementById('upper-number');

    let secondCounter = 21;
    let secondInterval;

    const animateSecondNumber = () => {
        secondNumber.style.opacity = 1;
        lowerNumber.style.opacity = 1;
        upperNumber.style.opacity = 1;
        secondCounter = (secondCounter + 1) % 24;
        secondNumber.textContent = secondCounter % 12 || 12;
        lowerNumber.textContent = (secondCounter + 11) % 12 || 12;
        upperNumber.textContent = (secondCounter + 1) % 12 || 12;

        if (secondCounter === 6) {
            lowerNumber.style.opacity = 0;
            upperNumber.style.opacity = 0;
            setTimeout(restartAnimation, 4000);
            clearInterval(secondInterval);
        }
    };

    function restartAnimation() {
        // Reset first number opacity
        firstNumber.style.opacity = 0;
        secondNumber.style.opacity = 0;

        setTimeout(() => {
            firstNumber.style.opacity = 1;
            secondInterval = setInterval(animateSecondNumber, 600);
        }, 2000);

        secondCounter = 21;
    }

    setTimeout(() => {
        firstNumber.style.opacity = 1;
        secondInterval = setInterval(animateSecondNumber, 600);
    }, 1000);
});


// document.addEventListener('DOMContentLoaded', () => {
//     const video = document.getElementById('backgroundVideo');
//     const content = document.getElementById('content');
//
//     // Function to adjust video playback
//     function adjustVideoPlayback() {
//         let scrollPercentage = content.scrollTop / (content.scrollHeight - content.clientHeight);
//         let videoTime = video.duration * scrollPercentage;
//         console.log(videoTime)
//         video.currentTime = videoTime;
//     }
//
//     // Check if content is scrollable
//     if (content.scrollHeight > content.clientHeight) {
//         content.addEventListener('scroll', function() {
//             adjustVideoPlayback();
//         });
//     }
// });



