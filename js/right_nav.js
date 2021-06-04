let right_nav = (function(){
    let nav = document.querySelector('.right_nav');
    let ul = nav.querySelector('ul');
    let tip = nav.querySelector('.tip');
    let run = [...(document.querySelectorAll('.run'))];
    // console.log(run);
    let act = Array.from(ul.querySelectorAll('.act'));
    // console.log(act);
//    console.log(nav);
   window.addEventListener('load',function(){
        nav.style.right = '0px'
   })
   window.addEventListener('scroll',function(){
         if (document.documentElement.scrollTop >= 50) {
             tip.style.animation = 'showPolo 1.4s .2s ease 1';
             ul.style.height = 320 + 'px';
         } else {
             tip.style.animation = 'none';
             ul.style.height = 227 + 'px';
         }
    /*   let ob = new IntersectionObserver(changes=>{
          changes.forEach((change,index)=>{
              let {
                  isIntersecting,
                  target
              } = change;
              if(isIntersecting){
                  addClass(target);
                  ob.unobserve(target)
              }
          })
      },{
          threshold:[0.5]
      });
    

      run.forEach(item=>{
            ob.observe(item);
      })

      const addClass = function(target){
          console.log(target);
          let myIndex = +target.getAttribute('data-index');
          act.forEach((item,index)=>{
              if(index === myIndex){
                  item.classList.add('active');
                  return;
              }
              item.className = '';
          })
      }
     
 */

          const removeClass = function () {
              if (document.documentElement.scrollTop === 0) {
                  act.forEach(item => {
                      item.classList.remove('active')
                  })
              }
          }
          removeClass();
     
    }); 

     $(function () {
         // 当我们点击了小li 此时不需要执行 页面滚动事件里面的 li 的背景选择 添加 current
         // 节流阀  互斥锁 
       var flag = true;

         $(window).scroll(function () {
            //  toggleTool();
             // 3. 页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名
             if (flag) {
                 $("#content .run").each(function (i, ele) {
                     if ($(document).scrollTop() >= $(ele).offset().top) {
                        //  console.log(i);
                         $(".fixedtool li").eq(i).addClass("active").siblings().removeClass();

                     }
                 })
             }
         });
         // 2. 点击电梯导航页面可以滚动到相应内容区域
         $(".fixedtool li").click(function () {
             flag = false;
             console.log($(this).index());
             // 当我们每次点击小li 就需要计算出页面要去往的位置 
             // 选出对应索引号的内容区的盒子 计算它的.offset().top
             var current = $("#content .run").eq($(this).index()).offset().top;
             // 页面动画滚动效果
             $("body, html").stop().animate({
                 scrollTop: current
             }, function () {
                 flag = true;
             });
            //  $('.tip').stop.animate({scrollTop : 0})
             // 点击之后，让当前的小li 添加current 类名 ，姐妹移除current类名
             $(this).addClass("active").siblings().removeClass();
         })
     })


     $(tip).click(function(){
          $("body, html").stop().animate({
              scrollTop: 0
          }, function () {
              flag = true;
          });
     })
     
})()