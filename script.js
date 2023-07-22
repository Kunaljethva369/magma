gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive    https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


let SecondSection = document.querySelector('#page2 h2').textContent.split(" ");
let camperText = '';
for (let i = 0; i < SecondSection.length; i++) {
  camperText += ` <span>${SecondSection[i]}</span>`
  document.querySelector('#page2 h2').innerHTML = camperText;
}

gsap.to("#page2 h2 span", {
  scrollTrigger: {
    trigger: `#page2 h2 span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5,
  },
  stagger: .2,
  color: '#fff'
});


function canvas() {
  const canvas = document.querySelector("#page3>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
        ./Assets/Bridges/Assets/Framers/frames00007.webp
        ./Assets/Framers/frames00010.webp
        ./Assets/Framers/frames00013.webp
        ./Assets/Framers/frames00016.webp
        ./Assets/Framers/frames00019.webp
        ./Assets/Framers/frames00022.webp
        ./Assets/Framers/frames00025.webp
        ./Assets/Framers/frames00028.webp
        ./Assets/Framers/frames00031.webp
        ./Assets/Framers/frames00034.webp
        ./Assets/Framers/frames00037.webp
        ./Assets/Framers/frames00040.webp
        ./Assets/Framers/frames00043.webp
        ./Assets/Framers/frames00046.webp
        ./Assets/Framers/frames00049.webp
        ./Assets/Framers/frames00052.webp
        ./Assets/Framers/frames00055.webp
        ./Assets/Framers/frames00058.webp
        ./Assets/Framers/frames00061.webp
        ./Assets/Framers/frames00064.webp
        ./Assets/Framers/frames00067.webp
        ./Assets/Framers/frames00070.webp
        ./Assets/Framers/frames00073.webp
        ./Assets/Framers/frames00076.webp
        ./Assets/Framers/frames00079.webp
        ./Assets/Framers/frames00082.webp
        ./Assets/Framers/frames00085.webp
        ./Assets/Framers/frames00088.webp
        ./Assets/Framers/frames00091.webp
        ./Assets/Framers/frames00094.webp
        ./Assets/Framers/frames00097.webp
        ./Assets/Framers/frames00100.webp
        ./Assets/Framers/frames00103.webp
        ./Assets/Framers/frames00106.webp
        ./Assets/Framers/frames00109.webp
        ./Assets/Framers/frames00112.webp
        ./Assets/Framers/frames00115.webp
        ./Assets/Framers/frames00118.webp
        ./Assets/Framers/frames00121.webp
        ./Assets/Framers/frames00124.webp
        ./Assets/Framers/frames00127.webp
        ./Assets/Framers/frames00130.webp
        ./Assets/Framers/frames00133.webp
        ./Assets/Framers/frames00136.webp
        ./Assets/Framers/frames00139.webp
        ./Assets/Framers/frames00142.webp
        ./Assets/Framers/frames00145.webp
        ./Assets/Framers/frames00148.webp
        ./Assets/Framers/frames00151.webp
        ./Assets/Framers/frames00154.webp
        ./Assets/Framers/frames00157.webp
        ./Assets/Framers/frames00160.webp
        ./Assets/Framers/frames00163.webp
        ./Assets/Framers/frames00166.webp
        ./Assets/Framers/frames00169.webp
        ./Assets/Framers/frames00172.webp
        ./Assets/Framers/frames00175.webp
        ./Assets/Framers/frames00178.webp
        ./Assets/Framers/frames00181.webp
        ./Assets/Framers/frames00184.webp
        ./Assets/Framers/frames00187.webp
        ./Assets/Framers/frames00190.webp
        ./Assets/Framers/frames00193.webp
        ./Assets/Framers/frames00196.webp
        ./Assets/Framers/frames00199.webp
        ./Assets/Framers/frames00202.webp
      `;
    return data.split("\n")[index];
  }

  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 2,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page3`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page3",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas();

let ThirdSection = document.querySelector('#page4 h2').textContent.split(" ");
let camperTextThird = '';
for (let i = 0; i < ThirdSection.length; i++) {
  camperTextThird += ` <span>${ThirdSection[i]}</span>`
  document.querySelector('#page4 h2').innerHTML = camperTextThird;
}

gsap.to("#page4 h2 span", {
  scrollTrigger: {
    trigger: `#page4 h2 span`,
    scroller:  `#main`,
    start: `top bottom`,
    end: `bottom top`,
    scrub: .5,
  },
  stagger: .2,
  color: '#fff'
});


function canvasBridge() {
  const canvas = document.querySelector("#page5>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
    ./Assets/Bridges/bridges00004.webp
    ./Assets/Bridges/bridges00007.webp
    ./Assets/Bridges/bridges00010.webp
    ./Assets/Bridges/bridges00013.webp
    ./Assets/Bridges/bridges00016.webp
    ./Assets/Bridges/bridges00019.webp
    ./Assets/Bridges/bridges00022.webp
    ./Assets/Bridges/bridges00025.webp
    ./Assets/Bridges/bridges00028.webp
    ./Assets/Bridges/bridges00031.webp
    ./Assets/Bridges/bridges00034.webp
    ./Assets/Bridges/bridges00037.webp
    ./Assets/Bridges/bridges00040.webp
    ./Assets/Bridges/bridges00043.webp
    ./Assets/Bridges/bridges00046.webp
    ./Assets/Bridges/bridges00049.webp
    ./Assets/Bridges/bridges00052.webp
    ./Assets/Bridges/bridges00055.webp
    ./Assets/Bridges/bridges00058.webp
    ./Assets/Bridges/bridges00061.webp
    ./Assets/Bridges/bridges00064.webp
    ./Assets/Bridges/bridges00067.webp
    ./Assets/Bridges/bridges00070.webp
    ./Assets/Bridges/bridges00073.webp
    ./Assets/Bridges/bridges00076.webp
    ./Assets/Bridges/bridges00079.webp
    ./Assets/Bridges/bridges00082.webp
    ./Assets/Bridges/bridges00085.webp
    ./Assets/Bridges/bridges00088.webp
    ./Assets/Bridges/bridges00091.webp
    ./Assets/Bridges/bridges00094.webp
    ./Assets/Bridges/bridges00097.webp
    ./Assets/Bridges/bridges00100.webp
    ./Assets/Bridges/bridges00103.webp
    ./Assets/Bridges/bridges00106.webp
    ./Assets/Bridges/bridges00109.webp
    ./Assets/Bridges/bridges00112.webp
    ./Assets/Bridges/bridges00115.webp
    ./Assets/Bridges/bridges00118.webp
    ./Assets/Bridges/bridges00121.webp
    ./Assets/Bridges/bridges00124.webp
    ./Assets/Bridges/bridges00127.webp
    ./Assets/Bridges/bridges00130.webp
    ./Assets/Bridges/bridges00133.webp
    ./Assets/Bridges/bridges00136.webp
    ./Assets/Bridges/bridges00139.webp
    ./Assets/Bridges/bridges00142.webp
    ./Assets/Bridges/bridges00145.webp
    ./Assets/Bridges/bridges00148.webp
    ./Assets/Bridges/bridges00151.webp
    ./Assets/Bridges/bridges00154.webp
    ./Assets/Bridges/bridges00157.webp
    ./Assets/Bridges/bridges00160.webp
    ./Assets/Bridges/bridges00163.webp
    ./Assets/Bridges/bridges00166.webp
    ./Assets/Bridges/bridges00169.webp
    ./Assets/Bridges/bridges00172.webp
    ./Assets/Bridges/bridges00175.webp
    ./Assets/Bridges/bridges00178.webp
    ./Assets/Bridges/bridges00181.webp
    ./Assets/Bridges/bridges00184.webp
    ./Assets/Bridges/bridges00187.webp
    ./Assets/Bridges/bridges00190.webp
    ./Assets/Bridges/bridges00193.webp
    ./Assets/Bridges/bridges00196.webp
    ./Assets/Bridges/bridges00199.webp
    ./Assets/Bridges/bridges00202.webp
      `;
    return data.split("\n")[index];
  }

  const frameCount = 52;

  const images = [];
  const imageSeq = {
    frame: 0,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page5`,
      scroller: `#main`,
      start: `top top`,
      end: `250% top`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: "#page5",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvasBridge();

let FourthSection = document.querySelector('#page6 h2').textContent.split(" ");
let camperTextTFour = '';
for (let i = 0; i < FourthSection.length; i++) {
  camperTextThird += ` <span>${ThirdSection[i]}</span>`
  document.querySelector('#page6 h2').innerHTML = camperTextThird;
}

gsap.to("#page6 h2 span", {
  scrollTrigger: {
    trigger: `#page6 h2 span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5,
  },
  stagger: .2,
  color: '#fff'
});

gsap.to(".page7-cir", {
  scrollTrigger: {
    trigger: `.page7-cir`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5
  },
  scale: 1.5
});

gsap.to(".page7-cir-inner", {
  scrollTrigger: {
    trigger: `.page7-cir-inner`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5
  },
  backgroundColor: `#0a3bce91`,
})

function canvasDocs() {
  const canvas = document.querySelector("#page7>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
    https://thisismagma.com/assets/home/lore/seq/1.webp?2
    https://thisismagma.com/assets/home/lore/seq/2.webp?2
    https://thisismagma.com/assets/home/lore/seq/3.webp?2
    https://thisismagma.com/assets/home/lore/seq/4.webp?2
    https://thisismagma.com/assets/home/lore/seq/5.webp?2
    https://thisismagma.com/assets/home/lore/seq/6.webp?2
    https://thisismagma.com/assets/home/lore/seq/7.webp?2
    https://thisismagma.com/assets/home/lore/seq/8.webp?2
    https://thisismagma.com/assets/home/lore/seq/9.webp?2
    https://thisismagma.com/assets/home/lore/seq/10.webp?2
    https://thisismagma.com/assets/home/lore/seq/11.webp?2
    https://thisismagma.com/assets/home/lore/seq/12.webp?2
    https://thisismagma.com/assets/home/lore/seq/13.webp?2
    https://thisismagma.com/assets/home/lore/seq/14.webp?2
    https://thisismagma.com/assets/home/lore/seq/15.webp?2
    https://thisismagma.com/assets/home/lore/seq/16.webp?2
    https://thisismagma.com/assets/home/lore/seq/17.webp?2
    https://thisismagma.com/assets/home/lore/seq/18.webp?2
    https://thisismagma.com/assets/home/lore/seq/19.webp?2
    https://thisismagma.com/assets/home/lore/seq/20.webp?2
    https://thisismagma.com/assets/home/lore/seq/21.webp?2
    https://thisismagma.com/assets/home/lore/seq/22.webp?2
    https://thisismagma.com/assets/home/lore/seq/23.webp?2
    https://thisismagma.com/assets/home/lore/seq/24.webp?2
    https://thisismagma.com/assets/home/lore/seq/25.webp?2
    https://thisismagma.com/assets/home/lore/seq/26.webp?2
    https://thisismagma.com/assets/home/lore/seq/27.webp?2
    https://thisismagma.com/assets/home/lore/seq/28.webp?2
    https://thisismagma.com/assets/home/lore/seq/29.webp?2
    https://thisismagma.com/assets/home/lore/seq/30.webp?2
    https://thisismagma.com/assets/home/lore/seq/31.webp?2
    https://thisismagma.com/assets/home/lore/seq/32.webp?2
    https://thisismagma.com/assets/home/lore/seq/33.webp?2
    https://thisismagma.com/assets/home/lore/seq/34.webp?2
    https://thisismagma.com/assets/home/lore/seq/35.webp?2
    https://thisismagma.com/assets/home/lore/seq/36.webp?2
    https://thisismagma.com/assets/home/lore/seq/37.webp?2
    https://thisismagma.com/assets/home/lore/seq/38.webp?2
    https://thisismagma.com/assets/home/lore/seq/39.webp?2
    https://thisismagma.com/assets/home/lore/seq/40.webp?2
    https://thisismagma.com/assets/home/lore/seq/41.webp?2
    https://thisismagma.com/assets/home/lore/seq/42.webp?2
    https://thisismagma.com/assets/home/lore/seq/43.webp?2
    https://thisismagma.com/assets/home/lore/seq/44.webp?2
    https://thisismagma.com/assets/home/lore/seq/45.webp?2
    https://thisismagma.com/assets/home/lore/seq/46.webp?2
    https://thisismagma.com/assets/home/lore/seq/47.webp?2
    https://thisismagma.com/assets/home/lore/seq/48.webp?2
    https://thisismagma.com/assets/home/lore/seq/49.webp?2
    https://thisismagma.com/assets/home/lore/seq/50.webp?2
    https://thisismagma.com/assets/home/lore/seq/51.webp?2
    https://thisismagma.com/assets/home/lore/seq/52.webp?2
    https://thisismagma.com/assets/home/lore/seq/53.webp?2
    https://thisismagma.com/assets/home/lore/seq/54.webp?2
    https://thisismagma.com/assets/home/lore/seq/55.webp?2
    https://thisismagma.com/assets/home/lore/seq/56.webp?2
    https://thisismagma.com/assets/home/lore/seq/57.webp?2
    https://thisismagma.com/assets/home/lore/seq/58.webp?2
    https://thisismagma.com/assets/home/lore/seq/59.webp?2
    https://thisismagma.com/assets/home/lore/seq/60.webp?2
    https://thisismagma.com/assets/home/lore/seq/61.webp?2
    https://thisismagma.com/assets/home/lore/seq/62.webp?2
    https://thisismagma.com/assets/home/lore/seq/63.webp?2
    https://thisismagma.com/assets/home/lore/seq/64.webp?2
    https://thisismagma.com/assets/home/lore/seq/65.webp?2
    https://thisismagma.com/assets/home/lore/seq/66.webp?2
    https://thisismagma.com/assets/home/lore/seq/67.webp?2
    https://thisismagma.com/assets/home/lore/seq/68.webp?2
    https://thisismagma.com/assets/home/lore/seq/69.webp?2
    https://thisismagma.com/assets/home/lore/seq/70.webp?2
    https://thisismagma.com/assets/home/lore/seq/71.webp?2
    https://thisismagma.com/assets/home/lore/seq/72.webp?2
    https://thisismagma.com/assets/home/lore/seq/73.webp?2
    https://thisismagma.com/assets/home/lore/seq/74.webp?2
    https://thisismagma.com/assets/home/lore/seq/75.webp?2
    https://thisismagma.com/assets/home/lore/seq/76.webp?2
    https://thisismagma.com/assets/home/lore/seq/77.webp?2
    https://thisismagma.com/assets/home/lore/seq/78.webp?2
    https://thisismagma.com/assets/home/lore/seq/79.webp?2
    https://thisismagma.com/assets/home/lore/seq/80.webp?2
    https://thisismagma.com/assets/home/lore/seq/81.webp?2
    https://thisismagma.com/assets/home/lore/seq/82.webp?2
    https://thisismagma.com/assets/home/lore/seq/83.webp?2
    https://thisismagma.com/assets/home/lore/seq/84.webp?2
    https://thisismagma.com/assets/home/lore/seq/85.webp?2
    https://thisismagma.com/assets/home/lore/seq/86.webp?2
    https://thisismagma.com/assets/home/lore/seq/87.webp?2
    https://thisismagma.com/assets/home/lore/seq/88.webp?2
    https://thisismagma.com/assets/home/lore/seq/89.webp?2
    https://thisismagma.com/assets/home/lore/seq/90.webp?2
    https://thisismagma.com/assets/home/lore/seq/91.webp?2
    https://thisismagma.com/assets/home/lore/seq/92.webp?2
    https://thisismagma.com/assets/home/lore/seq/93.webp?2
    https://thisismagma.com/assets/home/lore/seq/94.webp?2
    https://thisismagma.com/assets/home/lore/seq/95.webp?2
    https://thisismagma.com/assets/home/lore/seq/96.webp?2
    https://thisismagma.com/assets/home/lore/seq/97.webp?2
    https://thisismagma.com/assets/home/lore/seq/98.webp?2
    https://thisismagma.com/assets/home/lore/seq/99.webp?2
    https://thisismagma.com/assets/home/lore/seq/100.webp?2
    https://thisismagma.com/assets/home/lore/seq/101.webp?2
    https://thisismagma.com/assets/home/lore/seq/102.webp?2
    https://thisismagma.com/assets/home/lore/seq/103.webp?2
    https://thisismagma.com/assets/home/lore/seq/104.webp?2
    https://thisismagma.com/assets/home/lore/seq/105.webp?2
    https://thisismagma.com/assets/home/lore/seq/106.webp?2
    https://thisismagma.com/assets/home/lore/seq/107.webp?2
    https://thisismagma.com/assets/home/lore/seq/108.webp?2
    https://thisismagma.com/assets/home/lore/seq/109.webp?2
    https://thisismagma.com/assets/home/lore/seq/110.webp?2
    https://thisismagma.com/assets/home/lore/seq/111.webp?2
    https://thisismagma.com/assets/home/lore/seq/112.webp?2
    https://thisismagma.com/assets/home/lore/seq/113.webp?2
    https://thisismagma.com/assets/home/lore/seq/114.webp?2
    https://thisismagma.com/assets/home/lore/seq/115.webp?2
    https://thisismagma.com/assets/home/lore/seq/116.webp?2
    https://thisismagma.com/assets/home/lore/seq/117.webp?2
    https://thisismagma.com/assets/home/lore/seq/118.webp?2
    https://thisismagma.com/assets/home/lore/seq/119.webp?2
    https://thisismagma.com/assets/home/lore/seq/120.webp?2
    https://thisismagma.com/assets/home/lore/seq/121.webp?2
    https://thisismagma.com/assets/home/lore/seq/122.webp?2
    https://thisismagma.com/assets/home/lore/seq/123.webp?2
    https://thisismagma.com/assets/home/lore/seq/124.webp?2
    https://thisismagma.com/assets/home/lore/seq/125.webp?2
    https://thisismagma.com/assets/home/lore/seq/126.webp?2
    https://thisismagma.com/assets/home/lore/seq/127.webp?2
    https://thisismagma.com/assets/home/lore/seq/128.webp?2
    https://thisismagma.com/assets/home/lore/seq/129.webp?2
    https://thisismagma.com/assets/home/lore/seq/130.webp?2
    https://thisismagma.com/assets/home/lore/seq/131.webp?2
    https://thisismagma.com/assets/home/lore/seq/132.webp?2
    https://thisismagma.com/assets/home/lore/seq/133.webp?2
    https://thisismagma.com/assets/home/lore/seq/134.webp?2
    https://thisismagma.com/assets/home/lore/seq/135.webp?2
    https://thisismagma.com/assets/home/lore/seq/136.webp?2
      `;
    return data.split("\n")[index];
  }

  const frameCount = 136;

  const images = [];
  const imageSeq = {
    frame: 0,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page7`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page7",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvasDocs();

gsap.from('#page9 h2', {
  rotate: 360,
  scrollTrigger: {
    trigger: '#page8',
    scroller: '#main',
    scrub: .5,
    once: true,
  }
});

gsap.from('#page9 img', {
  rotate: 180,
  scrollTrigger: {
    trigger: '#page8',
    scroller: '#main',
    scrub: .5,
    once: true,
  }
});


