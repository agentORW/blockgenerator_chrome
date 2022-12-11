document.addEventListener("DOMContentLoaded", () => {

    const mainCont = document.getElementById("mainCont");
    const buttonCont = document.getElementById("picker_btn_cont");
    const resultList = document.getElementById("result");


    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tab = tabs[0]

        if (tab.url === undefined || tab.url.indexOf('chrome') == 0) {
            buttonCont.innerHTML = '<span style="font-family: lobster, sans-serif">Eye Dropper</span> can\'t access <i>Chrome pages</i>'
        }
        else if (tab.url.indexOf('file') === 0) {
            buttonCont.innerHTML = '<span style="font-family: lobster, sans-serif">Eye Dropper</span> can\'t access <i>local pages</i>'

        } else {
            const bright_button = document.createElement("bright_button")
            bright_button.setAttribute("id", "picker_btn")
            bright_button.innerText = "Pick brightest color"

            bright_button.addEventListener("click", () => {
                if (!window.EyeDropper) {
                    GiveMetheChild("#ad5049", 'Your browser does not support the EyeDropper API')
                    return
                }

                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { from: "popup", query: "bright_eye_dropper_clicked" }
                );
                window.close()
            })

            buttonCont.appendChild(bright_button)

            const dark_button = document.createElement("dark_button")
            dark_button.setAttribute("id", "picker_btn")
            dark_button.innerText = "Pick darkest color"

            dark_button.addEventListener("click", () => {
                if (!window.EyeDropper) {
                    GiveMetheChild("#ad5049", 'Your browser does not support the EyeDropper API')
                    return
                }

                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { from: "popup", query: "dark_eye_dropper_clicked" }
                );
                window.close()
            })

            buttonCont.appendChild(dark_button)

            const ClearButton = document.createElement("button")
            ClearButton.innerText = "Generate"
            ClearButton.setAttribute("id", "ClearButton")

            const delay = ms => new Promise(res => setTimeout(res, ms));

            ClearButton.addEventListener("click", async () => {
                for (let i = 0; i < 2; i++) {
                await delay(100); 
                var middle = []
                chrome.storage.local.get("bright_color_hex_code", (resp) => {
                    resp.bright_color_hex_code.forEach(hexCode => {
                        rgb = hexToRgb(hexCode);
                        block = closest_color([rgb[0], rgb[1], rgb[2]])
                        file = './data/1.12.2 block textures/' + block
                        chrome.storage.local.set({ "bright_block": [file] })

                        let icon = document.getElementById("bright");
                        icon.src = chrome.runtime.getURL(file);
                        resultList.appendChild(icon)
                    })
                });

                chrome.storage.local.get("bright_color_hex_code", (resp) => {
                    resp.bright_color_hex_code.forEach(bright_hex => {
                        chrome.storage.local.get("dark_color_hex_code", (resp) => {
                            resp.dark_color_hex_code.forEach(dark_hex => {
                                bright_rgb = hexToRgb(bright_hex)
                                console.log("bright_rgb", bright_rgb)
                                dark_rgb = hexToRgb(dark_hex)
                                console.log("dark_rgb", dark_rgb)
                                middle = [Math.round((bright_rgb[0]+dark_rgb[0])/2), Math.round((bright_rgb[1]+dark_rgb[1])/2), Math.round((bright_rgb[2]+dark_rgb[2])/2)]
                                console.log("middle", middle)
                                chrome.storage.local.set({ "middle": [middle] })
                            })
                        });
                    })
                });
                
                chrome.storage.local.get("middle", (resp) => {
                    resp.middle.forEach(middle_rgb => {
                        block = closest_color([middle_rgb[0], middle_rgb[1], middle_rgb[2]])
                        file = './data/1.12.2 block textures/' + block
                        chrome.storage.local.set({ "middle_block": [file] })

                        let icon = document.getElementById("middle");
                        icon.src = chrome.runtime.getURL(file);
                        resultList.appendChild(icon)
                    })
                });

                chrome.storage.local.get("dark_color_hex_code", (resp) => {
                    resp.dark_color_hex_code.forEach(hexCode => {
                        rgb = hexToRgb(hexCode);
                        block = closest_color([rgb[0], rgb[1], rgb[2]])
                        file = './data/1.12.2 block textures/' + block
                        chrome.storage.local.set({ "dark_block": [file] })

                        let icon = document.getElementById("dark");
                        icon.src = chrome.runtime.getURL(file);
                        resultList.appendChild(icon)
                    })
                });
            }
            })

            
            mainCont.appendChild(ClearButton)
        }
    });

    chrome.storage.local.get("bright_block", (resp) => {
        let icon = document.getElementById("bright");
        icon.src = chrome.runtime.getURL(resp.bright_block[0]);
        resultList.appendChild(icon)
    })

    chrome.storage.local.get("dark_block", (resp) => {
        let icon = document.getElementById("dark");
        icon.src = chrome.runtime.getURL(resp.dark_block[0]);
        resultList.appendChild(icon)
    })

    chrome.storage.local.get("middle_block", (resp) => {
        let icon = document.getElementById("middle");
        icon.src = chrome.runtime.getURL(resp.middle_block[0]);
        resultList.appendChild(icon)
    })
})


function hexToRgb(h){return['0x'+h[1]+h[2]|0,'0x'+h[3]+h[4]|0,'0x'+h[5]+h[6]|0]}

function closest_color(rgb) {
    var blocks = [
        { id: "wool_colored_yellow.png", rgb: [249, 198, 40] },
        { id: "wool_colored_white.png", rgb: [234, 236, 237] },
        { id: "wool_colored_silver.png", rgb: [142, 142, 135] },
        { id: "wool_colored_red.png", rgb: [161, 39, 35] },
        { id: "wool_colored_purple.png", rgb: [122, 42, 173] },
        { id: "wool_colored_pink.png", rgb: [238, 141, 172] },
        { id: "wool_colored_orange.png", rgb: [241, 118, 20] },
        { id: "wool_colored_magenta.png", rgb: [189, 69, 180] },
        { id: "wool_colored_lime.png", rgb: [112, 185, 26] },
        { id: "wool_colored_light_blue.png", rgb: [58, 175, 217] },
        { id: "wool_colored_green.png", rgb: [85, 110, 27] },
        { id: "wool_colored_gray.png", rgb: [63, 68, 72] },
        { id: "wool_colored_cyan.png", rgb: [21, 138, 145] },
        { id: "wool_colored_brown.png", rgb: [114, 72, 41] },
        { id: "wool_colored_blue.png", rgb: [53, 57, 157] },
        { id: "wool_colored_black.png", rgb: [21, 21, 26] },
        { id: "tnt_side.png", rgb: [166, 96, 77] },
        { id: "stone_slab_top.png", rgb: [161, 161, 161] },
        { id: "stone_slab_side.png", rgb: [167, 167, 167] },
        { id: "stone_granite_smooth.png", rgb: [160, 115, 98] },
        { id: "stone_granite.png", rgb: [153, 114, 99] },
        { id: "stone_diorite_smooth.png", rgb: [184, 184, 187] },
        { id: "stone_diorite.png", rgb: [180, 180, 183] },
        { id: "stone_andesite_smooth.png", rgb: [133, 133, 135] },
        { id: "stone_andesite.png", rgb: [131, 131, 132] },
        { id: "stonebrick_mossy.png", rgb: [114, 119, 105] },
        { id: "stonebrick_cracked.png", rgb: [119, 119, 119] },
        { id: "stonebrick_carved.png", rgb: [119, 119, 119] },
        { id: "stonebrick.png", rgb: [122, 122, 122] },
        { id: "stone.png", rgb: [125, 125, 125] },
        { id: "sponge_wet.png", rgb: [158, 156, 61] },
        { id: "sponge.png", rgb: [195, 195, 85] },
        { id: "soul_sand.png", rgb: [84, 64, 51] },
        { id: "snow.png", rgb: [240, 251, 251] },
        { id: "slime.png", rgb: [120, 200, 101] },
        { id: "shulker_top_yellow.png", rgb: [249, 190, 30] },
        { id: "shulker_top_white.png", rgb: [218, 223, 223] },
        { id: "shulker_top_silver.png", rgb: [127, 127, 118] },
        { id: "shulker_top_red.png", rgb: [143, 32, 31] },
        { id: "shulker_top_purple.png", rgb: [151, 103, 151] },
        { id: "shulker_top_pink.png", rgb: [232, 124, 160] },
        { id: "shulker_top_orange.png", rgb: [236, 108, 10] },
        { id: "shulker_top_magenta.png", rgb: [176, 55, 165] },
        { id: "shulker_top_lime.png", rgb: [102, 175, 23] },
        { id: "shulker_top_light_blue.png", rgb: [51, 166, 213] },
        { id: "shulker_top_green.png", rgb: [80, 102, 31] },
        { id: "shulker_top_gray.png", rgb: [56, 60, 64] },
        { id: "shulker_top_cyan.png", rgb: [20, 123, 137] },
        { id: "shulker_top_brown.png", rgb: [108, 67, 37] },
        { id: "shulker_top_blue.png", rgb: [45, 47, 142] },
        { id: "shulker_top_black.png", rgb: [26, 26, 31] },
        { id: "sea_lantern.png", rgb: [182, 206, 197] },
        { id: "sandstone_smooth.png", rgb: [220, 212, 163] },
        { id: "sandstone_normal.png", rgb: [217, 209, 157] },
        { id: "sandstone_carved.png", rgb: [216, 208, 155] },
        { id: "sandstone_bottom.png", rgb: [212, 205, 148] },
        { id: "sand.png", rgb: [219, 211, 160] },
        { id: "red_sandstone_top.png", rgb: [167, 85, 30] },
        { id: "red_sandstone_smooth.png", rgb: [169, 86, 31] },
        { id: "red_sandstone_normal.png", rgb: [166, 84, 30] },
        { id: "red_sandstone_carved.png", rgb: [162, 82, 28] },
        { id: "red_sandstone_bottom.png", rgb: [163, 83, 28] },
        { id: "red_sand.png", rgb: [169, 88, 33] },
        { id: "red_nether_brick.png", rgb: [68, 4, 7] },
        { id: "redstone_ore.png", rgb: [134, 105, 105] },
        { id: "redstone_lamp_off.png", rgb: [75, 46, 28] },
        { id: "redstone_block.png", rgb: [165, 26, 9] },
        { id: "quartz_ore.png", rgb: [127, 87, 82] },
        { id: "quartz_block_side.png", rgb: [236, 233, 227] },
        { id: "quartz_block_lines.png", rgb: [232, 228, 220] },
        { id: "quartz_block_chiseled_top.png", rgb: [232, 228, 220] },
        { id: "quartz_block_chiseled.png", rgb: [232, 229, 220] },
        { id: "quartz_block_bottom.png", rgb: [232, 229, 220] },
        { id: "purpur_pillar_top.png", rgb: [170, 127, 170] },
        { id: "purpur_pillar.png", rgb: [170, 127, 170] },
        { id: "purpur_block.png", rgb: [167, 122, 167] },
        { id: "pumpkin_top.png", rgb: [192, 118, 21] },
        { id: "pumpkin_side.png", rgb: [199, 122, 24] },
        { id: "pumpkin_face_on.png", rgb: [185, 136, 30] },
        { id: "pumpkin_face_off.png", rgb: [136, 72, 12] },
        { id: "prismarine_rough.png", rgb: [107, 170, 151] },
        { id: "prismarine_dark.png", rgb: [60, 88, 75] },
        { id: "prismarine_bricks.png", rgb: [100, 161, 143] },
        { id: "planks_spruce.png", rgb: [104, 78, 47] },
        { id: "planks_oak.png", rgb: [157, 127, 78] },
        { id: "planks_jungle.png", rgb: [154, 110, 77] },
        { id: "planks_birch.png", rgb: [196, 179, 123] },
        { id: "planks_big_oak.png", rgb: [61, 40, 18] },
        { id: "planks_acacia.png", rgb: [170, 92, 51] },
        { id: "piston_top_sticky.png", rgb: [139, 146, 97] },
        { id: "piston_top_normal.png", rgb: [152, 127, 86] },
        { id: "piston_side.png", rgb: [107, 104, 97] },
        { id: "piston_bottom.png", rgb: [101, 101, 101] },
        { id: "obsidian.png", rgb: [20, 18, 30] },
        { id: "observer_top.png", rgb: [102, 102, 102] },
        { id: "observer_side.png", rgb: [62, 60, 60] },
        { id: "observer_front.png", rgb: [107, 106, 106] },
        { id: "observer_back.png", rgb: [69, 67, 67] },
        { id: "noteblock.png", rgb: [104, 69, 51] },
        { id: "nether_wart_block.png", rgb: [117, 6, 7] },
        { id: "nether_brick.png", rgb: [45, 22, 27] },
        { id: "netherrack.png", rgb: [111, 54, 52] },
        { id: "mycelium_side.png", rgb: [112, 87, 73] },
        { id: "mushroom_block_skin_stem.png", rgb: [208, 204, 194] },
        { id: "mushroom_block_skin_red.png", rgb: [183, 39, 37] },
        { id: "mushroom_block_skin_brown.png", rgb: [142, 107, 83] },
        { id: "mushroom_block_inside.png", rgb: [203, 171, 121] },
        { id: "melon_side.png", rgb: [140, 145, 36] },
        { id: "magma.png", rgb: [135, 66, 26] },
        { id: "log_spruce_top.png", rgb: [108, 84, 50] },
        { id: "log_spruce.png", rgb: [46, 29, 12] },
        { id: "log_oak_top.png", rgb: [160, 129, 80] },
        { id: "log_oak.png", rgb: [102, 81, 50] },
        { id: "log_jungle_top.png", rgb: [159, 123, 77] },
        { id: "log_jungle.png", rgb: [87, 68, 27] },
        { id: "log_birch_top.png", rgb: [185, 166, 118] },
        { id: "log_birch.png", rgb: [209, 208, 203] },
        { id: "log_big_oak_top.png", rgb: [81, 64, 43] },
        { id: "log_big_oak.png", rgb: [52, 41, 23] },
        { id: "log_acacia_top.png", rgb: [158, 92, 63] },
        { id: "log_acacia.png", rgb: [105, 99, 89] },
        { id: "lapis_ore.png", rgb: [100, 111, 136] },
        { id: "lapis_block.png", rgb: [39, 67, 138] },
        { id: "jukebox_side.png", rgb: [104, 69, 51] },
        { id: "itemframe_background.png", rgb: [125, 71, 45] },
        { id: "iron_trapdoor.png", rgb: [200, 200, 200] },
        { id: "iron_ore.png", rgb: [137, 131, 127] },
        { id: "iron_block.png", rgb: [221, 221, 221] },
        { id: "ice_packed.png", rgb: [164, 193, 244] },
        { id: "ice.png", rgb: [125, 173, 255] },
        { id: "hay_block_side.png", rgb: [159, 117, 18] },
        { id: "hardened_clay_stained_yellow.png", rgb: [186, 133, 35] },
        { id: "hardened_clay_stained_white.png", rgb: [210, 178, 161] },
        { id: "hardened_clay_stained_silver.png", rgb: [135, 107, 98] },
        { id: "hardened_clay_stained_red.png", rgb: [143, 61, 47] },
        { id: "hardened_clay_stained_purple.png", rgb: [118, 70, 86] },
        { id: "hardened_clay_stained_pink.png", rgb: [162, 78, 79] },
        { id: "hardened_clay_stained_orange.png", rgb: [162, 84, 38] },
        { id: "hardened_clay_stained_magenta.png", rgb: [150, 88, 109] },
        { id: "hardened_clay_stained_lime.png", rgb: [103, 118, 53] },
        { id: "hardened_clay_stained_light_blue.png", rgb: [114, 109, 138] },
        { id: "hardened_clay_stained_green.png", rgb: [76, 83, 42] },
        { id: "hardened_clay_stained_gray.png", rgb: [58, 42, 36] },
        { id: "hardened_clay_stained_cyan.png", rgb: [87, 91, 91] },
        { id: "hardened_clay_stained_brown.png", rgb: [77, 51, 36] },
        { id: "hardened_clay_stained_blue.png", rgb: [74, 60, 91] },
        { id: "hardened_clay_stained_black.png", rgb: [37, 23, 17] },
        { id: "hardened_clay.png", rgb: [150, 93, 67] },
        { id: "gravel.png", rgb: [127, 124, 122] },
        { id: "grass_side.png", rgb: [127, 105, 65] },
        { id: "grass_path_side.png", rgb: [141, 104, 69] },
        { id: "gold_ore.png", rgb: [146, 142, 125] },
        { id: "gold_block.png", rgb: [250, 239, 80] },
        { id: "glowstone.png", rgb: [144, 118, 70] },
        { id: "glazed_terracotta_yellow.png", rgb: [236, 195, 91] },
        { id: "glazed_terracotta_white.png", rgb: [186, 212, 206] },
        { id: "glazed_terracotta_silver.png", rgb: [145, 167, 169] },
        { id: "glazed_terracotta_red.png", rgb: [182, 59, 52] },
        { id: "glazed_terracotta_purple.png", rgb: [109, 49, 152] },
        { id: "glazed_terracotta_pink.png", rgb: [237, 156, 182] },
        { id: "glazed_terracotta_orange.png", rgb: [162, 146, 87] },
        { id: "glazed_terracotta_magenta.png", rgb: [207, 100, 190] },
        { id: "glazed_terracotta_lime.png", rgb: [163, 197, 54] },
        { id: "glazed_terracotta_light_blue.png", rgb: [96, 165, 209] },
        { id: "glazed_terracotta_green.png", rgb: [114, 139, 62] },
        { id: "glazed_terracotta_gray.png", rgb: [83, 91, 94] },
        { id: "glazed_terracotta_cyan.png", rgb: [52, 116, 122] },
        { id: "glazed_terracotta_brown.png", rgb: [125, 106, 83] },
        { id: "glazed_terracotta_blue.png", rgb: [48, 68, 144] },
        { id: "glazed_terracotta_black.png", rgb: [69, 30, 32] },
        { id: "furnace_side.png", rgb: [119, 119, 119] },
        { id: "furnace_front_off.png", rgb: [79, 79, 79] },
        { id: "frosted_ice_3.png", rgb: [150, 190, 255] },
        { id: "frosted_ice_2.png", rgb: [141, 182, 255] },
        { id: "frosted_ice_1.png", rgb: [134, 179, 255] },
        { id: "frosted_ice_0.png", rgb: [125, 173, 255] },
        { id: "end_stone.png", rgb: [221, 224, 165] },
        { id: "end_bricks.png", rgb: [226, 231, 171] },
        { id: "enchanting_table_bottom.png", rgb: [19, 17, 28] },
        { id: "emerald_ore.png", rgb: [108, 129, 116] },
        { id: "emerald_block.png", rgb: [81, 218, 117] },
        { id: "dropper_front_vertical.png", rgb: [89, 89, 89] },
        { id: "dropper_front_horizontal.png", rgb: [123, 123, 123] },
        { id: "dragon_egg.png", rgb: [13, 9, 16] },
        { id: "dispenser_front_vertical.png", rgb: [88, 88, 88] },
        { id: "dispenser_front_horizontal.png", rgb: [123, 123, 123] },
        { id: "dirt_podzol_side.png", rgb: [123, 88, 58] },
        { id: "dirt.png", rgb: [134, 96, 67] },
        { id: "diamond_ore.png", rgb: [130, 142, 146] },
        { id: "diamond_block.png", rgb: [106, 222, 216] },
        { id: "concrete_yellow.png", rgb: [241, 175, 21] },
        { id: "concrete_white.png", rgb: [207, 213, 214] },
        { id: "concrete_silver.png", rgb: [125, 125, 115] },
        { id: "concrete_red.png", rgb: [142, 33, 33] },
        { id: "concrete_purple.png", rgb: [100, 32, 156] },
        { id: "concrete_powder_yellow.png", rgb: [233, 199, 55] },
        { id: "concrete_powder_white.png", rgb: [226, 228, 228] },
        { id: "concrete_powder_silver.png", rgb: [155, 155, 148] },
        { id: "concrete_powder_red.png", rgb: [168, 54, 51] },
        { id: "concrete_powder_purple.png", rgb: [132, 56, 178] },
        { id: "concrete_powder_pink.png", rgb: [229, 154, 181] },
        { id: "concrete_powder_orange.png", rgb: [227, 132, 32] },
        { id: "concrete_powder_magenta.png", rgb: [193, 84, 185] },
        { id: "concrete_powder_lime.png", rgb: [126, 189, 42] },
        { id: "concrete_powder_light_blue.png", rgb: [74, 181, 214] },
        { id: "concrete_powder_green.png", rgb: [97, 119, 45] },
        { id: "concrete_powder_gray.png", rgb: [77, 81, 85] },
        { id: "concrete_powder_cyan.png", rgb: [37, 148, 157] },
        { id: "concrete_powder_brown.png", rgb: [126, 85, 54] },
        { id: "concrete_powder_blue.png", rgb: [70, 73, 167] },
        { id: "concrete_powder_black.png", rgb: [25, 27, 32] },
        { id: "concrete_pink.png", rgb: [214, 101, 143] },
        { id: "concrete_orange.png", rgb: [224, 97, 1] },
        { id: "concrete_magenta.png", rgb: [169, 48, 159] },
        { id: "concrete_lime.png", rgb: [94, 169, 25] },
        { id: "concrete_light_blue.png", rgb: [36, 137, 199] },
        { id: "concrete_green.png", rgb: [73, 91, 36] },
        { id: "concrete_gray.png", rgb: [55, 58, 62] },
        { id: "concrete_cyan.png", rgb: [21, 119, 136] },
        { id: "concrete_brown.png", rgb: [96, 60, 32] },
        { id: "concrete_blue.png", rgb: [45, 47, 143] },
        { id: "concrete_black.png", rgb: [8, 10, 15] },
        { id: "cobblestone_mossy.png", rgb: [102, 121, 102] },
        { id: "cobblestone.png", rgb: [123, 123, 123] },
        { id: "coarse_dirt.png", rgb: [119, 85, 59] },
        { id: "coal_ore.png", rgb: [114, 114, 114] },
        { id: "coal_block.png", rgb: [19, 19, 19] },
        { id: "clay.png", rgb: [159, 165, 177] },
        { id: "chorus_flower_dead.png", rgb: [99, 64, 96] },
        { id: "chorus_flower.png", rgb: [142, 113, 142] },
        { id: "cauldron_side.png", rgb: [62, 62, 62] },
        { id: "brick.png", rgb: [146, 100, 87] },
        { id: "bookshelf.png", rgb: [106, 86, 56] },
        { id: "bone_block_top.png", rgb: [203, 198, 174] },
        { id: "bone_block_side.png", rgb: [225, 221, 202] },
        { id: "bedrock.png", rgb: [84, 84, 84] },
        { id: "beacon.png", rgb: [114, 222, 216] },
        { id: "anvil_base.png", rgb: [65, 65, 65] }
];
    var [r, g, b] = [rgb[0], rgb[1], rgb[2]];
    var lead_diff = 100;
    var lead_block = "";
    blocks.forEach(block => {
      var [cr, cg, cb] = [block.rgb[0], block.rgb[1], block.rgb[1]];
      var color_diff = Math.sqrt((r - cr)**2 + (g - cg)**2 + (b - cb)**2);
      if (color_diff < lead_diff) {
        lead_diff = color_diff;
        lead_block = block.id;
      }
    })
  return lead_block;
}