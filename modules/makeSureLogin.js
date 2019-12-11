define(() => {
    'use strict';
    class HasLogin {
        constructor() {
            this.userCont = document.querySelector(".header-user");
            this.init();
        }
        init() {
            this.bindEvent();
        }
        bindEvent() {
            if ($.cookie("nowUser")) {
                $(this.userCont).css("position", "relative");
                this.tiptit = $('<div>').css({
                    background: "#fff",
                    zIndex: "100",
                    border: "1px solid #ccc",
                    width: 200,
                    height: 100,
                    position: "absolute",
                    top: 40,
                    left: -160,
                    display: "none",
                    lineHeight: "30px",
                    textIndent: "20px"
                }).html("欢迎登录，" + $.cookie("nowUser")).appendTo($(this.userCont));
                this.logout = $("<a>").html("退出登录").css({
                    color: "red",
                    display: "inline",
                    cursor: "pointer",
                    marginLeft: "20px"
                }).click(() => {
                    $.cookie("nowUser", "")
                    location.href = "";
                }).appendTo(this.tiptit)
                $(this.userCont).hover(() => {
                    this.tiptit.stop().fadeToggle(100);
                }, () => {
                    this.tiptit.stop().fadeToggle(100);
                })
            }
        }
    }
    return HasLogin;
});