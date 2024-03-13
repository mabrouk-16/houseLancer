import gsap from "gsap";

// Scroll animation function
export const scrollAnimation = (position, target, isMobile, onUpdate) => {
  const ti = gsap.timeline();
  ti.to(position, {
    x: !isMobile ? -3.38 : -7.0,
    y: !isMobile ? 10.74 : 12.2,//لما كان سالب كان النموذج مقلوب لما شلت السالب اتعدل 
    z: !isMobile ? 5.93 : 6.0, //بيكبر
    scrollTrigger: {
      trigger: ".sound-section",
      start: "top bottom",
      end: "top top",
      scrub: 2,
      immediateRender: false,
    },
    onUpdate,
  })
    .to(target, {
      // x: !isMobile ? 4.52 : 4.0,
      // y: !isMobile ? -7.77 : -2.9,
      // z: !isMobile ? -10.08 : -6.7,
      

      x: !isMobile ? -2.00 : -3.4,//land r
      y: !isMobile ? 0.99 : 3.0,//up and down
      z: !isMobile ? 1.08 : 1.7,//in and out 
      scrollTrigger: {
        trigger: ".sound-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    })
    .to(".jumbotron-section", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".sound-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    })
    .to(".sound-section-content", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".sound-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    })
    .to(position, {
      x: !isMobile ? 1.56 : 9.36,
      y: !isMobile ? 7.0 : 8.95, //لما خليته - كبر خالص لما نزلت اخر سكشن
      z: !isMobile ? -2.01 : -0.09,
      scrollTrigger: {
        trigger: ".display-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
      onUpdate,
    })
    .to(target, {
      x: !isMobile ? -1.55 : -1.62,
      y: !isMobile ? -10 : -20.8,
      z: !isMobile ? -2.0 : -2.0,
      scrollTrigger: {
        trigger: ".display-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    })
    .to(".display-section", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".display-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    });
};

// Scroll animation upwards function
export const scrollAnimationUp = () => {
  gsap.to(window, {
    scrollTo: { y: 12 },
    duration:20
  });
};

// Listen for scroll up event
window.addEventListener('wheel', (event) => {
  if (event.deltaY < 0) {
    scrollAnimationUp();
  }
});
