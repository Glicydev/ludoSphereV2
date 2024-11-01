const under = document.getElementById("under");

gsap.registerPlugin(ScrollToPlugin)

function scrollToUnder() {
    gsap.to(window, {
        duration: 1.5,
        scrollTo: under,
        ease: "power2"
    })
}