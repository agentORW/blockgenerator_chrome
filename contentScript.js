chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    let storage = message.query === "bright_eye_dropper_clicked" ? "bright_color_hex_code" : "dark_color_hex_code";

    if (message.from === "popup" && (message.query === "bright_eye_dropper_clicked" || message.query === "dark_eye_dropper_clicked")) {

        setTimeout(() => {

            const eyeDropper = new EyeDropper();

            eyeDropper.open().then(result => {

                console.log(result);

                set_storage = {};
                set_storage[storage] = [result.sRGBHex];

                chrome.storage.local.set(set_storage)


            }).catch(e => {
                console.log(e)
            })

        }, 500);
    }
})