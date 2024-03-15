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
            <img style="top:${num*272}px" class="piece border" src="./parts/backgrounds/${traits.backgrounds}.png" />
            <img style="top:${num*272}px" class="piece" src="./parts/bodies/${traits.bodies}.png" />
            <img style="top:${num*272}px" class="piece" src="./parts/clothing/${traits.clothing}.png" />
            <img style="top:${num*272}px" class="piece" src="./parts/accessories/${traits.accessories}.png" />
            <img style="top:${num*272}px" class="piece" src="./parts/eyes/${traits.eyes}.png" />
            <img style="top:${num*272}px" class="piece" src="./parts/mouths/${traits.mouths}.png" />
            <img style="top:${num*272}px" class="piece" src="./parts/hats/${traits.hats}.png" />
            <img style="top:${num*272}px" class="piece" src="./parts/borg/${traits.borg}.png" />
            <div style="top:${num*272}px; left:10%" class="piece">${num}</div>
        </div>
    `
}
function ruleQualifies(data, digits){
    let r = false
    let andRules=data.rules||{}
    let orRules=data.orRules||{}
    let containsRules=data.containsRules

    // console.log(digits, data)
    //check contains rules
    if(containsRules!=undefined){
        for(rule in containsRules){
            if(digits.filter(value => value === containsRules[rule].n).length == containsRules[rule].c){
                return true
            }
        }
    }
    //check OR rules
    if(orRules!=undefined){
        for(rule in orRules){
            if(Number(digits[rule])==orRules[rule]){
                return true
            }
        }
    }
    //check AND rules
    
    if(andRules!=undefined){
        for(rule in andRules){
            if(Number(digits[rule])==andRules[rule]){
                r=true
            }else{return false}
        }
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
        }else if(ruleQualifies(partData, digits)){
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
            containsRules:[
                {
                    n:"3",
                    c:9
                }
            ]
        },
        "dmt":{
            containsRules:[
                {
                    n:"1",
                    c:9
                }
            ]

        },
        "dungeon":{
            containsRules:[
                {
                    n:"0",
                    c:9
                }
            ]

        },
        "gold":{
            containsRules:[
                {
                    n:"6",
                    c:9
                }
            ]

        },
        "mechanic":{
            containsRules:[
                {
                    n:"5",
                    c:9
                }
            ]

        },
        "stars":{
            containsRules:[
                {
                    n:"2",
                    c:9
                }
            ]

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

            rules:{
                4:6
            }
        }
    },
    borg:{
        "classic":{
            default:true
            
        },
        "borg1":{
            rules:{
                4:9
            }
            
        },
        "borg2":{
            rules:{
                4:8
            }
            
        },
    },
    clothing:{
        "classic":{
            default:true
            
        },
        "whiteT":{
            rules:{
                4:0
            }
            
        },
        "whiteTSimple":{
            rules:{
                4:1
            }
            
        },
        "blackT":{
            rules:{
                4:2
            }
            
        },
        "hoodie":{
            rules:{
                4:3
            }
            
        },
        "cursedJacket":{
            rules:{
                4:4
            }
            
        },
        "bladeJacket":{
            rules:{
                4:5
            }
            
        },
    },
    eyes:{
        "orange":{
            default:true
            
        },
        "dmtVR":{
            rules:{
                2:0,
                5:0
            }
            
        },
        "eyePatch":{
            rules:{
                2:0,
                5:1
            }
            
        },
        "bitmapVR":{
            rules:{
                2:0,
                5:2
            }
            
        },
        
        "ordinalThug":{
            rules:{
                2:1,
                3:0
            }
            
        },
        "oversized":{
            rules:{
                2:1,
                3:1
            }
            
        },
        "purple":{
            
            rules:{
                2:1,
                3:2
            }
            
        },
        "redTriclops":{
            rules:{
                2:1,
                3:3
            }
            
        },
        "stoned":{
            rules:{
                2:1,
                3:4
            }
            
        },
        "triclops":{
            rules:{
                2:1,
                3:5
            }
            
        },
        "fud":{
            rules:{
                2:1,
                3:6
            }
            
        },
        "blurryBlue":{
            rules:{
                2:1,
                3:7
            }
            
        },
        "blurryOrange":{
            rules:{
                2:1,
                3:8
            }
            
        },
        "classicXVisor":{
            rules:{
                2:1,
                3:9
            }
            
        },
        "yellowShades":{
            rules:{
                2:2,
                3:0
            }
            
        },
        "bitrunner":{
            rules:{
                2:2,
                3:1
            }
            
        },
        "blueXVisor":{
            rules:{
                2:2,
                3:2
            }
            
        },
        "cursedVR":{
            rules:{
                2:2,
                3:3
            }
            
        },
        
        "XPVisor":{
            rules:{
                2:2,
                3:4
            }
            
        },
        "eliteShades":{
            rules:{
                2:2,
                3:5
            }
            
        },
        "laser":{
            rules:{
                2:2,
                3:6
            }
            
        },
        "neoTokyo":{
            rules:{
                2:2,
                3:7
            }
            
        },
        "ordi":{
            rules:{
                2:2,
                3:8
            }
        },
        "ordiBlue":{
            rules:{
                2:2,
                3:9
            }
            
        },
    },
    hats:{
        "none":{
            default:true
            
        },
        "bonnie":{
            rules:{
                2:1,
                4:9
            }
            
        },
        "circuits":{
            rules:{
                2:1,
                4:8
            }
            
        },
        "cursed":{
            rules:{
                2:1,
                4:7
            }
            
        },
        "daft":{
            rules:{
                2:1,
                4:6
            }
            
        },
        "pirateDjinn":{
            rules:{
                2:0,
                4:7
            }
            
        }
    },
    mouths:{
        "classic":{
            default:true
            
        },
        "blunt":{
            
            rules:{
                5:0
            }
        },
        "bubblegum":{

            rules:{
                5:0,
                2:1
            }
        },
        "laugh":{
            rules:{
                5:1
            }
            
        },
        "pirate":{
            rules:{
                5:2
            }
            
        },
        "rainbow":{
            rules:{
                5:3
            }
            
        },
        "toungue":{
            rules:{
                5:4
            }
            
        }
    }
}
function countTraitFrequencies(objects) {
    const traitFrequencies = {};
  
    objects.forEach(obj => {
      Object.keys(obj.traits).forEach(trait => {
        const value = obj.traits[trait];
  
        // Initialize the trait category if it doesn't exist
        if (!traitFrequencies[trait]) {
          traitFrequencies[trait] = {};
        }
  
        // Initialize the trait value counter if it doesn't exist
        if (!traitFrequencies[trait][value]) {
          traitFrequencies[trait][value] = 0;
        }
  
        // Increment the counter for this trait value
        traitFrequencies[trait][value]++;
      });
    });
  
    return traitFrequencies;
  }