$(function () {
    $.getScript(location.protocol + "//meet." + location.hostname + "/external_api.js", () => {
        const domain = "meet." + location.hostname;
        const options = {
            roomName: "Omyradio",
            width: "100%",
            height: "100%",
            parentNode: document.querySelector("#meet"),
            configOverwrite: {
                disableDeepLinking: true, //remove mobile app request
                enableNoAudioDetection: false,
                enableNoisyMicDetection: false,
                startWithVideoMuted: true,
                startWithAudioMuted: true,
                startSilent: true,
                p2p: {enabled: false}
            },
            interfaceConfigOverwrite: {
                filmStripOnly: false,
                TOOLBAR_BUTTONS: [
                    'camera', 'chat', 'settings',
                    'videoquality', 'filmstrip',
                    'tileview'
                ],
                MOBILE_APP_PROMO: false,
                HIDE_KICK_BUTTON_FOR_GUESTS: true,
                VERTICAL_FILMSTRIP: true,
                DISABLE_RINGING: true,
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                SHOW_JITSI_WATERMARK: false,
                DEFAULT_BACKGROUND: '#211a0a',
		DEFAULT_REMOTE_DISPLAY_NAME: 'DubHead'
            }
        }
        new JitsiMeetExternalAPI(domain, options);
    });
});
