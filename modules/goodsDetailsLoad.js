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
            this.mainCont = document.querySelector(".picShow-container");
            this.mainPic = document.querySelector(".picShow-container img");
            //被放大的图片
            this.bigCont = document.querySelector(".picBig");
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
                    this.changeImg();
                    this.magnifier();
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
                    for (let j = 0; j < this.res[i].detailInfo.length; j++) {
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
        changeImg() {
            this.imglists = document.querySelectorAll(".imgList ul li");
            console.log(this.imglists[0])
            this.imglists[0].className = "active";
            for (let i = 0; i < this.imglists.length; i++) {
                this.imglists[i].onclick = () => {
                    console.log(1);
                    for (let j = 0; j < this.imglists.length; j++) {
                        this.imglists[j].className = "";
                    }
                    this.imglists[i].className = "active";
                    this.mainPic.src = this.imglists[i].querySelector('img').src;
                    //被放大的图片
                    this.bigPic.src = this.imglists[i].querySelector('img').src;
                }
            }
        }
        magnifier() {
            this.glass = document.querySelector('.glass');
            this.mainCont.onmouseenter = () => {
                document.onmousemove = (e) => {
                    let eve = e || window.event;
                    let target = eve.target || eve.srcElement;
                    let totalLeft = eve.pageX - offset(this.mainCont).left - this.glass.clientWidth / 2;
                    let totalTop = eve.pageY - offset(this.mainCont).top - this.glass.clientHeight / 2;
                    if (totalLeft <= 0) totalLeft = 0;
                    if (totalTop <= 0) totalTop = 0;
                    if (totalLeft >= this.mainCont.clientWidth - this.glass.clientWidth) totalLeft = this.mainCont.clientWidth - this.glass.clientWidth;
                    if (totalTop >= this.mainCont.clientHeight - this.glass.clientHeight) totalTop = this.mainCont.clientHeight - this.glass.clientHeight;
                    this.glass.style.left = totalLeft + "px";
                    this.glass.style.top = totalTop + "px";

                    let t = this.glass.clientWidth / this.bigCont.clientWidth;
                    let bigLeft = totalLeft / t;
                    let bigTop = totalTop / t;

                    this.bigPic.style.top = -bigTop + "px";
                    this.bigPic.style.left = -bigLeft + "px";
                }
            }
        }
    }
    return DetailLoad;
});

function offset(dom) {
    var obj = {
        left: 0,
        top: 0
    }
    obj.left = dom.offsetLeft;
    obj.top = dom.offsetTop;

    var offsetParent = dom.offsetParent;

    while (offsetParent != document.body) {
        obj.left += offsetParent.offsetLeft + offsetParent.clientLeft;
        obj.top += offsetParent.offsetTop + offsetParent.clientTop;
        offsetParent = offsetParent.offsetParent;
    }
    return obj;
}