$(document).ready(function(){
      // $(".lazy").slick({
      //   lazyLoad: 'ondemand', // ondemand progressive anticipated
      //   infinite: true
      // });
      $('#ourProjects-slider__1').slick({
        lazyLoad: 'ondemand',
        arrows: true,
        dots: true,
        infinite: true,
        speed: 300,
        // adaptiveHeight: true,
        appendDots: $('.ourProjects-slider__controlPanel .dots-container'),
        prevArrow: $('.ourProjects-slider__controlPanel .slick-prev').html("<img class='slick-prev slick-arrow' src='./img/arrLeft.svg'>"),
        nextArrow: $('.ourProjects-slider__controlPanel .slick-next').html("<img class='slick-next slick-arrow' src='./img/arrRight.svg'>"),

        // prevArrow:"<img class='slick-prev slick-arrow' src='./img/arrLeft.svg'>",
        // nextArrow:"<img class='slick-next slick-arrow' src='./img/arrRight.svg'>",


        // slidesToShow: 4,
        // slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          }
            // {
            //   breakpoint: 600,
            //   settings: {
            //     slidesToShow: 2,
            //     slidesToScroll: 2
            //   }
            // },
          // {
          //   breakpoint: 480,
          //   settings: {
          //     slidesToShow: 1,
          //     slidesToScroll: 1
          //   }
          // }
        ]
      });
});

