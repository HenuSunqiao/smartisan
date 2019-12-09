define(() => {
    'use strict';
    class Building {
        constructor(building) {
            this.container = building;
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
                },
                url: "http://localhost/smartisan/data/building.json",
            })
        }
        render() {
            let str = "";
            for (let i = 0; i < this.res.length; i++) {
                let liststr = '';
                for (let j = 0; j < this.res[i].lists.length; j++) {
                    liststr += `
                        <li>
                            <figure class="list-pic">
                                <img src="${this.res[i].lists[j].img}"
                                    alt="">
                            </figure>
                            <article>
                                <h3>${this.res[i].lists[j].name}</h3>
                                <h5>${this.res[i].lists[j].discription}</h5>
                            </article>
                            <aside>
                                <span>￥${(+this.res[i].lists[j].price).toFixed(2)}</span>
                            </aside>
                        </li>
                    `;
                }
                str += `
                <section id="${this.res[i].id}" class="building">
                    <div class="shell-container floor-container">
                        <div class="shell-title floor-title">
                            <h5>${this.res[i].title}</h5>
                        </div>
                        <div class="shell-body floor-body">
                            <ul class="shell-body-container floor-body-list">
                                <li class="mainPic">
                                    <figure>
                                        <img src="${this.res[i].mainPic}" alt="">
                                    </figure>
                                </li>
                                ${liststr}
                            </ul>
                        </div>
                    </div>
                </section>
                `
            }
            this.container.innerHTML = str;
            this.floors = document.querySelectorAll(".building");
            new Elevator({
                building: document.querySelectorAll(".building")
            });
        }
    }
    class Elevator {
        constructor(options) {
            this.building = options.building;
            this.elevator = document.querySelector("#elevator");
            this.elevatorBtns = this.elevator.querySelectorAll("li");
            this.toTop = document.querySelector("#toTop");
            this.visiable = false;
            this.init();
        }
        init() {
            this.bindEvent();
        }
        bindEvent() {
            this.clickEvent();
            this.scrollEvent();
        }
        clickEvent() {
            for (let i = 0; i < this.elevatorBtns.length; i++) {
                this.elevatorBtns[i].onclick = () => {
                    $("html").stop().animate({
                        scrollTop: this.building[i].offsetTop - 140
                    })
                }
                this.toTop.onclick = () => {
                    $("html").stop().animate({
                        scrollTop: 0
                    })
                }
            }
        }
        scrollEvent() {
            onscroll = () => {
                for (let i = this.building.length - 1; i >= 0; i--) {
                    if (this.building[i].offsetTop < $("html").scrollTop() + 150) {
                        for (let j = 0; j < this.elevatorBtns.length; j++) {
                            this.elevatorBtns[j].className = this.elevatorBtns[j].className.replace("active", "");
                        }
                        this.elevatorBtns[i].className += " active";
                        break;
                    }
                }
                if ($("html").scrollTop() < this.building[0].offsetTop - 150) {

                    if (this.visiable) {
                        $(this.elevator).stop().animate({
                            opacity: 0
                        }, 200)
                        this.visiable = false;
                    }

                } else {

                    if (!this.visiable) {
                        $(this.elevator).stop().animate({
                            opacity: 1
                        }, 200)
                        this.visiable = true;
                    }
                }
            }
        }
    }
    return Building;
});