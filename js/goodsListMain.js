require.config({
    baseUrl: "modules",
    paths: {
        jq: "../libs/jquery"
    }
})

require(["jq", "indexNav", "goodsListLoad"], (_, nav, load) => {
    $("#header").load("http://localhost/smartisan/public.html header");
    $("#nav").load("http://localhost/smartisan/public.html nav", () => {
        let navsl = new nav;
        new load({
            searchBox:navsl.searchBox,
            searchBtn :navsl.searchBtn
        });
    });
    $("footer").load("http://localhost/smartisan/public.html #footer");
})