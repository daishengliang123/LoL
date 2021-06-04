/* main 热门活动板块 滑动选项卡 */
let tab2 = (function () {
    let tabBox = document.querySelector('.hot-active');
    let tab = tabBox.querySelector('.tab');
    let box = tabBox.querySelector('.box');
    let boxList;
    let tabList;
    let arr = []
    let data = [];
    const getData = function getData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/mock//hot_events.json', false);
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
                str3 += ` <li>
                                        <img src="${item.pic}" alt="">
                                        <p>${item.title}</p>
                                        <a href="">
                                            ${item.overTime}
                                        </a>
                                        <div class="mask">
                                            <i></i>
                                            <h4 class="p1">
                                                ${item.title}
                                            </h4>
                                            <p class="p2">
                                               ${item.desc}
                                            </p>
                                            <p class="p2">
                                                开启时间: ${item.explain}
                                            </p>
                                        </div>
                                    </li>`
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
            console.log(1);
            let index = +target.getAttribute('index');
            if (prevIndex === index) return
            tabList[index].classList.add('active')
            tabList[prevIndex].classList.remove('active')
            boxList[index].classList.add('active');
            boxList[prevIndex].classList.remove('active')
            prevIndex = index;
        }
    })
})();


/* 热门皮肤 */
let show = (function(){
    let new_skin = document.querySelector('.new-skin');
    let erwai = document.querySelector('.erwai');
    new_skin.addEventListener('mouseenter',function(){
        erwai.style.height = '117px';
    })
    erwai.addEventListener('mouseleave',function(){
        erwai.style.height = '0px';
    });
    let data;
      const getData = function getData() {
          axios.get('./json/mock/skin.json').then(res => {
              data = res.data;
              binding(data)
          }).catch(err => {
              console.log(err);
          })
      };
      getData();
      const binding = function binding(data) {
          let str = '';
          data.forEach(item => {
              str += `<li><img src="${item.pic}" alt="${item.skin}"><a href = "${item.href}" title="${item.skin}"></a></li>`
          });
          erwai.innerHTML = str;
      }
})();


let zhoumian = (function(){
    let zhou_mian = document.querySelector('.zhoumain');
    let ul = zhou_mian.querySelector('ul');
     let data;
     const getData = function getData() {
         axios.get('./json/mock/week_free.json').then(res => {
             data = res.data;
             binding(data)
         }).catch(err => {
             console.log(err);
         })
     };
     getData();
     const binding = function binding(data) {
         let str = '';
         data.forEach(item => {
             str += ` <li>
                                                <img src="${item.pic}" alt="${item.name}">
                                                <a href = "${item.href}"
                                                title="${item.name}"> </a>
                                            </li>`
         });
        ul.innerHTML = str;
     }
})()