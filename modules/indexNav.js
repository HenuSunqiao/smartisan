define(() => {
    'use strict';
    class Nav {
        constructor() {
            this.nav = document.querySelector("nav");
            this.navTitle = document.querySelector(".nav-container");
            this.list = this.nav.querySelector(".nav-title ul");
            this.categoryList = this.list.querySelectorAll(".category");
            this.goodsList = this.list.querySelectorAll(".goods");
            this.serviceList = this.list.querySelector(".service");
            this.wrap = document.querySelector(".nav-wrapper-show");
            this.goodsCont = this.wrap.querySelector(".goods-wrapper");
            this.categoryCont = this.wrap.querySelector(".category-wrapper");
            this.serviceCont = this.wrap.querySelector(".service-list");
            this.searchBox = this.nav.querySelector(".nav-search input");
            this.searchBtn = this.nav.querySelector(".nav-search button");
            this.init();
        }
        init() {
            this.load();
            this.addEvent();
        }
        load() {
            const p1 = $.ajax({
                url: "http://localhost/smartisan/data/categoryInfo.json",
                success: (res) => {}
            })
            const p2 = $.ajax({
                url: "http://localhost/smartisan/data/navGoodsInfo.json",
                success: (res) => {}
            })
            const p = Promise.all([p1, p2]);
            p.then((res) => {
                this.cateRes = res[0];
                this.navGoodsRes = res[1];
                this.changeTab();
            })
        }
        addEvent() {
            this.list.onmouseover = () => {
                $(this.wrap).stop().slideDown();
            }
            this.nav.onmouseleave = () => {
                $(this.wrap).stop().slideUp();
            }
            console.log(this.searchBox);
            this.searchBox.onkeydown = (e) => {
                if (e.keyCode == 13) {
                    location.href = `./goodsList.html?wd=${this.searchBox.value}`;
                }
            }
            this.searchBtn.onclick = () => {
                location.href = `./goodsList.html?wd=${this.searchBox.value}`;
            }
        }
        changeTab() {
            for (let i = 0; i < this.categoryList.length; i++) {
                this.categoryList[i].onmouseenter = () => {
                    for (let j = 0; j < this.categoryCont.parentNode.children.length; j++) {
                        this.categoryCont.parentNode.children[j].style.display = "none";
                    }
                    this.categoryCont.style.display = "flex";
                    for (let j = 0; j < this.cateRes.length; j++) {
                        if (this.cateRes[j].id == this.categoryList[i].id) {
                            let str = "";
                            for (let k = 0; k < this.cateRes[j].tables.length; k++) {
                                let listsStr = "";
                                for (let l = 0; l < this.cateRes[j].tables[k].lists.length; l++) {
                                    listsStr += `
                                    <li>
                                        <a href="">
                                            <img src="${this.cateRes[j].tables[k].lists[l].img}" alt="">
                                            <span>${this.cateRes[j].tables[k].lists[l].name}</span>
                                        </a>
                                    </li>
                                    `;
                                }
                                str += `
                                <li class="item">
                                    <div class="item-title">${this.cateRes[j].tables[k].title}</div>
                                    <div class="item-body">
                                        <ul class="item-body-list">
                                            ${listsStr}
                                        </ul>
                                    </div>
                                </li>
                                `;
                            }
                            this.categoryCont.querySelector(".category-wrapper-container").innerHTML = str;
                        }
                    }
                }
            }
            for (let i = 0; i < this.goodsList.length; i++) {
                this.goodsList[i].onmouseenter = () => {
                    for (let j = 0; j < this.goodsCont.parentNode.children.length; j++) {
                        this.goodsCont.parentNode.children[j].style.display = "none";
                    }
                    this.goodsCont.style.display = "flex";
                    for (let j = 0; j < this.navGoodsRes.length; j++) {
                        if (this.navGoodsRes[j].id == this.goodsList[i].id) {
                            let str = "";
                            for (let k = 0; k < this.navGoodsRes[j].lists.length; k++) {
                                str += `
                                <li class="item">
                                    <a href="">
                                        <img src="${this.navGoodsRes[j].lists[k].img}" alt="">
                                        <p class="name">${this.navGoodsRes[j].lists[k].name}</p>
                                        <p class="price">${this.navGoodsRes[j].lists[k].price}</p>
                                    </a>
                                </li>
                                `;
                            }
                            this.goodsCont.querySelector(".goods-wrapper-container").innerHTML = str;
                        }
                    }
                }
            }
            this.serviceList.onmouseenter = () => {
                for (let j = 0; j < this.serviceCont.parentNode.children.length; j++) {
                    this.serviceCont.parentNode.children[j].style.display = "none";
                }
                this.serviceCont.style.display = "block";
            }
        }
    }
    return Nav;
});