//
// jarallax.js
// Warning: jarallax.js is DEPRECATED!
//

//import lax from 'lax.js'
// window.onload =  ()=> {
//   lax.init()
//
//   // Add a driver that we use to control our animations
//   lax.addDriver('scrollY', function (laxFrame) {
//     return window.scrollY
//   })
//
//   // Add animation bindings to elements
//   lax.addElements('[data-jarallax], [data-jarallax-element]', {
//     scrollY: {
//       translateY: [
//         ["elInY", "elOutY"],
//         [200, 0],
//       ]
//     }
//   })
// }

import { jarallax, jarallaxElement, jarallaxVideo } from 'jarallax';

const toggles = document.querySelectorAll('[data-jarallax], [data-jarallax-element]');

// Add Video extension
jarallaxVideo();

// Add Element extension
jarallaxElement();

// Init Jarallax
jarallax(toggles);

// Make available globally
window.jarallax = jarallax;
window.jarallaxElement = jarallaxElement;
window.jarallaxVideo = jarallaxVideo;
