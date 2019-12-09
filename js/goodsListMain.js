require.config({
    baseUrl: "modules",
    paths: {
        jq: "../libs/jquery"
    }
})

require(["jq", "indexBanner", "indexTab", "indexBuilding", "indexNav"], (_, banner, tab, building, nav) => {

    new nav;
    $("#TopTop").load("http://localhost/smartisan/public.html #header");
    $("footer").load("http://localhost/smartisan/public.html #footer");
})