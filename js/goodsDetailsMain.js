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

require(["jq", "cookie", "indexNav", "goodsDetailsLoad", "makeSureLogin" , "goodsDetailsAddCar"], (_, __, nav, load, sure, add) => {
    $("#header").load("http://localhost/smartisan/public.html header");
    $("#nav").load("http://localhost/smartisan/public.html nav", () => {
        new nav;
        new sure;
    });
    $("footer").load("http://localhost/smartisan/public.html #footer");
    new load();
    new add;
})