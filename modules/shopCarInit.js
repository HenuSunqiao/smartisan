define(() => {
    'use strict';
    class ShopCar {
        constructor() {
            this.emptyCont = document.querySelector(".cart-empty");
            this.cartCont = document.querySelector(".cart-full");
            this.user = $.cookie("nowUser");
            this.isEmpty = true;
            this.init();
        }
        init() {
            if (!this.user) {
                location.href = "login.html";
            }
            this.shopCar = JSON.parse($.cookie("shopCar")) || [];
            for (let i = 0; i < this.shopCar.length; i++) {
                if (this.shopCar[i].user == this.user) {
                    if (this.shopCar[i].carInfo.length > 0) {

                        this.isEmpty = false;
                    }
                    break;
                }
            }
            if (this.isEmpty) {
                this.emptyCont.style.display = "block";
                this.cartCont.style.display = "none";
            } else {
                this.emptyCont.style.display = "none";
                this.cartCont.style.display = "block";
            }
        }

    }
    return ShopCar;
});