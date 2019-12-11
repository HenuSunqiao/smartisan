define(() => {
    'use strict';
    class ShopCar {
        constructor() {
            this.emptyCont = document.querySelector(".cart-empty");
            this.init();
        }
        init() {
            if ($.cookie(shopCar)) {
                
            }
        }

    }
    return ShopCar;
});