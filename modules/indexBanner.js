define(() => {
    'use strict';
    class Banner {
        constructor(options) {
            this.container = options.container;
            this.imgs = options.imgs;
            this.cirLists = options.cirLists;
            this.index = 0;
            this.init();
        }
        init() {
            this.imgs[this.index].style.opacity = 1;
            this.bindEvent();
        }
        bindEvent() {
            this.bindCirEvent();
            this.autoPlay();
        }
        changeImg() {
            $(this.imgs[this.index]).css({
                opacity: 0
            }).stop().animate({
                opacity: 1
            })
            $(this.imgs[this.iPrev]).css({
                opacity: 1
            }).stop().animate({
                opacity: 0
            })
        }
        changeCir() {
            this.cirLists[this.iPrev].className = this.cirLists[this.iPrev].className.replace("active", "");
            this.cirLists[this.index].className = this.cirLists[this.index].className.concat(" active");
        }
        bindCirEvent() {
            for (let i = 0; i < this.cirLists.length; i++) {
                this.cirLists[i].onclick = () => {
                    if (this.index != i) {
                        this.iPrev = this.index;
                        this.index = i;
                        this.changeImg();
                        this.changeCir();
                    }
                }
            }
        }
        autoPlay() {
            this.timer = setInterval(() => {
                this.iPrev = this.index;
                this.index++;
                if (this.index >= this.cirLists.length) {
                    this.index = 0;
                }
                this.changeImg();
                this.changeCir();
            }, 5000)
            this.container.onmouseover = () => {
                clearInterval(this.timer);
            }
            this.container.onmouseout = () => {
                this.timer = setInterval(() => {
                    this.iPrev = this.index;
                    this.index++;
                    if (this.index >= this.cirLists.length) {
                        this.index = 0;
                    }
                    this.changeImg();
                    this.changeCir();
                }, 5000)
            }
        }
    }
    return Banner;
})