define(() => {
    'use strict';
    class Register {
        constructor() {
            this.user = document.querySelector(".userName input");
            this.pass = document.querySelector(".password input");
            this.rePass = document.querySelector(".rePassword input");
            this.inputs = document.querySelectorAll("input");
            this.btn = document.querySelector(".loginBtn a");
            this.tips = document.querySelector(".tips");
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
                if (this.pass.value !== this.rePass.value) {
                    this.tips.innerHTML = "两次输入密码不一样，请重新输入";
                    return;
                }
                for (let i = 0; i < this.userMsg.length; i++) {
                    if (this.userMsg[i].user == this.user.value) {
                        this.tips.innerHTML = "账号已存在，<a href='login.html 'style='color:#5079d9; text-decoration:underline'>去登陆</a>"
                        return;
                    }
                }
                let obj = {
                    user: this.user.value,
                    pass: this.pass.value
                }
                this.userMsg.push(obj);
                $.cookie("userMsg", JSON.stringify(this.userMsg), {
                    expires: 10000
                });
                $.cookie("nowUser", obj.user);
                location.href = "index.html";
            }
            for (let i = 0; i < this.inputs.length; i++) {
                this.inputs[i].onfocus = () => {
                    this.tips.innerHTML = "";
                }
            }
        }
    }
    return Register;
});