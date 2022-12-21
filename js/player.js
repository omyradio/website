let player = null;

function createPlayer() {
    player = new Howl({
        format: ["mp3"],
        html5: true,
        src: [location.protocol + "//stream." + location.hostname + "/stream-mp3"],
        onplay: () => show("stopbtn"),
        onstop: onstop,
        onloaderror: onerror,
        onplayerror: onerror,
    });
}

function onerror(e) {
    console.error(e)
    stop();
}

function onstop() {
    show("playbtn");
    player.unload();
}

function play() {
    show("loadingspinner");
    createPlayer();
    player.play();
}

function stop() {
    show("loadingspinner")
    if (player) {
        player.stop();
    }
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

function status() {
    $.ajax({
        type: "GET",
        url: location.protocol + "//stream." + location.hostname + "/status-json.xsl",
        contentType: "text/plain",
        success: metadata => {
            if (metadata && metadata.icestats && metadata.icestats.source) {
                let sources = metadata.icestats.source;
                if (!Array.isArray(sources)) {
                    sources = [sources];
                }
                let source = {};
                sources.forEach(s => {
                    if (s.server_type === "audio/mpeg") {
                        source = s;
                    }
                });
                let title = source.title || "...";
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
}

$(function () {
    status();
    setInterval(status, 5000)
});
