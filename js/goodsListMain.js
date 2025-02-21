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

require(["jq", "cookie", "indexNav", "goodsListLoad", "makeSureLogin"], (_, __, nav, load, sure) => {
    $("#header").load("http://localhost/smartisan/public.html header");
    $("#nav").load("http://localhost/smartisan/public.html nav", () => {
        let navsl = new nav;
        new sure;
        new load({
            searchBox: navsl.searchBox,
            searchBtn: navsl.searchBtn
        });
    });
    $("footer").load("http://localhost/smartisan/public.html #footer");
})