require.config({
    baseUrl: "modules",
    paths: {
        jq: "../libs/jquery",
        cookie: "../libs/jquery.cookie"
    },
    shim: {
        //配置
        cookie: {
            //设置依赖项： jquery
            deps: ["jq"]
        }
    }
})

require(["jq", "cookie", "indexBanner", "indexTab", "indexBuilding", "indexNav", "makeSureLogin"], (_, __, banner, tab, building, nav, sure) => {
    new banner({
        container: document.querySelector(".banner-container"),
        imgs: document.getElementsByClassName("imgBox")[0].querySelectorAll("img"),
        cirLists: document.getElementsByClassName("cirBox")[0].querySelectorAll("li"),
    });
    new tab({
        container: document.querySelector(".hotBrand-body-container"),
        btns: document.querySelector("#hotBrand .title-btn")
    })
    new building(document.querySelector("#building-container"));
    $("#header").load("http://localhost/smartisan/public.html header");
    $("#nav").load("http://localhost/smartisan/public.html nav", () => {
        new nav;
        new sure;
    });
    $("footer").load("http://localhost/smartisan/public.html #footer");
})