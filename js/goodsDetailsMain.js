require.config({
    baseUrl: "modules",
    paths: {
        jq: "../libs/jquery"
    }
})

require(["jq", "indexNav", "goodsDetailsLoad"], (_, nav, load) => {
    $("#header").load("http://localhost/smartisan/public.html header");
    $("#nav").load("http://localhost/smartisan/public.html nav", () => {
        new nav;
    });
    $("footer").load("http://localhost/smartisan/public.html #footer");
    new load();
})