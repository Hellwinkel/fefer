let filterController = 0
let overflowController = 0
let scrollTop = 0
let saleDate = [
  {
    target: 'ofertas-de-inverno',
    // timestamp: '1610564400'
    timestamp: '1640401199'
  },
  {
    target: 'ofertas-de-verao',
    timestamp: '1610579993'
    // timestamp: '1610478000'
  }
]

$(document).ready(function () {
  timer()

  $('.item-title').each(function () {
    if ($(this).html().trim().length > 32) {
      $(this).addClass('lower-title')
    }
  })

  // Fix VH in mobile devices
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

$(window).resize(function () {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
})

$(window).scroll(function () {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
})


// Brand swiper
// {
//   let brand = new Swiper(".brand-container", {
//     centeredSlides: true,
//     loop: true,
//     slidesPerGroup: 1,
//     slidesPerView: 1,
//     spaceBetween: 25,
//     simulateTouch: true,
//     speed: 600,
//     followFinger: true,
//     autoplay: {
//       disableOnInteraction: false,
//       delay: 1800,
//     },
//     grabCursor: true,
//     breakpoints: {
//       350: { slidesPerView: 2 },
//       750: { slidesPerView: 3 },
//       1045: { slidesPerView: 4 },
//       1335: { slidesPerView: 5 },
//       1625: { slidesPerView: 6 },
//       1915: { slidesPerView: 7 },
//       2205: { slidesPerView: 8 },
//       2495: { slidesPerView: 9 },
//     },
//   });
// }

// Create swiper instance
{
  // Note: to work, each slider must have a unique ID defined with 'swiper-container' and as part of its navigation arrows
  $(".module").each(function () {
    let id = $(this).find('.swiper-container').attr("id")

    if ($(this).hasClass("small") && !$(this).hasClass("grid-module")) {
      new Swiper(`.swiper-container#${id}`, {
        centeredSlides: false,
        loop: false,
        slidesPerGroup: 1,
        slidesPerView: 1,
        spaceBetween: 25,
        simulateTouch: false,
        followFinger: true,
        navigation: {
          nextEl: `#${id}-swiper-next`,
          prevEl: `#${id}-swiper-prev`,
        },
        breakpoints: {
          350: { slidesPerView: 2, slidesPerGroup: 2 },
          1045: { slidesPerView: 3 },
          1335: { slidesPerView: 4 },
          1625: { slidesPerView: 5 },
          1915: { slidesPerView: 6 },
          2205: { slidesPerView: 7 },
          2495: { slidesPerView: 8 },
        },
      });
    }

    if (!$(this).hasClass("grid-module") && !$(this).hasClass("small")) {

      if ($(this).hasClass("highlight")) {
        new Swiper(`.swiper-container#${id}`, {
          centeredSlides: true,
          loop: true,
          slidesPerGroup: 1,
          slidesPerView: 1,
          spaceBetween: 25,
          simulateTouch: false,
          followFinger: true,
          navigation: {
            nextEl: `#${id}-swiper-next`,
            prevEl: `#${id}-swiper-prev`,
          },
          breakpoints: {
            750: { slidesPerView: 1 },
            1045: { slidesPerView: 3 },
            1335: { slidesPerView: 3 },
            1625: { slidesPerView: 4 },
            1915: { slidesPerView: 5 },
            2205: { slidesPerView: 6 },
            2495: { slidesPerView: 7 },
          },
        });
      } else {
        new Swiper(`.swiper-container#${id}`, {
          centeredSlides: false,
          loop: false,
          slidesPerGroup: 1,
          slidesPerView: 1,
          spaceBetween: 25,
          simulateTouch: false,
          followFinger: true,
          navigation: {
            nextEl: `#${id}-swiper-next`,
            prevEl: `#${id}-swiper-prev`,
          },
          breakpoints: {
            750: { slidesPerView: 2 },
            1045: { slidesPerView: 3 },
            1335: { slidesPerView: 4 },
            1625: { slidesPerView: 5 },
            1915: { slidesPerView: 6 },
            2205: { slidesPerView: 7 },
            2495: { slidesPerView: 8 },
          },
        });
      }
    }
  });
}

// Create hover effect on products
{
  function focusProduct(element) {
    if (element) {
      element.siblings().addClass("blur");
    } else {
      $(".swiper-slide").removeClass("blur");
      $(".item-container").removeClass("blur");
    }
  }

  $(".swiper-slide")
    .on("focusin", function () {
      focusProduct($(this));
    })
    .on("focusout", function () {
      focusProduct();
    })
    .on("mouseover", function () {
      focusProduct($(this));
    })
    .on("mouseout", function () {
      focusProduct();
    });

  $(".grid-module .item-container")
    .on("focusin", function () {
      focusProduct($(this));
    })
    .on("focusout", function () {
      focusProduct();
    })
    .on("mouseover", function () {
      focusProduct($(this));
    })
    .on("mouseout", function () {
      focusProduct();
    });
}

// Create hover effect on module button
{
  $(".module-link").on("mouseover", function () {
    $(this).addClass("hover");
  });

  $(".module-link").on("focusin", function () {
    $(this).addClass("hover");
  });

  $(".module-link").on("focusout", function () {
    $(this).removeClass("hover");
  });

  $(".module-link").on("mouseout", function () {
    $(this).removeClass("hover");
  });
}

function openSearchBox() {
  $('.form-inline').addClass('show')
  toggleFilter(true)
  toggleOverflow(true)
  $('.mobile-search-button').removeClass('show')
  $('.lgpd-container').addClass('low-index')
}

function closeSearchBox() {
  $('.form-inline').removeClass('show')
  toggleFilter(false)
  toggleOverflow(false)
  $('.mobile-search-button').addClass('show')
  $('.lgpd-container').removeClass('low-index')
}

$(".navbar-nav .dropdown").on("show.bs.dropdown", function () {
  toggleFilter(true)
  toggleOverflow(true)
  $(this).find(".dropdown-menu a").attr("tabindex", 0);
});

$(".navbar-nav .dropdown").on("hidden.bs.dropdown", function () {
  toggleFilter(false)
  toggleOverflow(false)
  $(this).find(".dropdown-menu a").attr("tabindex", -1);
});

// Fix dropdown close when click
$(".dropdown-menu").on("click.bs.dropdown", function (e) {
  e.stopPropagation();
  // e.preventDefault();
});

$(".navbar-collapse").on('show.bs.collapse', function () {
  toggleOverflow(true)
})

$(".navbar-collapse").on('hidden.bs.collapse', function () {
  toggleOverflow(false)
})

$('.mobile-search-button.show').on('click', openSearchBox)
$('button.close-search').on('click', closeSearchBox)
$('.filter').on('click', function () {
  closeSearchBox()
})

const tippyContent = document.getElementById('tippy-content')

if (window.matchMedia('screen and (min-width: 1200px)').matches) {
  tippy('.help-center', {
    allowHTML: true,
    content: tippyContent.innerHTML,
    interactive: true,
    theme: 'tooltip-style',
    arrow: true,
    animation: 'shift-away',
    interactiveBorder: 20,
    onShow() {
      toggleFilter(true)
    },
    onHide() {
      toggleFilter(false)
    },
    trigger: "mouseenter focusin",
    hideOnClick: false
  })
}

function toggleFilter(show) {
  if (show) {
    $('.filter').addClass('show')
    filterController++
  } else {
    if (filterController === 1) {
      filterController--
      $('.filter').removeClass('show')
    }

    if (filterController > 1) {
      filterController--
    }
  }
}

function toggleOverflow(add) {
  if (add) {
    $('body').addClass('hidden-overflow')
    overflowController++
  } else {
    if (overflowController === 1) {
      overflowController--
      $('body').removeClass('hidden-overflow')
    }

    if (overflowController > 1) {
      overflowController--
    }
  }
}

function toggleMobileMenu() {
  let currentScroll = $(window).scrollTop()
  const nav = $('.navbar-custom')

  if ((currentScroll - scrollTop) > 0) {
    if ($(window).scrollTop() > 80) {
      nav.addClass('hidden-navbar')
    }
  } else {
    nav.removeClass('hidden-navbar')
  }

  scrollTop = currentScroll
}

if (window.matchMedia('screen and (max-width: 1199px)').matches) {
  $(window).scroll(toggleMobileMenu)
}

function toggleDropdown(e) {
  if (window.matchMedia('screen and (min-width: 1200px)').matches) {
    const dropdown = $(e.target).closest('.dropdown')
    const menu = $('.dropdown-menu', dropdown)

    setTimeout(function () {
      const shouldOpen = e.type !== 'click' && dropdown.is(':hover')

      if (shouldOpen) {
        menu.addClass('show');
        dropdown.addClass('show');
        $('[data-toggle="dropdown"]', dropdown).attr('aria-expanded', true);
        toggleFilter(true)
        dropdown.find("a").attr("tabindex", 0);
      } else {
        menu.removeClass('show');
        dropdown.removeClass('show');
        $('[data-toggle="dropdown"]', dropdown).attr('aria-expanded', false);
        toggleFilter(false)
        dropdown.find("a").attr("tabindex", -1);
      }
    }, e.type === 'mouseleave' ? 0 : 0)
  }
}

let menuTimer

$('body').on('mouseenter', '.dropdown', function (e) {
  menuTimer = setTimeout(function () {
    if (e.target.getAttribute('aria-expanded') !== 'true') {
      toggleDropdown(e)
    }
  }, 0)
})

$('body').on('mouseleave', '.dropdown', function (e) {
  clearTimeout(menuTimer)
  toggleDropdown(e)
})

$('.nav-item').on('click', function (e) {
  if (e.screenX !== 0 && window.matchMedia('screen and (min-width: 1200px)').matches) {
    e.stopPropagation()
  } else {
    toggleDropdown(e)
  }
})

$(".lgpd-collapse").on('show.bs.collapse', function () {
  $('.lgpd-container').addClass('show')
  toggleFilter(true)
  toggleOverflow(true)

})

$(".lgpd-collapse").on('hide.bs.collapse', function () {
  $('.lgpd-container').removeClass('show')
  toggleFilter(false)
  toggleOverflow(false)
})

$('.filter').on('click', function () {
  if ($('.lgpd-container').hasClass('show')) {
    $('.lgpd-collapse').collapse('toggle')
    $('.lgpd-container').removeClass('show')
    toggleFilter(false)
    toggleOverflow(false)
  }
})

function destroyLGPD() {
  $('.lgpd-container').addClass('destroy')
  toggleFilter(false)
  toggleOverflow(false)
}

let finalTimer = []

saleDate.map((e) => {
  finalTimer.push({})
})

// Timer
let firstLoop = true

function timer() {
  saleDate.map((item, index) => {
    const timeLeft = calculateRemainingTime(item)
    const isFullView = $(`.timer#${saleDate[index].target}-timer`).hasClass('full-view')
    const target = saleDate[index].target

    setRemainingTime(timeLeft, index, target, isFullView, firstLoop)
    
    finalTimer[index] = timeLeft
  })

  firstLoop = false
}

function calculateRemainingTime(element) {
  let limitDate = new Date(element.timestamp * 1000)
  let currentDate = new Date()

  let secondsLeft = Math.abs(limitDate - currentDate) / 1000

  let daysLeft = Math.floor(secondsLeft / 86400)
  secondsLeft -= daysLeft * 86400

  let hoursLeft = Math.floor(secondsLeft / 3600)
  secondsLeft -= hoursLeft * 3600
  hoursLeft = hoursLeft.toString().padStart(2, '0')

  let minutesLeft = Math.floor(secondsLeft / 60)
  secondsLeft -= minutesLeft * 60
  minutesLeft = minutesLeft.toString().padStart(2, '0')

  secondsLeft = Math.floor(secondsLeft)
  secondsLeft = secondsLeft.toString().padStart(2, '0')

  return {
    days: daysLeft,
    hours: hoursLeft,
    minutes: minutesLeft,
    seconds: secondsLeft
  }
}

function setRemainingTime(object, index, target, fullView, isFirstTime) {
  let daysLeft = object.days

  for (element in object) {
    let DOMTarget = $(`#${target}-${element}`)
    const formatedTimer = timerResponse(fullView, element, object[element], daysLeft)

    if(isFirstTime) {
      if(formatedTimer.isVisible) {
        DOMTarget.html(formatedTimer.response)
        DOMTarget.removeClass('destroy')
      } else {
        DOMTarget.empty()
        DOMTarget.addClass('destroy')
      }
    } else {
      if(object[element] !== finalTimer[index][element]) {  
        DOMTarget.removeClass('show')
        DOMTarget.addClass('hide')
        setTimeout(() => {
          if(formatedTimer.isVisible) {
            DOMTarget.html(formatedTimer.response)
            DOMTarget.removeClass('destroy')
          } else {
            DOMTarget.empty()
            DOMTarget.addClass('destroy')
          }
          DOMTarget.removeClass('hide')
          DOMTarget.addClass('show')
        }, 75)
      }
    }
    
  }
}

function timerResponse(isFullView, dataType, value, daysCount) {
  if(isFullView) {
    switch(dataType) {
      case 'days':
        switch(value) {
          case 0:
            return {
              isVisible: false,
              response: null
            }
          case 1:
            return {
              isVisible: true,
              response: `${value} dia e&nbsp;`
            }
          default: 
            return {
              isVisible: true,
              response: `${value} dias e&nbsp;`
            }
        }
      case 'hours':
        return {
          isVisible: true,
          response: `${value}:`
        }
      case 'minutes':
        return {
          isVisible: true,
          response: `${value}:`
        }
      default:
        return {
          isVisible: true,
          response: `${value}`
        }
    }
  } else {
    if(daysCount > 0) {
      if(dataType === 'days') {
        if(value === 1) {
          return {
            isVisible: true,
            response: `${value} dia`
          }
        } else {
          return {
            isVisible: true,
            response: `${value} dias`
          }
        }
      } else {
        return {
          isVisible: false,
          response: null
        }
      }
    } else {
      if(dataType === 'days') {
        return {
          isVisible: false,
          response: null
        }
      } else {
        switch(dataType) {
          case 'seconds':
            return {
              isVisible: true,
              response: value
            }
          default: 
            return {
              isVisible: true,
              response: `${value}:`
            }
        }
      }
    }
  }
}

setInterval(timer, 1000)