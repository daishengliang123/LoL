let tabClick = (function () {
    let three = document.querySelector('.right_nav_three');
    let tab = three.querySelectorAll('.btn');
    let box = three.querySelector('.slide');

    let data;
    const getData = function getData() {
        axios.get('./json/mock/hero_info.json').then(result => {
            data = result.data
            binding(result.data);
        }).catch(error => {
            console.log(error);
        })
    }
    getData()

    const binding = function binding(data) {
        let str = ``
        data.forEach((item, index) => {
            let {
                heroLogo,
                hero,
                type,
                href
            } = item;
            // console.log(type);
            str += `  <li>
                                    <img src="${heroLogo}" alt="${hero}">
                                    <i></i>
                                    <p>${hero}</p>
                                    <a href="${href}" title="${hero}"></a>
                                </li>`
        });
        box.innerHTML = str;
    }
    let prevIndex = 0;
    three.addEventListener('click', function (e) {
        let target = e.target;
        let tagname = target.tagName;
        let clname = target.className;
        if (tagname === "LI" && clname.includes('btn')) {
            let index = +target.getAttribute('data-index');
            let type = target.getAttribute('data-type');
            console.log(type);
            if (prevIndex === index) return
            tab[index].classList.add('active');
            tab[prevIndex].classList.remove('active');
            prevIndex = index;
           
            let res = data.filter(item=>{
                 return item.type.includes(type)
            })
            binding(res);
            if (type === "all") binding(data);

        }

    })
})()