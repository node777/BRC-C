let bots=[]

async function loadBots(){
    let inscriptionList= await fetch("./inscriptions.json")
    inscriptionList = await inscriptionList.json()
    let blockList= await fetch("./blocks.json")
    blockList = await blockList.json()
    for(i in inscriptionList){
        bots[i]={
            id:inscriptionList[i],
            block:blockList[i],
            traits:generateTraits(blockList[i])
        }
    }
    let botHTML=``
    for(b in bots){
        botHTML+=drawBot(b)
    }
    document.getElementById("bots").innerHTML=botHTML

}
function drawBot(num){
    let traits=bots[num].traits
    return `
        <div class="bot">
            <img style="top:${num*272}px" class="piece" src="./parts/backgrounds/${traits.backgrounds}.png" />
            <img style="top:${num*272}px" class="piece" src="./parts/bodies/${traits.bodies}.png" />
            <img style="top:${num*272}px" class="piece" src="./parts/clothing/${traits.clothing}.png" />
            <img style="top:${num*272}px" class="piece" src="./parts/accessories/${traits.accessories}.png" />
            <img style="top:${num*272}px" class="piece" src="./parts/eyes/${traits.eyes}.png" />
            <img style="top:${num*272}px" class="piece" src="./parts/mouths/${traits.mouths}.png" />
        </div>
    `
}
function ruleQualifies(rules, digits){
    let r = false
    for(rule in rules){
        if(Number(digits[rule])==rules[rule]){
            r=true
        }else{return false}
    }
    return r
}
function getTrait(traitType, block){
    let digits = block.toString().split("")
    let trait=""
    for(part in parts[traitType]){
        let partData = parts[traitType][part]
        if(partData.default==true){
            trait=part
        }else if(ruleQualifies(partData.rules, digits)){
            return part
        }
    }
    return trait

}
function generateTraits(block){
    let traits={}
    for(traitType in parts){
        // traits[traitType]
        traits[traitType]=getTrait(traitType, block)
    }
    return traits
}
loadBots()
let parts = {
    backgrounds:{
        "none":{
            default:true
        },
        "city":{
            rules:{
                5:7
            }
        },
        "dmt":{

        },
        "dungeon":{

        },
        "gold":{

        },
        "mechanic":{

        },
        "stars":{

        },
    },
    bodies:{
        "golden":{
            default:true

        },
        "blue":{
            rules:{
                5:9
            }

        },
        "cursed":{
            rules:{
                5:8
            }

        },
        "hybrid":{
            rules:{
                5:7
            }

        },
        "purple":{
            rules:{
                5:6
            }

        },
        "unbot":{
            rules:{
                5:5
            }

        },
        "vbot":{
            rules:{
                5:4
            }

        },

    },
    accessories:{
        "classic":{
            default:true
            
        },
        "chain":{

        }
    },
    borg:{
        "classic":{
            default:true
            
        },
        "borg1":{
            
        },
        "borg2":{
            
        },
    },
    clothing:{
        "classic":{
            default:true
            
        },
        "blackT":{
            rules:{
                4:9
            }
            
        },
        "bladeJacket":{
            rules:{
                4:8
            }
            
        },
        "cursedJacket":{
            rules:{
                4:7
            }
            
        },
        "hoodie":{
            rules:{
                4:6
            }
            
        },
        "whiteT":{
            rules:{
                4:5
            }
            
        },
        "whiteTSimple":{
            rules:{
                4:4
            }
            
        },
    },
    eyes:{
        "bitmapVR":{
            default:true
            
        },
        "bitrunner":{
            
        },
        "blueXVisor":{
            
        },
        "blurryBlue":{
            
        },
        "blurryOrange":{
            
        },
        "classicXVisor":{
            
        },
        "cursedVR":{
            
        },
        "dmtVR":{
            
        },
        "eliteShades":{
            
        },
        "eyePatch":{
            
        },
        "fud":{
            
        },
        "laser":{
            rules:{
                3:9
            }
            
        },
        "neoTokyo":{
            rules:{
                3:8
            }
            
        },
        "orange":{
            rules:{
                3:7
            }
            
        },
        "ordi":{
            rules:{
                3:6
            }
            
        },
        "ordiBlue":{
            rules:{
                3:0
            }
            
        },
        "ordinalThug":{
            rules:{
                3:0
            }
            
        },
        "oversized":{
            rules:{
                3:0
            }
            
        },
        "purple":{
            
            rules:{
                3:5
            }
            
        },
        "redTriclops":{
            rules:{
                3:4
            }
            
        },
        "stoned":{
            rules:{
                3:3
            }
            
        },
        "triclops":{
            rules:{
                3:2
            }
            
        },
        "XPVisor":{
            rules:{
                3:1
            }
            
        },
        "yellowShades":{
            rules:{
                3:0
            }
            
        }
    },
    hats:{
        "none":{
            default:true
            
        },
        "bonnie":{
            
        },
        "circuits":{
            
        },
        "cursed":{
            
        },
        "daft":{
            
        },
        "pirateDjinn":{
            
        }
    },
    mouths:{
        "classic":{
            default:true
            
        },
        "blunt":{
            
        },
        "bubblegum":{
            
        },
        "laugh":{
            
        },
        "pirate":{
            
        },
        "rainbow":{
            
        },
        "toungue":{
            
        }
    }
}