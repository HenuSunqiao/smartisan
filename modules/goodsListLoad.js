define(() => {
    'use strict';

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
    }

    class Load {
        constructor() {
            this.keyWord = getQueryVariable("wd");
            this.container = document.querySelector(".lists ul");
            this.info = [];
            this.init();
        }
        init() {
            this.ajaxLoad();
        }
        ajaxLoad() {
            $.ajax({
                url: "http://localhost/smartisan/data/goodsList.json",
                success: (res) => {
                    this.res = res;
                    this.search();
                }
            })
        }
        search() {
            if (this.keyWord) {
                console.log(this.keyWord)
                for (let i = 0; i < this.res.length; i++) {
                    console.log(this.res[i].name)
                    if (this.res[i].name.indexOf(this.keyWord) != -1) {
                        this.info.push(this.res[i]);
                    }
                }
            } else {
                this.info = this.res;
            }
            this.render();
        }
        render() {
            let str = "";
            for (let i = 0; i < this.info.length; i++) {
                str += `
                <li>
                        <a href="http://localhsot/smartisan/goodsDetail.html?id=${this.info[i].id}">
                            <figure class="list-pic">
                                <img src="${this.info[i].mainPic}" alt="">
                            </figure>
                            <article>
                                <h3>${this.info[i].name}</h3>
                                <h5>${this.info[i].discription}</h5>
                            </article>
                            <aside>
                                <span>￥${(+this.info[i].price).toFixed(2)}</span>
                            </aside>
                        </a>    
                    </li>
                `
                this.container.innerHTML = str;
            }
        }
    }
    return Load;
});