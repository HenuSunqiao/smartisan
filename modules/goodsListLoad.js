define(() => {
    'use strict';
    //获取地址栏参数//可以是中文参数
    function getQueryVariable(key) {
        // 获取参数
        var url = window.location.search;
        // 正则筛选地址栏
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        // 匹配目标参数
        var result = url.substr(1).match(reg);
        //返回参数值
        return result ? decodeURIComponent(result[2]) : null;
    }

    class Load {
        constructor(options) {
            this.keyWord = getQueryVariable("wd");
            this.container = document.querySelector(".lists ul");
            this.searchBox = options.searchBox;
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
                this.searchBox.value = this.keyWord;
                for (let i = 0; i < this.res.length; i++) {
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
                        <a href="http://localhost/smartisan/goodsDetails.html?id=${this.info[i].id}">
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