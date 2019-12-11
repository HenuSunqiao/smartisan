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

    class AddCar {
        constructor() {
            this.id = getQueryVariable("id");
            this.number = document.querySelector(".num");
            this.addBtn = document.querySelector(".up");
            this.cutBtn = document.querySelector(".down")
            this.pushBtn = document.querySelector(".addCar");
            this.init();
        }
        init() {
            this.isBanned();
            this.changeNum();
            this.pushCar();
        }
        isBanned() {
            if (this.number.innerHTML <= 1) {
                $(this.cutBtn).addClass("disabled");
            } else {
                $(this.cutBtn).removeClass("disabled");
            }
        }
        changeNum() {
            this.addBtn.onclick = () => {
                this.number.innerHTML = +this.number.innerHTML + 1;
                this.isBanned();
            }
            this.cutBtn.onclick = () => {
                if (!$(this.cutBtn).hasClass("disabled")) {
                    this.number.innerHTML = +this.number.innerHTML - 1;
                    this.isBanned();
                }
            }
        }
        pushCar() {
            this.shopCar = JSON.parse($.cookie("shopCar")) || [];
            this.pushBtn.onclick = () => {
                if (!(this.user = $.cookie("nowUser"))) {
                    location.href = "login.html";
                    return;
                }
                this.isBeing = false;
                let obj = {
                    user: this.user,
                    carInfo: {
                        id: this.id,
                        num: this.number.innerHTML
                    }
                }
                for (let i = 0; i < this.shopCar.length; i++) {
                    if (this.shopCar[i].user == this.user) {
                        console.log(1);
                        for (let j = 0; j < this.shopCar[i].carInfo.length; j++) {
                            if (this.shopCar[i].carInfo[j].id == this.id) {
                                this.isBeing = true;
                                this.shopCar[i].carInfo[j].num = (+this.shopCar[i].carInfo[j].num) + (+this.number.innerHTML);
                                break;
                            }
                        }
                        break;
                    }

                }
                if (!this.isBeing) {
                    this.shopCar.push(obj);
                }
                $.cookie("shopCar", JSON.stringify(this.shopCar), {
                    expires: 100
                });
                // console.log(this.shopCar);
            }
        }
    }
    return AddCar;
});