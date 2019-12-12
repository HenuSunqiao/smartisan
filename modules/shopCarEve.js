define(() => {
    'use strict';
    class ShopCarEve {
        constructor() {
            this.checkBoxs = document.querySelectorAll(".checkBox");
            this.emptyCont = document.querySelector(".cart-empty");
            this.cartCont = document.querySelector(".cart-full");
            this.checkAll = document.querySelector("#checkAll");
            this.priceLists = document.querySelectorAll(".priceCont span");
            this.numLists = document.querySelectorAll(".numCont .num");
            this.cutBtns = document.querySelectorAll(".numCont .down");
            this.addBtns = document.querySelectorAll(".numCont .up");
            this.countLists = document.querySelectorAll(".countCont span");
            this.containers = document.querySelectorAll(".cart-body li");
            this.totalNum = document.querySelector(".totalNum");
            this.totalPrice = document.querySelector(".totalPrice");
            this.deleteLists = document.querySelectorAll(".deleteBtn");
            this.init();
        }
        init() {
            this.changeStyle();
            this.addEvent();
        }
        changeStyle() {
            for (let i = 0; i < this.numLists.length; i++) {
                if (this.numLists[i].innerHTML <= 1) {
                    $(this.cutBtns[i]).addClass("disabled");
                } else {
                    $(this.cutBtns[i]).removeClass("disabled");
                }
            }
        }
        addEvent() {
            this.checkbtnsEvent();
            this.numberBtnsEvent();
            this.deleteBtnsEvent();
        }
        checkbtnsEvent() {
            for (let i = 0; i < this.checkBoxs.length; i++) {
                this.checkBoxs[i].onclick = () => {
                    this.checkCheck();
                    this.changeCountAll();
                }
            }
            this.checkAll.onclick = () => {
                this.checkCheckAll();
                this.changeCountAll();
            }
        }
        numberBtnsEvent() {
            for (let i = 0; i < this.cutBtns.length; i++) {
                this.cutBtns[i].onclick = () => {
                    if (!$(this.cutBtns[i]).hasClass("disabled")) {
                        this.id = this.containers[i].getAttribute("idx");
                        this.number = +this.numLists[i].innerHTML - 1
                        this.numLists[i].innerHTML = this.number;
                        this.removeCookie = false;
                        this.index = i;
                        this.changeStyle();
                        this.changeCookie();
                        this.changeCount();
                        this.changeCountAll();
                    }
                }
            }
            for (let i = 0; i < this.addBtns.length; i++) {
                this.addBtns[i].onclick = () => {
                    this.removeCookie = false;
                    this.number = +this.numLists[i].innerHTML + 1
                    this.numLists[i].innerHTML = this.number;
                    this.index = i;
                    this.id = this.containers[i].getAttribute("idx");
                    this.changeStyle();
                    this.changeCookie();
                    this.changeCount();
                    this.changeCountAll();
                }
            }
        }
        deleteBtnsEvent() {
            for (let i = 0; i < this.deleteLists.length; i++) {
                this.deleteLists[i].onclick = () => {
                    this.removeCookie = true;
                    this.id = this.containers[i].getAttribute("idx");
                    this.changeCookie();
                    this.containers[i].remove();
                    this.containers = document.querySelectorAll(".cart-body li");
                    this.deleteLists = document.querySelectorAll(".deleteBtn");
                    this.deleteBtnsEvent();
                    this.numLists = document.querySelectorAll(".numCont .num");
                    this.checkBoxs = document.querySelectorAll(".checkBox");
                    this.countLists = document.querySelectorAll(".countCont span");
                    this.changeCountAll();
                    if (this.containers.length == 0) {
                        this.emptyCont.style.display = "block";
                        this.cartCont.style.display = "none";
                    }
                }
            }
        }
        changeCountAll() {
            let countNum = 0;
            let countPrice = 0;
            for (let i = 0; i < this.checkBoxs.length; i++) {
                if (this.checkBoxs[i].checked) {
                    countNum += +this.numLists[i].innerHTML;
                    countPrice += +this.countLists[i].innerHTML;
                }
            }
            this.totalNum.innerHTML = countNum;
            this.totalPrice.innerHTML = countPrice.toFixed(2);

        }
        changeCount() {
            this.countLists[this.index].innerHTML = (this.priceLists[this.index].innerHTML * this.numLists[this.index].innerHTML).toFixed(2);
        }
        changeCookie() {
            this.shopCar = JSON.parse($.cookie("shopCar"));
            this.user = $.cookie("nowUser");
            for (let i = 0; i < this.shopCar.length; i++) {
                if (this.shopCar[i].user == this.user) {
                    for (let j = 0; j < this.shopCar[i].carInfo.length; j++) {
                        if (this.shopCar[i].carInfo[j].id == this.id) {
                            if (this.removeCookie) {

                                this.shopCar[i].carInfo.splice(j, 1);
                                break;
                            }
                            this.shopCar[i].carInfo[j].num = this.number;
                            break;
                        }
                    }
                    break;
                }
            }
            $.cookie("shopCar", JSON.stringify(this.shopCar));
        }
        checkCheckAll() {
            if (this.checkAll.checked) {
                for (let i = 0; i < this.checkBoxs.length; i++) {
                    this.checkBoxs[i].checked = true;
                }
            } else {
                for (let i = 0; i < this.checkBoxs.length; i++) {
                    this.checkBoxs[i].checked = false;
                }
            }
        }
        checkCheck() {
            let checkNum = 0;
            for (let i = 0; i < this.checkBoxs.length; i++) {
                if (this.checkBoxs[i].checked) {
                    checkNum++;
                }
            }
            if (checkNum == this.checkBoxs.length) {
                this.checkAll.checked = true;
            } else {
                this,
                this.checkAll.checked = false;
            }
        }
    }
    return ShopCarEve;
});