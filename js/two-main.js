/* new-video */
let new_video = (function () {
    let tabBox = document.querySelector('.newVideo');
    let tab = tabBox.querySelector('.tab');
    let box = tabBox.querySelector('.box');
    let boxList;
    let tabList;
    let arr = []
    let data = [];
    const getData = function getData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/mock/latest_video.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
                //  console.log(data);
            }
        }
        xhr.send()
    }
    getData();
    let ary = []
    const binding = function binding() {
        let str1 = '';
        let str2 = '';
        //    let ary = []
        data.forEach((item, index) => {
            let str3 = '';
            str1 += `<li class="${index===0?'active':''} btn" index='${index}'>${item.name}</li>`;
            str2 += `<ul class="boxList ${index===0?'active':''}">
                    </ul>`;
            item.data.forEach((item, index) => {
                let {
                    background,
                    pic,
                    videoLength,
                    title,
                    playTimes,
                    updateTime
                } = item;
                ary.push(background)
                // console.log(background);
                // let li = document.createElement('li');
                // li.my_bg = background;
                // li.classList.add('active','bian');
                str3 += `<li class="active bian">
                                       <div class="mask-img">
                                         <img src="${pic}" alt="">
                                         <div class="wrap">
                                             <img src="${background?background[0]:pic}"
                                             alt="" class="xiao_img"/>
                                             <span class="bg bgg"></span>
                                             <span class="bar">
                                                 <i class="line_box"></i>
                                             </span>
                                         </div>
                                     </div>
                                     <a href="" class="video-length">
                                        ${videoLength}
                                     </a>
                                     <p class="name-video">
                                         <a href="">
                                            ${title}
                                         </a>
                                     </p>
                                     <a href="" class="play-time">
                                         ${playTimes}
                                     </a>
                                     <a href="" class="update-time">
                                        ${updateTime}
                                     </a>
                                </li>
                                `
                // li.innerHTML += str3;
                // arr.push(li);
                // ary.push(background);
                // console.log(ary);
            });
            arr.push(str3);

        });
        tab.innerHTML = str1;
        box.innerHTML = str2;
        boxList = box.querySelectorAll('ul');
        boxList.forEach((item, index) => {
            item.innerHTML = arr[index];
            // arr.forEach(li=>{
            //     item.appendChild(li);
            // })    
        });
        tabList = tab.querySelectorAll('li');
    }
    binding()
    let prevIndex = 0;
    tabBox.addEventListener('mouseover', function (e) {
        let target = e.target;
        if (target.tagName === "LI" && target.className.includes('btn')) {
            // console.log(1);
            let index = +target.getAttribute('index');
            if (prevIndex === index) return
            tabList[index].classList.add('active')
            tabList[prevIndex].classList.remove('active')
            boxList[index].classList.add('active');
            boxList[prevIndex].classList.remove('active')
            prevIndex = index;
        }
    });



    let li = tabBox.querySelectorAll('.bian');
    //  console.log(li.data-img);
    let wrap = tabBox.querySelectorAll('.wrap');
    let bg = tabBox.querySelectorAll('.xiao_img');
    //  console.log(bg);
    let line = tabBox.querySelectorAll('.bgg');
    //  console.log(line);
    let line_box = tabBox.querySelectorAll('.line_box');
    //  console.log(line_box);

    for (let i = 0; i < li.length; i++) {
        li[i].background = ary[i];
    }
    
    for (let i = 0; i < li.length; i++) {
      
        li[i].addEventListener('mousemove', function (e) {
            let w = e.pageX - li[i].offsetLeft - 70;
            //    console.log(w);
            if (w < 40) {
                // console.log(li[i].background[0]);
               
                bg[i].src = li[i].background ? li[i].background[1] : "https://puui.qpic.cn/vpic/0/y32241ubhhp_640_360_1.jpg/0";
            } else if (w >= 40 && w < 80) {
               
                 bg[i].src = li[i].background ? li[i].background[2] : "https://puui.qpic.cn/vpic/0/y32241ubhhp_640_360_3.jpg/0";
            } else if (w >= 80 && w < 120) {
               
                 bg[i].src = li[i].background ? li[i].background[3] : "https://puui.qpic.cn/vpic/0/y32241ubhhp_640_360_5.jpg/0";
            } else if (w >= 120 && w < 160) {
              
                 bg[i].src = li[i].background ? li[i].background[4] : "https://puui.qpic.cn/vpic/0/y32241ubhhp_640_360_7.jpg/0";
            }
            line_box[i].style.width = w + 'px';
            wrap[i].style.display = 'block';
        })
        li[i].addEventListener('mouseleave', function (e) {
            wrap[i].style.display = 'none';
        })

    }
    // console.log(li);





})();

/* 热门专辑 */
let hot_program = (function () {
    let tabBox = document.querySelector('.hotProgram');
    let tab = tabBox.querySelector('.tab');
    let box = tabBox.querySelector('.box');
    let boxList;
    let tabList;
    let arr = []
    let data = [];
    const getData = function getData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/mock/hit_album.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
                //  console.log(data);
            }
        }
        xhr.send()
    }
    getData();
    const binding = function binding() {
        let str1 = '';
        let str2 = '';
        data.forEach((item, index) => {
            let str3 = '';
            str1 += `<li class="${index===0?'active':''} btn" index='${index}'>${item.name}</li>`;
            str2 += `<ul class="boxList ${index===0?'active':''}"><li class="wrapper"> </li></ul>
                     <span class = "prev arrow-left pagination"></span> 
                     <span class = "next arrow-right pagination"></span>`;
            item.data.forEach((item, index) => {
                str3 += `    
                                    <section class="slide">
                                         <div>
                                             <img src="${item.pic}" alt="">
                                             <h4>${item.title}</h4>
                                             <p>${item.updateTime}</p>
                                             <a href=""></a>
                                             <a href="" class="name_progress">
         ${item.description}  </a>
                                             <a href="" class="author-program">
                                                 <img src="${item.authorPic}" alt="">
                                               ${item.author}
                                             </a>
                                         </div>
                                         <div>
                                             <img src="${item.pic}" alt="">
                                             <h4>${item.title}</h4>
                                             <p>${item.updateTime}</p>
                                             <a href=""></a>
                                             <a href="" class="name_progress">
         ${item.description}  </a>
                                             <a href="" class="author-program">
                                                 <img src="${item.authorPic}" alt="">
                                               ${item.author}
                                             </a>
                                         </div>
                                         <div>
                                             <img src="${item.pic}" alt="">
                                             <h4>${item.title}</h4>
                                             <p>${item.updateTime}</p>
                                             <a href=""></a>
                                             <a href="" class="name_progress">
         ${item.description}  </a>
                                             <a href="" class="author-program">
                                                 <img src="${item.authorPic}" alt="">
                                               ${item.author}
                                             </a>
                                         </div>
                                    </section>
                                `
            });
            arr.push(str3);
        });
        tab.innerHTML = str1;
        box.innerHTML = str2;
        boxList = box.querySelectorAll('ul');
        boxList.forEach((item, index) => {
            item.firstElementChild.innerHTML = arr[index];
        });
        tabList = tab.querySelectorAll('li');
    }
    binding()
    let prevIndex = 0;
    tabBox.addEventListener('mouseover', function (e) {
        let target = e.target;
        if (target.tagName === "LI" && target.className.includes('btn')) {
            console.log(1);
            let index = +target.getAttribute('index');
            if (prevIndex === index) return
            tabList[index].classList.add('active')
            tabList[prevIndex].classList.remove('active')
            boxList[index].classList.add('active');
            boxList[prevIndex].classList.remove('active')
            prevIndex = index;
        }
    });

    //====================================
    let banner = document.querySelector('.hotProgram .boxList');
    // console.log(banner);
    let wrapper = banner.querySelector('.wrapper');
    // console.log(wrapper);
    let pagination = box.querySelectorAll('.pagination');
    // console.log(pagination);
    let slide = wrapper.querySelectorAll('.slide');
    // console.log(slide);
    // console.log(banner1,wrapper1,pagination);
    let step = 0;
    let count = slide.length;
    // console.log(count);
    wrapper.style.width = `${count*100}%`;
    let distance = banner.offsetWidth;
    // console.log(distance);
    let autoTimer;
    // let pagList = ;
    
    const changes = function changes(dir) {
        if (dir != null) {
            if (dir === 'right') {
                step++;
                if (step > count - 1) {
                    wrapper.style.transitionDuration = '0s';
                    wrapper.style.left = '0px';
                    w = banner.offsetWidth;
                    step = 1;
                }
            }else{
                 step--;
                 if (step < 0) {
                     wrapper.style.transitionDuration = '0s';
                     wrapper.style.left = `${-(count-1)*distance}px`;
                     w = banner.offsetWidth;
                     step = count-2;
                 }
            }
        };
        wrapper.style.transitionDuration = '0.3s';
        wrapper.style.left = `${-step*distance}px`;
    }
  
    autoTimer = setInterval(changes.bind(null, 'right'), 2000);
     changes();
    tabBox.addEventListener('click', function (e) {
        let target = e.target;
        let cla = target.className;
        let tag = target.tagName;
          if (tag === 'SPAN' && cla.includes('pagination')) {
              cla.includes('prev') ? changes('left') : changes('right');
                            console.log(1);

          }

    })
   


})();