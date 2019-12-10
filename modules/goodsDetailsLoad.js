define(() => {
    'use strict';

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

    class DetailLoad {
        constructor() {
            // 图片列表
            this.picLists = document.querySelector(".imgList ul");
            //主要图片
            this.mainPic = document.querySelector(".picShow-container img");
            //被放大的图片
            this.bigPic = document.querySelector(".picBig img");
            //名字
            this.nameCont = document.querySelector(".name");
            //简要
            this.discriptionCont = document.querySelector(".discription");
            //价格
            this.priceCont = document.querySelector(".price-container");
            //详情图片
            this.detailsCont = document.querySelector(".body");
            this.id = getQueryVariable("id");
            this.init();
        }
        init() {
            this.load();
        }
        load() {
            $.ajax({
                url: "http://localhost/smartisan/data/goodsList.json",
                success: (res) => {
                    this.res = res;
                    this.render();
                    // this.changeImg();
                }
            })
        }
        render() {
            let picStr = '';
            let detailStr = '';
            console.log(this.res);
            for (let i = 0; i < this.res.length; i++) {
                if (this.id == this.res[i].id) {
                    for (let j = 0; j < this.res[i].PicList.length; j++) {
                        picStr += `
                            <li>
                                <img src="${this.res[i].PicList[j]}" alt="">
                            </li>
                        `;
                    }
                    for (let j = 0; j < this.res[i].PicList.length; j++) {
                        detailStr += `
                            <img src="${this.res[i].detailInfo[j]}" alt="">
                        `;
                    }
                    this.picLists.innerHTML = picStr;
                    //主要图片
                    this.mainPic.src = this.res[i].PicList[0];
                    //被放大的图片
                    this.bigPic.src = this.res[i].PicList[0];
                    //名字
                    this.nameCont.innerHTML = this.res[i].name;
                    //简要
                    this.discriptionCont.innerHTML = this.res[i].discription;
                    //价格
                    this.priceCont.innerHTML = (+this.res[i].price).toFixed(2);
                    //详情图片
                    this.detailsCont.innerHTML = detailStr;
                }
            }
        }
    }
    return DetailLoad;
});