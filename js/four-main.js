


//创作馆
let fanart = (function(){
  let box = document.querySelector('.four_left .box');
  let data;
  const getData = function getData(){
      axios.get('./json/mock/creation_hall.json').then(res=>{
        //  console.log(res);
         data= res.data;
         binding(data)
      }).catch(error=>{
         console.log(err);
      })
  }
  getData();
  const binding = function binding(){
     let str = ``;
     data.forEach(item=>{
         let {pic,title,href,author,authorHref,fabulous} = item;
         str += `  <li>
                               <a href="${href}">
                                   <img src="${pic}" alt="">
                               </a>
                               <div class="inner_hover">
                                   <h4 class="p1">
                                       <a href="">
                                          ${title}
                                       </a>
                                   </h4>
                                   <p class="p2">
                                       <a href="${authorHref}" class="a1">
                                           <img src="" alt="">
                                           ${author}
                                       </a>
                                       <a href="" class="a2">
                                           <i class="icon-666"></i>
                                           <span class="number">${fabulous}</span>
                                           <span class="tip">+1</span>
                                       </a>
                                   </p>
                               </div>
                           </li>`
     });
     box.innerHTML = str;
  }
})()

//合作媒体
let asso_media = (function(){
    let data;
    let ul = document.querySelector('.swiper-container-ul');
    const getData = function getData(){
        axios.get('./json/mock/asso_media.json').then(res=>{
             data = res.data;
             binding(data)
        }).catch(err=>{
             console.log(err);
        })
    };
    getData();
    const binding = function binding(data){
         let str = '';
         data.forEach(item=>{
             str += `<li>
                                               <a href="${item.href}">
                                                   ${item.title}
                                               </a>
                                           </li>`
         });
         ul.innerHTML = str;
    }
})()