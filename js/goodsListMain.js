require.config({
    baseUrl: "modules",
    paths: {
        jq: "../libs/jquery"
    }
})

require(["jq", "indexNav"], (_, nav) => {

    $("#TopTop").load("http://localhost/smartisan/public.html #header", () => {
        new nav;
    });
    $("footer").load("http://localhost/smartisan/public.html #footer");
})