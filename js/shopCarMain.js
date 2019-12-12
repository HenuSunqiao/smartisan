require.config({
    baseUrl: "modules",
    paths: {
        jq: "../libs/jquery",
        cookie: "../libs/jquery.cookie",
        shopCarEve: "shopCarEve",
        shopCarRender: "shopCarRender"
    },
    shim: {
        //配置
        cookie: {
            //设置依赖项： jquery
            deps: ["jq"]
        }
    }
})

require(["jq", "cookie", "makeSureLogin", "shopCarInit", "shopCarRender", "shopCarEve"], (_, __, sure, shopCarInit, shopCarRender, event) => {
    $("#header").load("http://localhost/smartisan/public.html header", () => {
        new sure;
    });
    $("footer").load("http://localhost/smartisan/public.html #footer");
    new shopCarInit;
    new shopCarRender(
        () => {
            new event;
        }
    );
})