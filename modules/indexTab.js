define(() => {
    'use strict';
    class Tab {
        constructor(options) {
            this.container = options.container;
            this.btnLeft = options.btns.querySelector(".title-btnLeft");
            this.btnRight = options.btns.querySelector(".title-btnRight");
            this.init();
        }
        init() {
            this.load();

        }
        load() {
            $.ajax({
                success: (res) => {
                    this.res = res;
                    this.render();
                    this.bindEvent();
                },
                url: "http://localhost/smartisan/data/hotBrand.json",
            })
        }
        render() {
            let str = "";
            for (let i = 0; i < this.res.length; i++) {
                str += `
                <li>
                    <figure>
                        <img src="${this.res[i].img}" alt="">
                    </figure>
                    <article>
                        <h3>${this.res[i].name}</h3>
                        <h5>${this.res[i].discription}</h5>
                    </article>
                    <aside>
                        <span>￥${(+this.res[i].price).toFixed(2)}</span>
                    </aside>
                </li>
                `
            }
            this.container.innerHTML = str;
            this.btnLeft.style.opacity = 0.5;
        }
        bindEvent() {
            this.btnLeft.onclick = () => {
                this.btnLeft.style.opacity = 0.5;
                this.btnRight.style.opacity = 1;
                $(this.container).css({
                    transition: "all .5s ease-in",
                    transform: "translate(0px, 0px)"
                })
            }
            this.btnRight.onclick = () => {
                this.btnLeft.style.opacity = 1;
                this.btnRight.style.opacity = 0.5;
                $(this.container).css({
                    transition: "all .5s ease-in",
                    transform: "translate(-1200px, 0px)"
                })
            }
        }
    }
    return Tab;
});