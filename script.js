document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("bgVideo");

    // Attempt to play the background video
    const playPromise = video.play();

    // If there's any error (e.g., auto-play blocked or file doesn't exist),
    // hide the video container => fallback to black background
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // Video is playing
            })
            .catch(() => {
                // Video failed, fallback
                video.style.display = "none";
                // Body is already black via CSS
            });
    }
});