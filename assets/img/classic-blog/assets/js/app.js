    var images = document.querySelectorAll('.kg-gallery-image img');
images.forEach(function (image) {
        var container = image.closest('.kg-gallery-image');
        var width = image.attributes.width.value;
        var height = image.attributes.height.value;
        var ratio = width / height;
        container.style.flex = ratio + ' 1 0%';
    });

// Include images
let img_src = [
    'https://www.oakwave.com/assets/images/docelements/01.png',
    'https://www.oakwave.com/assets/images/docelements/02.png',
    'https://www.oakwave.com/assets/images/docelements/03.png',
    'https://www.oakwave.com/assets/images/docelements/04.png',
    'https://www.oakwave.com/assets/images/docelements/05.png',
    'https://www.oakwave.com/assets/images/docelements/06.png',
    'https://www.oakwave.com/assets/images/docelements/07.png',
    'https://www.oakwave.com/assets/images/docelements/08.png',
    'https://www.oakwave.com/assets/images/docelements/09.png',
    'https://www.oakwave.com/assets/images/docelements/10.png',
    'https://www.oakwave.com/assets/images/docelements/11.png',
    'https://www.oakwave.com/assets/images/docelements/12.png',
    'https://www.oakwave.com/assets/images/docelements/13.png',

];

// Name images included
let image_type = img_src.map(function (cuurentEl, index) {
    return "image" + index
});

// Configure particles-js
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 16, // No of images
            "density": {
                "enable": true,
                "value_area": 400 // Specify area (Lesser is greater density)
            }
        },
        "color": {
            "value": "#5affd4"
        },
        "shape": {
            "type": image_type, // Add images to particle-js
            "stroke": {
                "width": 0,
            },
            "polygon": {
                "nb_sides": 4
            }
        },
        "opacity": {
            "value": 0.7, // Adjust opactiy
            "random": true,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 45, // Adjust the image size
            "random": true,
            "anim": {
                "enable": false,
                "speed": 2,
                "size_min": 40,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 200,
            "color": "#ffffff",
            "opacity": 1,
            "width": 2
        },
        "move": {
            "enable": true,
            "speed": 1, // Speed of particle motion
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": true,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false,
                "mode": "grab"
            },
            "onclick": {
                "enable": false,
                "mode": "push"
            },
            "resize": false
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 0
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});
