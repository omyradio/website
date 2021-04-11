const player = new Howl({
    format: ["mp3"],
    html5: true,
    src: [location.protocol + "//" + location.hostname + ":8000/stream"],
    // src: ["https://staging.omyradio.net/stream"],
    onplay: () => show("stopbtn"),
    onstop: () =>  show("playbtn"),
    onloaderror: onerror,
    onplayerror: onerror,
});

function onerror(e) {
    console.error(e);
    player.stop();
}

function play() {
    show("loadingspinner");
    player.play();
}

function stop() {
    show("loadingspinner");
    player.stop();
}

function show(id) {
    const ids = ["playbtn", "stopbtn", "loadingspinner"];
    ids.forEach(i => {
        const $elem = $("#" + i);
        if (id === i) {
            $elem.show();
        } else {
            $elem.hide();
        }
    });
}

function live() {
    $(".auto").show();
    $(".live").hide();
}

function auto() {
    $(".auto").hide();
    $(".live").show();
}

$(function () {
    setInterval(() => {
        $.ajax({
            type: "GET",
            url: location.protocol + "//" + location.hostname + ":8000/status-json.xsl",
            contentType: "text/plain",
            success: metadata => {
                if (metadata && metadata.icestats && metadata.icestats.source) {
                    let title = metadata.icestats.source.title || "...";
                    if (window.metadatatitle !== title) {
                        window.metadatatitle = title;
                        if (title.endsWith(" - LIVE-ON-AIR")) {
                            title = title.substr(0, title.indexOf(" - LIVE-ON-AIR"));
                            live();
                        } else {
                            auto();
                        }
                        $("#title").html(title);
                    }
                }
            }
        });
    }, 5000)
});
