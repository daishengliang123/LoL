 /* 滑动官网导航子菜单出现 */
 let mouseover = (function(){
     $('.header-nav .header-nav-list')[0].onmouseover = function(){
         $('.head_nav_sub')[0].classList.add('show')
     }
      $('.head_nav_sub')[0].onmouseout = function(){
           $('.head_nav_sub')[0].classList.remove('show')
      }
   
      
      $('.header-nav .phone')[0].onmouseenter = function(){
          $('.hover_phone')[0].classList.add('show')
      }
      $('.hover_phone')[0].onmouseleave = function () {
          $('.hover_phone')[0].classList.remove('show')
      }
      $('.header-nav .header-user')[0].onmouseenter = function () {
          $('.head_login_hover')[0].classList.add('show')
      }
      $('.head_login_hover')[0].onmouseleave = function () {
          $('.head_login_hover')[0].classList.remove('show')
      }

      

 })()

 /* 点击搜索框出现 */
 let search = (function(){
     let search_icon = document.querySelector('.header-nav .search');
     let search_hover = document.querySelector('.search-hover');
     let search_close = search_hover.querySelector('.btn-close');
     let search_hover_bottom = search_hover.querySelector('.search-hover-bottom');
     let search_href = search_hover_bottom.querySelector('.search-href');
     let clear = search_hover_bottom.querySelector('.clear');
     let inp = search_hover.querySelector('input');
     
    search_icon.addEventListener('click',function(){
        search_hover.style.display = 'block';
          if (search_href.firstElementChild) {
              search_hover_bottom.style.display = 'block'
          } else {
              search_hover_bottom.style.display = 'none'
          }
          
    })
    search_close.addEventListener('click',function(){
        search_hover.style.display = 'none';
    })
    inp.addEventListener('keydown',function(e){
        if(e.keyCode === 13){
            // search_hover.style.display = 'none';
            let val = inp.value;
            let li =  document.createElement('li');
            li.innerHTML = val;
            search_href.appendChild(li);
            inp.value = null;
        }
         if (search_href.firstElementChild) {
             search_hover_bottom.style.display = 'block'
         } else {
             search_hover_bottom.style.display = 'none'
         }
    });

    clear.addEventListener('click',function(){
            search_hover_bottom.style.display = 'none';
            search_href.innerHTML = null;
    })


 })()
 
 /* 更改背景图 */
 let changeBg = (function () {
    //  console.log(1);
     let bg = document.querySelector('.header-bg');
     let btn = bg.querySelector('.btn-bg');
    window.addEventListener('scroll',function(e){
          bg.style.transitionDuration = '0.5s'
          bg.style.height = '360px';
          bg.style.backgroundImage = 'url(./img/bg1.jpg)';
          btn.style.bottom = '20px'
    })
    //  console.log(2);
 })()

 /* 首页轮播图 */
 let banner = (function () {
     let banner = document.querySelector('.banner1');
     let wrapper = banner.querySelector('.wrapper1');
     let pagination = banner.querySelector('.pagination');
     // console.log(banner1,wrapper1,pagination);
     let step = 0;
     let count;
     let distance = banner.offsetWidth;
     let autoTimer;
     let pagList;
     const binding = function binding() {
         let str1 = '';
         let str2 = '';
         let data = '';
         let xhr = new XMLHttpRequest;
         xhr.open('GET', './json/mock/home_banner.json', false);
         xhr.onreadystatechange = function () {
             if (xhr.readyState === 4 && xhr.status === 200) {
                 data = JSON.parse(xhr.responseText);
             }
         }
         xhr.send();
         data.push(data[0]);
         data.forEach((item, index) => {
             str1 += `<li class="slide">
                            <a href="">
                                <img src="${item.pic}" alt="">
                            </a>
                        </li>`;
             if (index < data.length - 1) {
                 str2 += `<span index=${index} class="${index===0?'active':''}">${item.title}</span>`
             }
         });
         wrapper.innerHTML = str1;
         pagination.innerHTML = str2;

         count = data.length;
         wrapper.style.width = `${count*100}%`;

         pagList = pagination.querySelectorAll('span');
     }
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
             }
         };
         wrapper.style.transitionDuration = '0.3s';
         wrapper.style.left = `${-step*distance}px`;
         onFocus();
     }
     const onFocus = function onFocus() {
         let temp = step;
         if (temp === count - 1) temp = 0;
         pagList.forEach((item, index) => {
             if (index === temp) {
                 item.className = 'active';
                 return
             };
             item.className = '';
         })
     }
     autoTimer = setInterval(changes.bind(null, 'right'), 2000)
     banner.addEventListener('mouseover', function (e) {
         let target = e.target;
         let cla = target.className;
         let tag = target.tagName;
         if (tag === "SPAN") {
             let index = +target.getAttribute('index');

             if (step === index || index === 0 && step === count - 1) return
             step = index;
             changes()
         }

     })
     binding();
     changes();

 })()

 /* 首页滑动选项卡 */
 let tab = (function () {
     let tabBox = document.querySelector('.banner2');
     let tab = tabBox.querySelector('.tab');
     let box = tabBox.querySelector('.banner2 .box');
     let boxList;
     let tabList;
     let arr = []
     let data = [];
     const getData = function getData() {
         let xhr = new XMLHttpRequest;
         xhr.open('GET', './json/mock/news_item.json', false);
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
             str2 += `<ul class="${index===0?'active':''}">
                    </ul>`;
             item.data.forEach((item, index) => {
                 str3 += `
                             <li class="item ${index===0?'first':''}">
                                 <span>${item.type}</span>
                                 <a href="">
                                   ${item.title}
                                 </a>
                                 <span>${item.time}</span>
                             </li> `
             });
             arr.push(str3);
         });
         tab.innerHTML = str1;
         box.innerHTML = str2;
         boxList = box.querySelectorAll('ul');
         boxList.forEach((item, index) => {
             item.innerHTML = arr[index];
         });
         tabList = tab.querySelectorAll('li');
     }
     binding()
     let prevIndex = 0;
     tabBox.addEventListener('mouseover', function (e) {
         let target = e.target;
         if (target.tagName === "LI" && target.className.includes('btn')) {
             let index = +target.getAttribute('index');
             if (prevIndex === index) return
             tabList[index].classList.add('active')
             tabList[prevIndex].classList.remove('active')
             boxList[index].classList.add('active');
             boxList[prevIndex].classList.remove('active')
             prevIndex = index;
         }
     })
 })()



 
 