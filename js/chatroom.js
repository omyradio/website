function loadChatroom() {
    $("#meet").empty();
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
                p2p: {enabled: false},
                toolbarButtons: [
                    'camera',
                    'chat',
                    //    'closedcaptions',
                    //    'desktop',
                    //    'download',
                    //    'embedmeeting',
                    //    'etherpad',
                    //    'feedback',
                    'filmstrip',
                    'fullscreen',
                    //    'hangup',
                    //    'help',
                    //    'highlight',
                    //    'invite',
                    //    'linktosalesforce',
                    //    'livestreaming',
                    //    'microphone',
                    //    'noisesuppression',
                    //    'participants-pane',
                    'profile',
                    //    'raisehand',
                    //    'recording',
                    //    'security',
                    'select-background',
                    'settings',
                    //    'shareaudio',
                    //    'sharedvideo',
                    //    'shortcuts',
                    //    'stats',
                    'tileview',
                    'toggle-camera',
                    'videoquality',
                    //    'whiteboard',
                ],
            },
            interfaceConfigOverwrite: {
                MOBILE_APP_PROMO: false,
                VERTICAL_FILMSTRIP: true,
                DISABLE_RINGING: true,
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                SHOW_JITSI_WATERMARK: false,
                DEFAULT_BACKGROUND: '#211a0a',
                DEFAULT_REMOTE_DISPLAY_NAME: 'anonymous dubhead'
            }
        }
        new JitsiMeetExternalAPI(domain, options);
    });
}
