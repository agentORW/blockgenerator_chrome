chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.from === "popup" && message.query === "bright_eye_dropper_clicked") {

        setTimeout(() => {

            const eyeDropper = new EyeDropper();

            eyeDropper.open().then(result => {

                console.log(result);

                chrome.storage.local.set({ "bright_color_hex_code": [result.sRGBHex] })


            }).catch(e => {
                console.log(e)
            })

        }, 500);
    }

    if (message.from === "popup" && message.query === "dark_eye_dropper_clicked") {

        setTimeout(() => {

            const eyeDropper = new EyeDropper();

            eyeDropper.open().then(result => {

                console.log(result);

                chrome.storage.local.set({ "dark_color_hex_code": [result.sRGBHex] })

            }).catch(e => {
                console.log(e)
            })

        }, 500);
    }
})