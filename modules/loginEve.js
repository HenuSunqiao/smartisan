define(() => {
    'use strict';
    class Login {
        constructor() {
            this.user = document.querySelector(".userName input");
            this.pass = document.querySelector(".password input");
            this.inputs = document.querySelectorAll("input");
            this.btn = document.querySelector(".loginBtn a");
            this.tips = document.querySelector(".tips");
            this.isBeing = false;
            this.init();
        }
        init() {
            if ($.cookie("nowUser")) {
                location.href = "index.html";
            }
            this.userMsg = JSON.parse($.cookie("userMsg")) || [];
            this.bindEvent();
        }
        bindEvent() {
            this.btn.onclick = () => {
                for (let i = 0; i < this.userMsg.length; i++) {
                    if (this.userMsg[i].user == this.user.value) {
                        this.isBeing = true;
                        if (this.userMsg[i].pass == this.pass.value) {
                            $.cookie("nowUser", this.user.value);
                            location.href = "index.html";
                        } else {
                            this.tips.innerHTML = "密码错误"
                        }
                        break;
                    }
                }
                if (!this.isBeing) {
                    this.tips.innerHTML = "用户不存在<a href='register.html'>去注册</a>"
                }
                for (let i = 0; i < this.inputs.length; i++) {
                    this.inputs[i].onfocus = () => {
                        this.tips.innerHTML = "";
                    }
                }
            }
        }
    }
    return Login;
});