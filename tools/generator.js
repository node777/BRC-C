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
            <img style="top:${num*272}px" class="piece" src="./parts/hats/${traits.hats}.png" />
            <img style="top:${num*272}px" class="piece" src="./parts/borg/${traits.borg}.png" />
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
function findObjectsWithIdenticalTraits(objects) {
    const traitGroups = {};

    objects.forEach(obj => {
        // Create a signature string from the traits object
        const traitsSignature = JSON.stringify(obj.traits);

        // If the group for this signature does not exist, create it
        if (!traitGroups[traitsSignature]) {
            traitGroups[traitsSignature] = [];
        }

        // Add the object to the corresponding group
        traitGroups[traitsSignature].push(obj);
    });

    // Now, traitGroups contains arrays of objects grouped by identical traits
    // You can process this however you need; for example, to find groups with more than one member (identical traits)
    for (const [signature, group] of Object.entries(traitGroups)) {
        if (group.length > 1) {
            console.log(`Found ${group.length} objects with identical traits: `, group.map(obj => obj.block));
        }
    }
}
loadBots()
let parts = {
    backgrounds:{
        "none":{
            default:true
        },
        "city":{
            rules:{
                5:5
            }
        },
        "dmt":{
            rules:{
                5:4
            }

        },
        "dungeon":{
            rules:{
                5:3
            }

        },
        "gold":{
            rules:{
                5:2
            }

        },
        "mechanic":{
            rules:{
                5:1
            }

        },
        "stars":{
            rules:{
                5:0
            }

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
            rules:{
                2:0
            }
            
        },
        "blueXVisor":{
            rules:{
                3:9,
                2:1
            }
            
        },
        "blurryBlue":{
            rules:{
                3:8,
                2:1
            }
            
        },
        "blurryOrange":{
            rules:{
                3:7,
                2:1
            }
            
        },
        "classicXVisor":{
            rules:{
                3:6,
                2:1
            }
            
        },
        "cursedVR":{
            rules:{
                3:5,
                2:1
            }
            
        },
        "dmtVR":{
            rules:{
                3:4,
                2:1
            }
            
        },
        "eliteShades":{
            rules:{
                3:3,
                2:1
            }
            
        },
        "eyePatch":{
            rules:{
                3:2,
                2:1
            }
            
        },
        "fud":{
            rules:{
                3:1,
                2:1
            }
            
        },
        "laser":{
            rules:{
                3:9,
                2:2
            }
            
        },
        "neoTokyo":{
            rules:{
                3:8,
                2:2
            }
            
        },
        "orange":{
            rules:{
                3:7,
                2:2
            }
            
        },
        "ordi":{
            rules:{
                3:6,
                2:2
            }
            
        },
        "ordiBlue":{
            rules:{
                3:0,
                2:2
            }
            
        },
        "ordinalThug":{
            rules:{
                3:0,
                2:2
            }
            
        },
        "oversized":{
            rules:{
                3:0,
                2:2
            }
            
        },
        "purple":{
            
            rules:{
                3:5,
                2:2
            }
            
        },
        "redTriclops":{
            rules:{
                3:4,
                2:2
            }
            
        },
        "stoned":{
            rules:{
                3:3,
                2:2
            }
            
        },
        "triclops":{
            rules:{
                3:2,
                2:2
            }
            
        },
        "XPVisor":{
            rules:{
                3:1,
                2:2
            }
            
        },
        "yellowShades":{
            rules:{
                3:0,
                2:2
            }
            
        }
    },
    hats:{
        "none":{
            default:true
            
        },
        "bonnie":{
            rules:{
                4:9
            }
            
        },
        "circuits":{
            rules:{
                4:8
            }
            
        },
        "cursed":{
            rules:{
                4:7
            }
            
        },
        "daft":{
            rules:{
                4:6
            }
            
        },
        "pirateDjinn":{
            rules:{
                4:5
            }
            
        }
    },
    mouths:{
        "classic":{
            default:true
            
        },
        "blunt":{
            
            rules:{
                4:5
            }
        },
        "bubblegum":{

            rules:{
                4:4
            }
        },
        "laugh":{
            rules:{
                4:3
            }
            
        },
        "pirate":{
            rules:{
                4:2
            }
            
        },
        "rainbow":{
            rules:{
                4:1
            }
            
        },
        "toungue":{
            rules:{
                4:0
            }
            
        }
    }
}