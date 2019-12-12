define(() => {
    'use strict';
    class ShopCarRender {
        constructor(fun) {
            this.container = document.querySelector(".cart-body ul");
            this.url = "http://localhost/smartisan/data/goodsList.json";
            this.user = $.cookie("nowUser");
            this.shopCar = JSON.parse($.cookie("shopCar")) || [];
            this.init(fun);
        }
        init(fun) {
            this.load(fun);
        }
        load(fun) {
            $.ajax({
                url: this.url,
                success: (res) => {
                    this.res = res;
                    this.render();
                    fun();
                }
            })
        }
        render() {
            for (let i = 0; i < this.shopCar.length; i++) {
                if (this.shopCar[i].user == this.user) {
                    let str = "";
                    for (let j = 0; j < this.res.length; j++) {
                        for (let k = 0; k < this.shopCar[i].carInfo.length; k++) {
                            if (this.shopCar[i].carInfo[k].id == this.res[j].id) {
                                str += `
                                <li idx="${this.res[j].id}">
                                    <div class="items-cont">
                                        <div class="checkCont">
                                            <input type="checkbox" class="checkBox">
                                        </div>
                                        <div class="imgCont">
                                            <img src="${this.res[j].mainPic}" alt="">
                                        </div>
                                        <div class="nameCont">
                                            <p class="name">${this.res[j].name}</p>
                                            <p class="discription">${this.res[j].discription}</p>
                                        </div>
                                        <div class="priceCont">
                                            <span>${(+this.res[j].price).toFixed(2)}</span>
                                        </div>
                                        <div class="numCont">
                                            <span class="down disabled btn">-</span><span class="num ">${(+this.shopCar[i].carInfo[k].num)}</span><span
                                                class="up btn">+</span>
                                        </div>
                                        <div class="countCont">
                                            <span>${(+this.res[j].price * this.shopCar[i].carInfo[k].num).toFixed(2)}</span>
                                        </div>
                                        <div class="oprateCont">
                                            <span class="deleteBtn"></span>
                                        </div>
                                    </div>
                                </li>
                                `;
                            }
                        }
                    }
                    this.container.innerHTML = str;
                    break;
                }
            }
        }

    }
    return ShopCarRender;
});