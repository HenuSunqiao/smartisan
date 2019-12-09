require.config({
    baseUrl: "modules",
    paths: {
        jq: "../libs/jquery"
    }
})

require(["jq", "indexBanner", "indexTab", "indexBuilding", "indexNav"], (_, banner, tab, building, nav) => {
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
    new nav;
})