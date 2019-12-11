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

require(["jq", "cookie", "shopCarEve"], (_, __, shopCar) => {
    $("#header").load("http://localhost/smartisan/public.html header");
    $("footer").load("http://localhost/smartisan/public.html #footer");
    new shopCar;
})