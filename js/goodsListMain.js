require.config({
    baseUrl: "modules",
    paths: {
        jq: "../libs/jquery"
    }
})

require(["jq", "indexNav", "goodsListLoad"], (_, nav, load) => {

    $("#TopTop").load("http://localhost/smartisan/public.html #header", () => {
        new nav;
    });
    $("footer").load("http://localhost/smartisan/public.html #footer");
    new load;
})