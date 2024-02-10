if (sheetVersion < 13001012) { throw "This script was made for a newer version of the sheet (v13.1.12). Please use the latest version and try again.\nYou can get the latest version at www.flapkan.com."; };
var iFileName = "Warmage_VSoS";
RequiredSheetVersion("13.1.12");
/* 
    NOTICE

    This script adds additional content to the MPMB character sheet.
    Previous scripts for this class was made by MPMB for v13.0 and has not been updated for v13.1.12. 

    MPMB's script also had the house of pawns subclass added to it for an older version of the class.
    Previous warmage house of knights sublcass was made by u/decoratedbear
	These were from MFoV (Middle Finger of Vecna) and not from VSoS

    There is also content from Valda's Races, Equipment, Magic Items, and Spells found here https://pastebin.com/0CdaqJs5 that I will be using 
	its cantrips and cantrip attack entries from.

    Similarities between these scripts is due to updating syntax and/or anything else to fit v13.1.12 

	I fixed the 'Springheel' cantrip incorrectly listing 'springheel' as part of the classes. The change is still kept in comments below
*/

/*
    IMPORTANT

    There are a lot of discrepencies between VSoS and MFoV. Following comments on changes is listed appropriately.

    Caution: This sheet might not function properly  with Valda's Races, Equipment, Magic Items, and Spells found here https://pastebin.com/0CdaqJs5
    These scripts both contain cantrip and attack entries that might cause the sheet to not work properly. Additionally, the SourceList is the same.

    I will be using the Valda Spire of Secrets source for this. MFoV (Middle Finger of Vecna is also used but I dont have access to that book) there are also discrepencies between VSoS and MFoV
    This can be changed later if needed or if someone wants to correct the sources
*/

SourceList["VSoS"] = {
    name : "Valda Spire of Secrets",
    abbreviation : "VSoS",
    group : "Third Party",
    abbreviationSpellsheet : "V",
    date : "2024/01/24"
};

//implement spell list
[
    //cantrips
    "arc blade", "acid splash", "burning blade", "card trick", "caustic blade", "cheat", "chill touch", "cryptogram", "finger guns", "fire bolt", "force buckler", "force dart", "force weapon", "frigid blade", "light", "lightning surge", "mage hand", "magic daggers", "mending", "minor illusion", "moment to think", "phantom grapnel", "poison spray", "prestidigitation", "produce flame", "quickstep", "ray of frost", "shocking grasp", "sonic pulse", "springheel", "thunderous distortion", "true strike"
].forEach( function (s) {if(SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("warmage") === -1) SpellsList[s].classes.push("warmage");});

//add class
ClassList["warmage"] = {
    regExpSearch : /warmage/i,
    name : "Warmage",
    source : ["VSoS", 157],
    primaryAbility : "Intelligence",
	prereqs : "Intelligence 13",
    die : 8,
    improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
    saves : ["Con", "Int"],
    skillstxt : {
		primary : "Choose two from Animal Handling, Arcana, Athletics, Acrobatics, History, Investigation, Medicine, Perception, and Survival"
	},
	toolProfs : {
		primary : [["Artisan's tool", 1], ["Musical instrument", 1]]
	},
	armorProfs : {
		primary : [true, false, false, false],
		secondary : [true, false, false, false]
	},
	weaponProfs : {
		primary : [true, false],
		secondary : [true, false]
	},
    equipment : "Warmage starting equipment:\n \u2022 Leather armor, a dagger, and any simple weapon;\n \u2022 A light crossbow and 20 bolts -or- a shortbow and 20 arrows\n \u2022 An explorer's pack -or- a scholar's pack -or- one kit you're proficient in.\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Warmage House", []],
    attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    abilitySave : 4,
    spellcastingFactor : 3, //when multiclassing, use 1/3 factor
    spellcastingKnown : {
        cantrips : [],
		spells : []
    },
	// spellcastingList : {
	// 	"class" : "warmage",
	// 	level : [0, 0]
	// },
	spellcastingExtra : [],
    features : {
        "spellcasting" : {
			name : "Spellcasting",
			source : ["VSoS", 158],
			minlevel : 1,
			description : desc([
				"I can cast warmage cantrips, using Intelligence as my spellcasting ability",
				"I can use an arcane focus as a spellcasting focus",
				"Whenever I gain a warmage level, I can replace a cantrip I know with another"
			]),
			additional : ["4 cantrips known", "4 cantrips known", "5 cantrips known", "5 cantrips known", "6 cantrips known", "6 cantrips known", "6 cantrips known", "6 cantrips known", "7 cantrips known", "7 cantrips known", "7 cantrips known", "7 cantrips known", "8 cantrips known", "8 cantrips known", "8 cantrips known", "8 cantrips known", "9 cantrips known", "9 cantrips known", "9 cantrips known", "10 cantrips known"],
			spellcastingBonus : {
				name : "Cantrips",
				"class" : "warmage",
				level : [0, 0],
				times : levels.map( function (n) { 
					return n < 3 ? 4 : n < 5 ? 5 : n < 9 ? 6 : n < 13 ? 7 : n < 17 ? 8 : n < 20 ? 9 : 10;
				})
			}
		}, 
        //below are the following changes and additions from VSoS
        "arcane initiation" : {
			name : "Arcane Initiation",
			source : ["VSoS", 159],
			minlevel : 1,
			description : desc(["Choose an Initiation using the \"Choose Feature\" button above"]), //(Adventurer, Circus Performer, Eldritch Event, Mercenary, Temple, Tower Apprentice, Self-Taught, Survival)
			extraname : "Arcane Initiation",
			extrachoices : ["Adventurer", "Circus Performer", "Eldritch Event", "Mercenary", "Temple", "Tower Apprentice", "Self-Taught", "Survival"],
			extraTimes : 1,
            //There is not a sage, savant, or scholar initiation. The ones listed in Valda are in the choices above.
            "adventurer" : {
                name : "Arcane Initiation: Adventurer",
                description : desc([
                    "You picked up your magic informally by traveling with a dozen different mages over the years. You learn the mage hand and ray of frost cantrips."
                ]),
                spellcastingBonus : {
                    name : "Arcane Initiation: Adventurer",
                    spells : ["mage hand", "ray of frost"],
                    selection : ["mage hand", "ray of frost"],
                    times : 2
                }
            },
            "circus performer" : {
                name : "Arcane Initiation: Circus Performer",
                description : desc([
                    "You learned a few simple tricks to participate in a sideshow or circus act. You learn the dancing lights and minor illusion cantrips."
                ]),
                spellcastingBonus : {
                    name : "Arcane Initiation: Circus Performer",
                    spells : ["minor illusion", "dancing lights"],
                    selection : ["minor illusion", "dancing lights"],
                    times : 2
                }
            },
            "eldritch event" : {
                name : "Arcane Initiation: Eldritch Event",
                description : desc([
                    "An influx of insidious magic left an imprint on you. You learn the chill touch and message cantrips."
                ]),
                spellcastingBonus : {
                    name : "Arcane Initiation: Eldritch Event",
                    spells : ["chill touch", "message"],
                    selection : ["chill touch", "message"],
                    times : 2
                }
            },
            "mercenary" : {
                name : "Arcane Initiation: Mercenary",
                description : desc([
                    "You mastered the fundamentals of war magic to engage in battle with similarly armed arcanists. You learn the arc blade and true strike cantrips."
                ]),
                spellcastingBonus : {
                    name : "Arcane Initiation: Mercenary",
                    spells : ["arc blade", "true strike"],
                    selection : ["arc blade", "true strike"],
                    times : 2
                }
            },
            "temple" : {
                name : "Arcane Initiation: Temple",
                description : desc([
                    "A monastery or temple educated you in the ways of gentle healing magic. You learn the sacred flame and spare the dying cantrips."
                ]),
                spellcastingBonus : {
                    name : "Arcane Initiation: Temple",
                    spells : ["sacred flame", "spare the dying"],
                    selection : ["sacred flame", "spare the dying"],
                    times : 2
                }
            },
            "tower apprentice" : {
                name : "Arcane Initiation: Tower Apprentice",
                description : desc([
                    "You apprenticed under a spellcaster for some time, who taught you the fundamentals of arcana. You learn the prestidigitation and shocking grasp cantrips."
                ]),
                spellcastingBonus : {
                    name : "Arcane Initiation: Tower Apprentice",
                    spells : ["prestidigitation", "shocking grasp"],
                    selection : ["prestidigitation", "shocking grasp"],
                    times : 2
                }
            },
            "self-taught" : {
                name : "Arcane Initiation: Self-Taught",
                description : desc([
                    "You taught yourself all the fundamentals of magic from a dusty old tome or abandoned scroll. You learn the fire bolt and light cantrips."
                ]),
                spellcastingBonus : {
                    name : "Arcane Initiation: Self-Taught",
                    spells : ["fire bolt", "light"],
                    selection : ["fire bolt", "light"],
                    times : 2
                }
            },
            "survival" : {
                name : "Arcane Initiation: Self-Taught",
                description : desc([
                    "You taught yourself all the fundamentals of magic from a dusty old tome or abandoned scroll. You learn the fire bolt and light cantrips."
                ]),
                spellcastingBonus : {
                    name : "Arcane Initiation: Self-Taught",
                    spells : ["fire bolt", "light"],
                    selection : ["fire bolt", "light"],
                    times : 2
                }
            }
        },
        "arcane fighting style" : {
			name : "Arcane Fighting Style",
			source : ["VSoS", 159],
			minlevel : 1,
			description : desc(["Choose an Arcane Fighting Style using the \"Choose Feature\" button above"]),
			extraname : "Arcane Fighting Style",
			extrachoices : ["Blaster", "Deflector", "Resistive", "Sniper", "Striker"],
			extraTimes : 1,
			"blaster" : {
				name : "Arcane Blaster Fighting Style",
				description : desc(["My warmage spell save DC increases by 1"]),
				calcChanges : {
					spellCalc : [
						function (type, spellcasters, ability) {
							if (type == "dc" && spellcasters.indexOf("warmage") !== -1) return 1;
						},
						"My warmage spell gain a +1 bonus on their save DC" // +1 not +2.
					]
				}
			},
			"deflector" : {
				name : "Arcane Deflector Fighting Style",
				description : desc([
					"As a reaction if targeted by spell attack or ranged weapon attack, and if I have at least one free hand, I can increase my AC.", //must have at least one hand free
					"The bonus to my AC is equal to my Proficiency Bonus and can cause the attack to miss."
				]),
				action : ["reaction", ""]
			},
			"resistive" : {
				name : "Resistive Arcane Fighting Style",
				description : desc(["I gain +1 AC while wearing light or medium armor, or under the effects of Mage Armor."]),
				extraAC : [{
					mod : 1,
					name : "Resistive Fighting Style",
					text : "I gain a +1 bonus AC while I'm wearing light or medium armor, or if I'm under the effects of the Mage Armor spell.",
					stopeval : function (v) {
						return (!v.wearingArmor || v.heavyArmor) || !(/^mage armou?r$/).test(CurrentArmour.known);
					}
				}]
			},
			"sniper" : { //in VSoS the bonus is a +1
				name : "Arcane Sniper Fighting Style",
				description : desc(["I gain +1 bonus to attack rolls I make with ranged spell attacks."]), 
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (v.isSpell && (/^(?!.*melee).*\d+.*$/i).test(fields.Range)) {
								output.extraHit += 1;
							};
						},
						"My ranged spell attacks get a +1 bonus on the to hit."
					]
				}
			},
			"striker" : {
				name : "Arcane Striker Fighting Style",
				description : desc(["Reroll 1 or 2 on damage die when making melee spell attack with a warmage cantrip."])
			}
		},
		"warmage edge" : {
			name : "Warmage Edge",
			source : ["VSoS", 160],
			minlevel : 2,
			description : desc([
				"At 2nd level, once on each of my turns when I deal damage with a warmage cantrip, I can add my Intelligence modifier to the damage.",
				"At 5th level, I can further this to add extra dice to my warmage cantrip damage."
			]),
			additional : levels.map( function (n) {
				return (n < 5 ? "" : n < 11 ? 1 : n < 17 ? 2 : 3) + (n < 5 ? "" : n < 11 ? " extra die" : " extra dice");
			}),
			calcChanges : {
				atkCalc : [
					function(fields, v, output) {
						if(classes.known.warmage && classes.known.warmage.level > 1 && v.thisWeapon[3] && v.thisWeapon[4].indexOf("warmage") !== -1 && SpellsList[v.thisWeapon[3]].level === 0) {
							output.extraDmg += What('Int Mod');
						};
					},
					"My warmage cantrips get my Intelligence modifier added to their damage."
				],
				spellAdd : [
					function(spellKey, spellObj, spName) {
						if( spName.indexOf("warmage") == -1 || !What("Int Mod") || Number(What("Int Mod")) || !spellObj.psionic || spellObj.level !== 0) return;
						return genericSpellDmgEdit(spellKey, spellObj, "\\w+\\.?", "Int"); 
					},
					"My warmage cantrips get my Intelligence modifier added to their damage."
				]
			}
		},	
		"warmage tricks" : {
			name : "Warmage Tricks",
			minlevel : 2,
			source : ["VSoS",160],
			description : desc([
				"Use the \"Choose Feature\" button above to add Warmage Tricks to the third page.",
				"Whenever I gain a warmage level, I can replace a trick I know with another."
			]),
			additional : levels.map(function (n) {
				return (n < 2 ? "" : n < 3 ? 2 : n < 5 ? 3 : n < 7 ? 4 : n < 9 ? 5 : n < 11 ? 6 : n < 13 ? 7 : n < 15 ? 8 : n < 17 ? 9 : 10) + " tricks known";
			}),
			extraname : "Warmage Tricks",
			extrachoices : ["bishop's maneuver (prereq: level 10)", "blasting cantrip", "blinding light (prereq: light cantrip)", "castle (prereq: level 10 warmage)", "chivalrous presence", "cloak of feathers", "flexible range", "directed momentum", "draining cantrip", "encryptogram (prereq: cryptogram)", "explosive cantrip", "extended range", "field medic", "fold (prereq: level 10)", "gamble (prereq: cheat, house of dice or house of cards)", "infinite variation (prereq: prestidigitation)", "icy cantrip", "knight's aegis (prereq: level 10, force buckler)", "leading edge tactics", "lieutenant's demand (prereq: level 10)", "mage hand knack (prereq: mage hand)", "minor shadow illusion (prereq: minor illusion)"],
			"bishop's maneuver (prereq: level 10)" : {
				name : "Bishop's Maneuver",
				source : ["VSoS", 161],
				submenu : "[house of bishops]",
				description : desc([
					"You can take the Disengage action as a bonus action, and when you do so, your walking speed increases by 10 feet until the end of your turn."
				]),
				action : ["bonus action",""],
				prereqeval : function(v) { return classes.known.warmage.level >= 10 && classes.known.warmage.subclass.indexOf("house of bishops") !== -1; },
			},
			"blasting cantrip" : {
				name : "Blasting Cantrip",
				source : ["VSoS", 161],
				description : desc([
					"Once per turn when I deal force damage with a warmage cantrip, I can push a creature up to 10 ft away from me."
				]),
				usages : 1,
				recovery : "Turn",
			},
			"blinding light (prereq: light cantrip)" : {
				name : "Blinding Light",
				source : ["VSoS", 161],
				description : desc([
					"When I cast Light on an object I am holding, I can shoot a flare at a creature within 10 ft of me.",
					"It much succeed on a Constitution saving throw or become blinded until the start of my next turn. After a creature has failed a saving throw against this trick, it has advantage on all saving throws against it for the next 24 hours."
				]),
				prereqeval : function(v) { return isSpellUsed('light', true); }
			},
			"castle (prereq: level 10 warmage)" : {
				name : "Castle",
				source : ["VSoS", 161],
				submenu : "[house of rooks]",
				description : desc([
					"As an action, I can choose a small or medium willing creature within 120 ft of me to teleport and swap places. Once I use this feature, I can't use this again until I finish a short or long rest."
				]),
				action : ["action",""],
				prereqeval : function(v) { return classes.known.warmage.level >= 10 && classes.known.warmage.subclass.indexOf("house of rooks") !== -1; },
			},
			"chivalrous presence" : {
				name : "Chivalrous Presence",
				source : ["VSoS", 161],
				submenu : "[house of knights]",
				description : desc([
					"I gain proficiency with Insight and Persuasion, and have advantage on ability checks when interacting with nobility. Additionally, other creatures can always discern when you're telling the truth."
				]),
				skills : ["Insight", "Persuasion"],
				skillstxt : "I gain proficiency with Insight and Persuasion",
				prereqeval : function(v) { return classes.known.warmage.subclass.indexOf("house of knights") !== -1; },
			},
			"cloak of feathers" : {
				name : "Cloak of Feathers",
				source : ["VSoS", 161],
				description : desc([
					"When wearing no armor and not wielding a shield, my AC equals to 10 + Dexterity + Intelligence."
				]),
				armorOptions : [{
					regExpSearch : /addToDropDown/,
					name : "Cloak of Feathers (Int)",
					source : ["VSoS", 161],
					ac : "10+Int+Dex",
					affectsWildShape : true
				}],
				armorAdd : "Cloak of Feathers (Int)"
			},
			"commander's steed" : {
				name : "Commander's Steed (prereq: house of kings)",
				source : ["VSoS", 161],
				submenu : "[house of kings]",
				description : desc([
					"I learn the find steed spell and can cast it without expending a spell slot. Your steed is more resilient than most; its hit point maximum is increased by an amount equal to your warmage level."
				]),
				spellcastingBonus : {
					name : "Commander's Steed",
					spells : ["find steed"],
					selection : ["find steed"],
					times : 1,
					firstCol : "atwill"
				},
				prereqeval : function(v) { return classes.known.warmage.subclass.indexOf("house of kings") !== -1; }
			},
			"corrosive cantrip" : {
				name : "Corrosive Cantrip",
				source : ["VSoS", 161],
				description : desc([
					"Once on each of my turns when I deal acid damage to a creature with a warmage cantrip, I can corrode the target's defenses. The next time a creature makes an attack roll against the target before the start of my next turn, roll 1d4 and subtract it from the target's AC for this attack." 
				]),
				usages : 1,
				recovery : "Turn",
			},
			"directed momentum" : { 
				name : "Directed Momentum",
				source : ["VSoS", 161],
				submenu : "[house of lancers]",
				description : desc([
					"Once on each of my turns, when I score a critical hit with a melee attack or reduce a creature to 0 hit points with one, I can make an unarmed strike against a second target. If the target is within range of my Shock Trooper feature, I can lunge toward it. On a hit, this attack deals an extra 1d8 force damage."
				]),
				prereqeval : function(v) { return classes.known.warmage.subclass.indexOf("house of lancers") !== -1; },
				usages : 1,
				recovery : "Turn",
			},
			"draining cantrip" : {
				name : "Draining Cantrip",
				source : ["VSoS", 161],
				description : desc([
					"Whenever I deal necrotic or poison damage to a hostile creature with a warmage cantrip, I gain temporary hit points equal to half my warmage level, which lasts for 1 minute."
				])
			},
			"encryptogram (prereq: cryptogram)" : {
				name : "Encryptogram",
				source : ["VSoS", 162],
				description : desc([
					"When I cast the Cryptogram cantrip, its limit is 20 characters instead of 8, and only the specified recipient can read the message."
				]),
				prereqeval : function(v) { return isSpellUsed('cryptogram', true); },
				spellChanges : {
					"cryptogram" : {
						description : "Send a message up to 20 characters (incl. spaces) to known crea on same plane, 1/day; Only recip. can read the message",
						descriptionFull : "You send a small scroll with a short message to a creature of your choice. The recipient must be a creature known to you and also be on the same plane of existence as you. This scroll will hover in front of the recipient, drop into their pocket, or appear sitting on something nearby. The scroll’s message can be up to 20 characters long (spaces count as characters). You can send only one scroll to a single target each day. Only the target is able to read the message."
					}
				}
			},
			"explosive cantrip" : {
				name : "Explosive Catrip",
				source : ["VSoS", 162],
				description	: desc([
					"Once on each of my turns when I deal fire damage to a creature with a warmage cantrip, each creature within 5 ft of the target, except myself, must succeed a Dexterity save against my Spell Save DC or take half the fire damage dealt to the target.",
				])
			},
			"extended range" : {
				name : "Extended Range",
				source : ["VSoS", 162],
				description : desc([
					"My warmage cantrips that have a range of 5 ft or greater has its range doubled."
				]),
				calcChanges : {
					atkAdd : [
						function(fields, v) {
							if(v.thisWeapon[3] && SpellsList[v.thisWeapon[3]].level === 0 && v.thisWeapon[4].indexOf("warmage") !== 1 && (/\d+ ?(f.{0,2}t|m)/i.test(fields.Range)) && fields.Range.match(/\d+([.,]\d+)?/g) >= 5) { //only want warmage cantrips with a range of 5 ft or greater
								var rngNum = fields.Range.match(/\d+([.,]\d+)?/g);
								var oChar = fields.Range.split(RegExp(rngNum.join('|')));
								fields.Range = '';
								rngNum.forEach(function (dR, idx) {
									fields.Range += (oChar[idx] ? oChar[idx] : '') + (parseFloat(dR.toString().replace(',', '.') * 2));
								});
								if (oChar.length > rngNum.length) {
									fields.Range += oChar[oChar.length - 1];
								};
								if (!v.rangeM) {
									v.rangeM = 2;
								} else {
									v.rangeM *= 2;
								}
							};
						},
						"My warmage cantrips that have a range of 5 ft or greater has its range doubled.",
						700
					],
					spellAdd : [
						function(spellKey, spellObj, spName) {
							if( !spellObj.psionic && spName === "warmage" && spellObj.level === 0 && /melee/i.test(spellObj.description + spellObj.descriptionFull) && /\d+([.,]\d+)?[\- ]?(f.{0,2}t|m)/i.test(spellObj.range) ) {
								var sRange = spellObj.range.match(/\d+([.,]\d+)?/g); 
								var oChar = spellObj.range.split(RegExp(sRange.join('|')));
								spellObj.range = '';
								sRange.forEach(function (dR, idx) {
									spellObj.range += (oChar[idx] ? oChar[idx] : '') + (parseFloat(dR.toString().replace(',', '.')) * 2);
								});	
								if (oChar.length > sRange.length) {
									spellObj.range += oChar[oChar.length - 1];
								};
								return true;
							};
						},
						"My warmage cantrips that have a range of 5 ft or greater has its range doubled.",
						700
					]
				}
			},
			"field medic" : {
				name : "Field Medic",
				source : ["VSoS", 162], 
				description : desc([
					"I learn spare the dying and this doesn't count towards the number of cantrips I know. Additionally when I cast spare the dying, on a creature that has 0 hit points, it instead gains 1 hit point and a number of temporary hit points equal to my warmage level, which last for 1 minute. Once a creature gains hit points this way, it can't do so again until it finished a long rest."
				]),
				submenu : "[house of bishops]",
				prereqeval : function(v) { return classes.known.warmage.subclass.indexOf("house of bishops") !== -1; },
				spellcastingBonus : {
					name : "Field Medic",
					spells : ["spare the dying"],
					selection : ["spare the dying"]
				},
				spellChanges : {
					"spare the dying" : { //this can be changed to become dynamic later on, I wasnt sure if I can do so in the description
						description : "1 living creature with 0 current HP regain 1 HP + warmage level temp HP",
						descriptionFull : "You touch a living creature that has 0 hit points. The creature regains 1 hit point + my warmage level in temporary hit points which last for 1 minute. A creature that regains hit points this way can't do so again until it finishes a long rest. This spell has no effect on undead or constructs."
					}
				}
			},
			"flexible range" : {
				name : "Flexible Range",
				source : ["VSoS", 162], 
				description : desc([
					"Being within 5 ft of a hostile creature doesn't impose disadvantage on my ranged spell attack rolls. Additionally, my warmage cantrip melee spell attacks has its range increased by 10 ft."
				]),
				// Works thanks to the help from joost 
				calcChanges : {
					atkCalc : [
						function(fields, v, output) {
							if( !v.isDC && v.isSpell && v.thisWeapon[4].indexOf('warmage') !== 1 && SpellsList[v.thisWeapon[3]].level === 0 && ((/melee/i).test(fields.description) || (/melee/).test(fields.Range))) { //only want warmage melee spell attack cantrips
								var sRange = fields.Range.match(/\d+([.,]\d+)?/g);  // Handles special cases like thorn whip or other 'ranged' melee spells
								var oChar = fields.Range.split(RegExp(sRange.join('|')));
								fields.Range = '';
								sRange.forEach(function (dR, idx) {
									fields.Range += (oChar[idx] ? oChar[idx] : '') + (parseFloat(dR.toString().replace(',', '.') + 10));
								});
								if (oChar.length > sRange.length) {
									fields.Range += oChar[oChar.length - 1];
								}; 
								//Left out the metric if statements, if this is an issue, I can add these back
							};
						},
						"Being within 5 ft of a hostile creature doesn't impose disadvantage on my ranged spell attack rolls. Additionally, my warmage cantrip melee spell attacks has its range increased by 10 ft"
					],
					spellAdd : [
						function(spellKey, spellObj, spName) {
							if( !spellObj.psionic && spName === "warmage" && spellObj.level === 0 && /melee/i.test(spellObj.description + spellObj.descriptionFull) && /\d+([.,]\d+)?[\- ]?(f.{0,2}t|m)/i.test(spellObj.range) ) {
								var sRange = spellObj.range.match(/\d+([.,]\d+)?/g); 
								var oChar = spellObj.range.split(RegExp(sRange.join('|')));
								spellObj.range = '';
								sRange.forEach(function (dR, idx) {
									spellObj.range += (oChar[idx] ? oChar[idx] : '') + (parseFloat(dR.toString().replace(',', '.')) + 10);
								});
								if (oChar.length > sRange.length) {
									spellObj.range += oChar[oChar.length - 1];
								};
								return true;
							};
						},
						"Being within 5 ft of a hostile creature doesn't impose disadvantage on my ranged spell attack rolls. Additionally, my warmage cantrip melee spell attacks has its range increased by 10 ft",
						700
					],
				}
			},
			"fold (prereq: level 10)" : {
				name : "Fold",
				source : ["VSoS", 162],
				submenu : "[house of cards]",
				description : desc([
					"As a reaction when I am hit by an attack, I can use my Deck of Fate to play my entire hand to case the shield spell without expending a spell slot. Once I use this trick, I can't use it again until I finished a short or long rest."
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 10 && classes.known.warmage.subclass.indexOf("house of cards") !== -1; },
				action : ["reaction",""]
			},
			"gamble (prereq: cheat, house of dice or house of cards)" : {
				name : "Gamble",
				source : ["VSoS", 162],
				description : desc([
					"I am always considered under the effects of the cheat cantrip. Additionally, I can reroll an attack roll, ability check, or saving throw. Once I use this ability, I can't use it again until I finish a short or long rest."
				]),
				prereqeval : function(v) { return isSpellUsed('cheat', true) && (classes.known.warmage.subclass.indexOf("house of dice") !== -1 || classes.known.warmage.subclass.indexOf("house of cards")) !== -1; },
			},
			"infinite variation (prereq: prestidigitation)" : {
				name : "Infinite Variation",
				source : ["VSoS", 162],
				description : desc([
					"When I cast prestidigitation, I can emulate the effects of another non-damaging cantrip. To do this, I must succeed on a DC 15 Intelligence (Arcana) or the spell fails. I can pick any cantrip do this with. Intelligence is my spellcasting ability for a cantrip cast using this trick, and it counts as a warmage cantrip for me."
				]),
				prereqeval : function(v) { return isSpellUsed('prestidigitation', true); },
			},
			"icy cantrip" : {
				name : "Icy Cantrip",
				source : ["VSoS", 162],
				description : desc([
					"Once on each of my turns when I deal cold damage to a creature with a warmage cantrip, the first attack roll before the end of the targets next turn, the target must roll a d4 and subtract the number from the attack roll."
				])
			},
			"knight's aegis (prereq: level 10, force buckler)" : {
				name : "Knight's Aegis ",
				source : ["VSoS", 162],
				submenu : "[house of knights]",
				description : desc([
					"When I cast the force buckler cantrip, I can concentrate on it for up to 1 minute. The spell doesn't end early if I am hit by an attack."
				]),
				prereqeval : function (v) { return isSpellUsed('force buckler') && classes.known.warmage.level >= 10 && classes.known.warmage.subclass.indexOf("house of knights") !== -1; }
			},
			"leading edge tactics" : {
				name : "Leading Edge Tactics",
				source : ["VSoS", 163],
				submenu : "[house of lancers]",
				description : desc([
					"I always have a plan when engaging the enemy. When a creature makes an attack against me during the first round of combat, it has disadvantage on the roll."
				]),
				prereqeval : function (v) { return classes.known.warmage.subclass.indexOf("house of lancers") !== -1; }
			},
			"lieutenant's demand (prereq: level 10)" : {
				name : "Lieutenant's Demand",
				source : ["VSoS", 163],
				submenu : "[house of kings]",
				description : desc([
					"I can cast the command spell at will without expending a spell slot."
				]),
				spellcastingBonus : [{
					name : "Liutenant's Demand",
					spells : ["command"],
					selection : ["command"],
					firstCol : "atwill"
				}],
				prereqeval : function (v) {return classes.known.warmage.level >= 10 && classes.known.warmage.subclass.indexOf("house of kings") !== -1; }
			},
			"mage hand knack (prereq: mage hand)" : {
				name : "Mage Hand Knack",
				source : ["VSoS", 163],
				description : desc([
					"When I cast mage hand, and as a bonus action on subsequent turns, I can choose one of the following effects: Press, Punch, Seize. See Notes and Spell Changes."
				]),
				toNotesPage : [{
					name : "Mage Hand Knack",
					page3notes : true,
					note : desc([
						"Press: Choose a large or smaller creature and a direction away from that creature. Every foot of moment in that direction costs the creature 1 extra foot of movement. The hand continues this effect until the spell ends or you use your bonus action to use a different effect with the hand.",
						"Punch: The hand strikes one creature or objext with 5 ft of it. Make a melee spell attack for the hand using your spell attack bonus. On a hit, the target takes 1d6 force damage.",
						"Seize: The hand grabs a tiny creature and attempts to grapple it. The creature must succeed on a Strength (Athletics) or Dexterity (Acrobatics) check against my sepll save DC or be grappled. The hand continues this effect until the target uses an action to break the grapple on its turn, the spell ends, or I use my bonus action to use a different effect with the hand."
					])
				}],
				prereqeval : function(v) { return isSpellUsed('mage hand', true); },
				spellChanges : {
					"mage hand" : {
						descriptionFull : "Create invisible spectral hand for simple tasks or carry up to 10 lb; 1 a to control; can't have multiples; Upon casting, and Upon casting, and as a bonus action on subsequent turns, You can choose one of the following effects: Press, Punch, Seize. See Notes page.",
						changes : "Upon casting, and as a bonus action on subsequent turns, I can choose one of the following effects: Press, Punch, Seize. See Notes page."
					}
				},
				action : ["bonus action",""]
			},
			"minor shadow illusion (prereq: minor illusion)" : {
				name : "Minor Shadow Illusion",
				source : ["VSoS", 163],
				description : desc([
					"When I create the image of an object in an unoccupied space using minor illusion, I can fill it with fibers of shadowstuff to become partially real. This image ust not be larger than a 5 ft cube. It has AC 10 and 5 hit points, and it weighs 5lbs. Only one of these can exist at a time, and while it exists it requires concentration.",
					"This illusion can't replicate a creature, but it can deal damage to a creature within its 5 ft cube. If the illusion is an object that can deal damage, a creature that enters the object's 5 ft cube or begins its turn there must make an Intelligence saving throw. On a failed save, the creature takes 1d6 damge of a type appropriate to the illusion. This damage increases with my warmage level. This damage can't trigger Warmage Edge or any warmage tricks."
				]),
				prereqeval : function(v) { return isSpellUsed('minor illusion', true); },
				spellChanges : {
					"minor illusion" : {
						descriptionFull : "You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again." + "\n   " + "If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a lion's roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends." + "\n   " + "When you create the image of an object in an unoccupied space, you can fill it with fibers of shadowstuff to become partially real. This image must not be larger than a 5 ft cube. It has AC 10 and 5 hit points, and it weighs 5lbs. Only one of these can exist at a time, and while it exists it requires concentration. This illusion can't replicate a creature, but it can deal damage to a creature within its 5 ft cube. If the illusion is an object that can deal damage, a creature that enters the object's 5 ft cube or begins its turn there must make an Intelligence saving throw. On a failed save, the creature takes 1d6 damge of a type appropriate to the illusion. This damage increases with my warmage level. This damage can't trigger Warmage Edge or any warmage tricks." + "\n   " + "If a creature uses its action to examine the sound or image, the creature can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the illusion becomes faint to the creature.",
						descriptionCantripDie : "creature enters or starts within 5ft cube save or 'CD'd6 Force dmg",
						changes : "When you create the image of an object in an unoccupied space, you can fill it with fibers of shadowstuff to become partially real. This image must not be larger than a 5 ft cube. It has AC 10 and 5 hit points, and it weighs 5lbs. Only one of these can exist at a time, and while it exists it requires concentration. This illusion can't replicate a creature, but it can deal damage to a creature within its 5 ft cube. If the illusion is an object that can deal damage, a creature that enters the object's 5 ft cube or begins its turn there must make an Intelligence saving throw. On a failed save, the creature takes 1d6 damge of a type appropriate to the illusion. This damage increases with my warmage level. This damage can't trigger Warmage Edge or any warmage tricks.",
					}
				},
			},
			"mystical armor" : {
				name : "Mystical Armor",
				source : ["VSoS", 163],
				description : desc([
					"I can cast mage armor on myself at will without expending a spell slot or spell components."
				]),
				spellcastingBonus : {
					name : "Mystical Armor",
					spells : ["mage armor"],
					selection : ["mage armor"],
					firstCol : "atwill"
				},
				spellChanges : {
					"mage armor" : {
						description : "I can cast mage armor on myself at will without expending a spell slot or spell components",
						descriptionShorter : "Cast mage armor on self at will; requires no spell components or spell slots",
						components : "",
						changes : "I can cast mage armor on myself at will without expending a spell slot or spell components"
					}
				}
			},
			"mystical athlete" : {
				name : "Mystical Athlete (prereq: quickstep or springheel)",
				source : ["VSoS", 163],
				description : desc([
					"When I cast quickstep, my speed inccreases by 20 feet instead of 10. When I cast springheel, my jumping distance increases by 20 feet instead of 10. If I know both of these cantrips, I can cast both of them as part of the same bonus action."
				]),
				spellChanges : {
					"quickstep" : {
						description : "My walking speed increases by 20 ft until the start of my next turn",
						descriptionFull : "You call upon your inner reserves to give you a brief flash of speed. When you cast this spell, your walking speed increases by 20 feet until the start of your next turn.",
						changes : "When I cast this cantrip, my speed increases by 20 ft instead of 10. If I also know springheel, I can cast both using the same bonus action"
					},
					"springheel" : {
						description : "Jump speed increases by 20 ft., and can running high or long jump w/o running start",
						descriptionFull : "You flood magic into your legs, allowing you to bound high into the air from a standstill. When you cast this spell, your jump distance increases 20 feet until the start of your next turn, and you can make a running high jump or a running long jump without a running start.",
						changes : "When I cast this cantrip, my jump increases by 20 ft instead of 10. If I also know quickstep, I can cast both using the same bonus action"
					}
				}
			},
			"mystical weapon master" : {
				name : "Mystical Weapon Master (prereq: force weapon or magic daggers)",
				source : ["VSoS", 163],
				description : desc([
					"Once on each of my turns when I roll a 1 on the attack roll, I can reroll the and must use the new roll."
				]),
				prereqeval : function(v) { return isSpellUsed('force weapon') || isSpellUsed('magic daggers'); },
			},
			"mystical vision" : {
				name : "Mystical Vision",
				source : ["VSoS", 163],
				description : desc([
					"I can cast the detect magical spell at will without expending a spell slot."
				]),
				spellcastingBonus : {
					name : "Mystical Vision",
					spells : ["detect magic"],
					selection : ["detect magic"],
					firstCol : "atwill"
				}
			},
			"phantom hookshot" : {
				name : "Phantom Hookshot (prereq: phantom grapnel)",
				source : ["VSoS", 163],
				description : desc([
					"I can cast phantom grapnel as a bonus action. If I do, the range is reduced to 15 feet. Additionally, creatures pulled by phantom grapnel are pulled an additional 10 feet."
				]),
				spellChanges : {
					"phantom grapnel" : {
						description : "Move to Huge or larger crea or empty space, or pull Large or smaller crea 20 ft. to me on failed save",
						descriptionFull : "You conjure a chain and hook made of magical force, which you propel at a creature or unoccupied space you can see within range. When you target a space or a creature of Huge size or larger, your grapnel pulls you to that target in a straight line. You provoke opportunity attacks for this movement as normal. When you target a creature of Large size or smaller, you pull the target up to 20 feet towards you. A creature can make a Strength saving throw to resist this movement.",
					}
				}
			},
			"rapid fortification" : {
				name : "Rapid Fortification (prereq: mending)",
				source : ["VSoS", 163],
				description : desc([ 		
					"I can cast mending as a bonus action, or I can choose one of the following effects:",
					"Restore a single nonmagical object, such as a door, cart, or window, to pristine condition if at least half of its parts are present. This object can be no larger than 10 cubic feet, or 1 cubic foot if it exceptionally complex (such as a clock).",
					"Create simple fortifications, such as sealing a door shut, adding wooden planks to a window, or building a short stone wall (no larger than 10 cubic feet). You must have the materials present to use this ability."
				]),
				spellChanges : {
					"mending" : {
						description : "I can cast mending as a bonus action, or choose to restore/create",
						descriptionFull : "I can cast mending as a bonus action, or I can choose one of the following. *Restore a single nonmagical object, such as a door, cart, or window, to pristine condition if at least half of its parts are present. This object can be no larger than 10 cubic feet, or 1 cubic foot if it exceptionally complex (such as a clock). *Create simple fortifications, such as sealing a door shut, adding wooden planks to a window, or building a short stone wall (no larger than 10 cubic feet). You must have the materials present to use this ability."
					}
				}
			},
			"snake eyes" : {
				name : "Snake Eyes (prereq: level 10, house of dice)",
				source : ["VSoS", 164],
				description : desc([
					"If I roll a 1 or 2 on a Die of Fate, I keep the die instead of giving it to the GM"
				])
			},
			"severe cantrip" : {
				name : "Severe Cantrip",
				source : ["VSoS", 164],
				description : desc([
					"When a creature rolls a 1 on a saving throw against one of my warmage cantrips, it automatically fails the save and takes twice the number of damage dice dealt by the spell, as if I scored a critical hit. The additional damage only applies to the creature that rolls a 1."
				])
			},
			"signature focus" : {
				name : "Signature Focus (prereq: level 5)", //This will be easier to add manually similar to how pact of the blade works
				source : ["VSoS", 164],
				description : desc([
					"When I finish a long rest, I can place a unique sigil on a simple weapon, which becomes my signature focus until I use this trick again. The weapon becomes magical, and can be used as a spell casting focus for my warmage spells. It is bonded to me and gains the following abilities: ",
					"\u2022 As a bonus action, I can call my signature focus to my hand, as long as its on the same plane of existence.",
					"\u2022 I use my Intelligence modifier instead of Strength or Dexterirty to attack rolls.",
					"\u2022 It gains a number of charges equal to my Intelligence modifier (minimum of 1). When I damage a creature or a cantrip is casted through it, I can expend 1 charge to deal an extra 1d8 of force damage. I regain these charges after a long rest."
				]),
				action : ["bonus action", "Recall Signature Focus"],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							//not a spell; can include signature, focus, or sigil to help sheet automate, must be a simple weapon, changes dex/str to int if applicable.
							if (!v.isSpell && ((/signature|focus|sigil/i).test(v.WeaponTextName) && (/simple/i).test(v.theWea.type)) && (fields.Mod === 1 || fields.Mod === 2) && Number(What("Int")) > Number(What(fields.Mod === 1 ? "Str" : "Dex"))) {
								fields.Mod = 4;
							}
						},
						//signature, focus, and sigil aren't part of the normal features traits. This is added to help the sheet determine what is considered a "signature focus"
						"I can include 'signature', 'focus', or 'sigil' as part of the name for a simple weapon to act as my Signature Focus. I can use my Intelligence Modifier instead of Strength or Dexterity for the attack and damage rolls for this weapon."
					]
				}
			},
			"silent cantrip (prereq: level 5)" : {
				name : "Silent Cantrip",
				source : [["VSoS", 164]],
				description : desc([
					"Once on each of my turns when I deal thunder damage to a hostile creature with a warmage cantrip, I can create a 15 ft diameter sphere of magical silence (as per the silence spell), centered on myself or the creature (my choice), which lasts until the start of my next turn."
				]),
				usages : 1,
				recovery : "Turn"
			},
			"split fire" : {
				name : "Split Fire",
				source : [["VSoS", 164]],
				prereqeval : function (v) {return classes.known.warmage.level >= 5;},
				description : desc([
					"When I cast a warmage cantrip that requires a single spell attack roll, I can select multiple creatures and make a spell attack roll against each. I can target a number of creatures equal to the number of damage dice the cantrip deals, and split the damage dice up amongst the targets, to a minimum of 1 die of damage per target. Each attack must target a different creature.", 
					"For example, fire bolt deals 3d10 damage. I can choose to target 3 creatures and deal 1d10 to each creature, or I can target two creatures dealing 1d10 damage to one and 2d10 to the other, or I can target one creature for 3d10 damage."
				])
			},
			"static cantrip" : {
				name : "Static Cantrip",
				source : [["VSoS", 164]],
				description : desc([
					"Whenever I deal lightning damage to a hostile creature with a warmage cantrip, I can sap part of the energy into a charge, which clings to my body until the start of my next turn. While charged, I can use my reaction when I take damage from a creature I can see within 5 ft to deal lightning damage equal to half my warmage level to the creature."
				])
			},
			"unerring strike (prereq: level 10, true strike)" : {
				name : "Unerring Strike",
				source : [["VSoS", 164]],
				prereqeval : function (v) {return classes.known.warmage.level >= 10 && isSpellUsed('true strike', true);},
				description : desc([
					"When I cast the true strike cantrip, I can concerntrate on it for a number of rounds equal to my Intelligence modifer. I gain advantage on the first attack roll I make against the target on each of my turns while maintaining concentration."
				])
			}
		},
		"arcane surge" : {
			name : "Arcane Surge",
			source : ["VSoS", 160],
			minlevel : 5,
			description : desc([
				"Starting at 5th level when I deal damage with a warmage cantrip on my turn, I can deal twice the number of damage dice dealt by the spell. I can't use this feature if the spell was a critical hit. Once I use this feature, I can't use it again until I finish a short or long rest.",
			]),
			usages : levels.map(function(v) {return v < 11 ? 1 : 2;}),
			recovery : "short rest"
		},
		"tactical insight" : {
			name : "Tactical Insight",
			source : ["VSoS", 160],
			minlevel : 6,
			description : desc([
				"At 6th level, I can add my Intelligence modifier to saving throws against spells and other magical effects that deal damage."
			])
		},
		"stategic deflection" : {
			name : "Strategic Deflection",
			source : ["VSoS", 160],
			minlevel : 14,
			description : desc([
				"When a creature casts a spell that targets or includes me in its area of effect and the spell forces me to make a saving throw to avoid damage, I can use my reaction to attempt to redirect some of the spell's effects to a new target.",
				"If I succeed on my saving throw against the spell, I can choose another creature within the spell's range or within 30 ft of me, whichever is closer, to make a saving throw against my spell save DC. The chosen creature can be the original caster. On a failed save, the creature suffers the effects of the spell as if you had cast spell and they had been the original target or been within the area of the spell. Once I use this feature, I can't use it again until I finish a short or long rest."
			]),
			action : ["reaction",""],
			usages : 1,
			recovery : "short rest"
		},
		"master warmage" : {
			name : "Master Warmage",
			source : ["VSoS", 160],
			minlevel : 20,
			description : desc([
				"If I cast a cantrip that deals 4 dice of damage to a target, it instead deals 5 dice of damage (excluding my cantrip bonus dice). If you cast a cantrip that makes 4 attacks, it instead makes 5 attacks."
			])
		}
    }
};

//add subclasses
AddSubClass("warmage", "house of bishops", {
	regExpSearch : /^(?=.*house)(?=.*bishops).*$/i,
	subname : "House of Bishops",
	fullname : "House of Bishops",
	source : [["VSoS", 165]],
	spellcastingKnown : {
		cantrips : [0], //we dont have cantrips since we added them to spellcasting bonus
		spells : [0, 0, 2, 3, 3, 3, 4, 4, 4, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9]
	},
	spellcastingList : {
		class : ["wizard"],
		level : [1, 4],
		school : ["Conj", "Evoc"]
	},
	features : {
		"subclassfeature3" : {
			name : "Spellcasting",
			source : ["VSoS", 165],
			minlevel : 3,
			description : desc([
				"I can cast known wizard spells, using Intelligence as my spellcasting ability.",
				"Additionally, I can add damage to my warmage spells of 1st level or higher using my Warmage Edge feature, as if they were cantrips. I can't add Warmage Edge damage to the magic missile spell."
			]),
			// Unsure how to make the extra damage dice dynamic.
			additional : levels.map( function(n) { //user needs to pick their ability scores first or the Int Modifier damage wont show up.
				return (n < 3 ? "" : n < 4 ? 3 : n < 7 ? 4 : n < 8 ? 5 : n < 10 ? 6 : n < 11 ? 7 : n < 13 ? 8 : n < 14 ? 9 : n < 16 ? 10 : n < 19 ? 11 : n < 20 ? 12 : 13) + " spells known";
				// at level 4, no extra dice, + int mod to spell damage. Include spells known (4 spells known)
			}),
			calcChanges : {
				spellAdd : [
					function( spellKey, spellObj, spName ) {
						//we already added our Int Mod to cantrips
						//we just want spells in our current spells that are leveled wizard spells.
						if( !CurrentSpells[spName] || spName.indexOf("wizard") == -1 || !What("Int Mod") || Number(What("Int Mod")) || spellObj.level === 0 || spellObj.psionic) return;
						return genericSpellDmgEdit(spellKey, spellObj, "\\w+\\.?", "Int", false);
					}
				]
			},
			// eval: function() { //this works but is very messy. Sticking to what Joost was doing in the original script
			// 	// Keep track of added spells
			// 	var addedSpells = [];
				
			// 	var wizardSpells = CreateSpellList({"class" : "wizard", level : [1,4], school : ["Conj", "Evoc"]}, false, false, false);
			// 	var wizardNotSpells = CreateSpellList({"class" : "wizard", level : [1, 4], school : ["Abjur", "Div", "Ench", "Illus", "Necro", "Trans", "Avatar", "Awake", "Immor", "Nomad", "Wu Jen"]}, false, false, false);
			// 	var wizardCantrips = CreateSpellList({"class" : "wizard", level : [0,0]}, false, false, false);
			
			// 	// Add new spells to the warmage's spell list
			// 	ClassList.warmage.spellcastingExtra = wizardSpells;
			// 	addedSpells = addedSpells.concat(wizardSpells); // Track added spells
			// 	ClassList.warmage.spellcastingList.notspells = ClassList.warmage.spellcastingList.notspells.concat(wizardCantrips.concat(wizardNotSpells));
			// 	addedSpells = addedSpells.concat(wizardCantrips, wizardNotSpells); // Track added spells
			
			// 	// Update spells known with this array
			// 	ClassList.warmage.spellcastingKnown.spells = [0, 0, 2, 3, 3, 3, 4, 4, 4, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9];
			
			// 	// Change class and level to match what we now know
			// 	ClassList.warmage.spellcastingList.class = ["warmage", "wizard"];
			// 	ClassList.warmage.spellcastingList.level = [0, 4];
				
			// },
			// removeeval: function() {
				
			// 	// Remove only the spells that were previously added during eval
			// 	ClassList.warmage.spellcastingExtra = ClassList.warmage.spellcastingExtra.filter(function(spell) {
			// 		return !addedSpells.includes(spell);
			// 	});
			// 	ClassList.warmage.spellcastingList.notspells = ClassList.warmage.spellcastingList.notspells.filter(function(spell) {
			// 		return !addedSpells.includes(spell);
			// 	});
			// 	// Reset the addedSpells array 
			// 	addedSpells = [];
				
			// },
			spellcastingBonus : [{ // the spells gained at level 3, 8, 14, 20
				name : "From any school",
				"class" : "wizard",
				times : [0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4],
				level : [1, 4]
			}]
		},
		"subclassfeature3.1" : {
            name : "Arcane Study",
            source : ["VSoS", 166],
            minlevel : 3,
            description : desc([
                "I gain proficiency in two of the following skills of my choice: Arcana, History, Investigation, Medicine, or Religion."
            ]),
            skillstxt : "Choose two of the following skills: Arcana, History, Investigation, Medicine, or Religion.",
        },
        "subclassfeature7" : {
            name : "Mystical Companion",
            source : ["VSoS", 166],
            minlevel : 7,
			description : desc([
				"I learn find familiar and can cast it as a ritual. This doesn't count against the number of spells I know. When I cast this spell, I can choose it to be an Imp, Pseudodragon, Quasit, or Sprite."
			]),
            spellcastingBonus : [{
                name : "Mystical Companion",
                spells : ["find familiar"],
                selection : ["find familiar"],
                firstCol : "(R)"
            }]
        },
		"subclassfeature10" : {
			name : "Siege Casting",
			source : ["VSoS", 166],
			minlevel : 10,
			description : desc([
				"My warmage spells deal double damage to objects and structures. Additionally, when I cast a warmage spell that requires a spell attack roll, I can cast it at up to double its normal range. If the target is beyond the normal range, I have disadvantage on the attack roll."
			])
		},
		"subclassfeature15" : {
			name : "Spell Sculpting",
			source : ["VSoS", 166],
			minlevel : 15,
			description : desc([
				"When I cast a warmage spell that affects other creatures that I can see, I can choose a number of creatures up to my Intelligence modifier. The chosen creatures automatically succeed on their save, and they take no damage if they would normally take half damage on a successful save."
			]),
		},
		"subclassfeature18" : {
			name : "Arcane Dominance",
			source : ["VSoS", 166],
			minlevel : 18,
			description : desc([
				"As a bonus action, I can expend a number of spell slots with a combined level of 6 or more to regain an expended use of my Arcane Surge."
			]),
			action : ["bonus action", ""]
		}
	}
});

AddSubClass("warmage", "house of cards", {
	regExpSearch : /^(?=.*house)(?=.*cards).*$/i,
	subname : "House of Cards",
	fullname : "House of Cards",
	source : [["VSoS", 166]],
	features : {
		"subclassfeature3" : {
			name : "Bluff",
			source : [["VSoS", 166]],
			minlevel : 3,
			description : desc([
				"I gain proficiency in Deception and with playing cards, if I don't already have it. Additionally, I can use my Intelligence instead of Charisma for Deception checks I make."
			]),
			toolProfs : ["Deck of Cards"],
		},
		"subclassfeature3.1" : {
			name : "Deck of Fate",
			source : [["VSoS", 166]],
			minlevel : 3,
			description : desc([
				"I gain a deck of magical playing cards called the Deck of Fate, through which I can empower my cantrips. When I roll initiative, shuffle a standard 52-card deck and draw a hand of 5 cards.",
				"Whenever I target a hostile creature with a warmage spell that deals damage, I can use my bonus action to play one or more cards from my hand to enhance the spell. If the cards exactly match one of the results on the Hands table (see notes), the spell deals extra damage to one of the spell's targets of my choice or grants one additional effect, according to the result. If the cards don't exactly match, they have no effect. Aces count as one for results. Once I play a card, place it on the bottom of the deck and draw cards until I have five cards again." 
			]),
			action : ["bonus action","Play one or more cards"],
			toNotesPage : [{
				name : "Hands Table",
				page3notes : true,
				source : [["VSoS", 167]],
				note : desc([
					"\u2022 Straight: Any 5 sequential cards of any suit, I deal an extra 12 damage",
					"\u2022 Flush: Any 5 cards in the same suit in any order, I deal an extra 10 damage",
					"\u2022 Three of a Kind: Any 3 of the same number, I deal an extra 6 damage",
					"\u2022 Pair: Any 2 of the same number, I deal an extra 2 damage",
					"\u2022 Hearts: Any 2 hearts, I gain temporary HP equal to my Intelligence modifier",
					"\u2022 Spades: Any 2 spades, My speed increases by 10 ft until the start of my next turn",
					"\u2022 Diamonds: Any 2 diamonds, I gain a +1 to my AC until the start of my next turn",
					"\u2022 Clubs: Any 2 clubs, I gain a +1 to my saving throws until the start of my next turn"
				])
			}]
		},
		"subclassfeature7" : {
			name : "High Stakes",
			source : [["VSoS", 166]],
			minlevel : 7,
			description : desc([
				"On my turn, I can choose a number of cards from my hand and place them on the bottom of the deck (no action required). losing 2 hit points per card. I then draw cards until I have 5 in my hand again."
			])
		},
		"subclassfeature10" : {
			name : "Dealer's Choice",
			source : [["VSoS", 166]],
			minlevel : 10,
			description : desc([
				"I can use my bonus action to gain one of the following effects below, chosen by the GM. Once I use this feature, I can't do so again until I finish a short or long rest.",
				"\u2022 I gain resistance to all damage until the end of my next turn.",
				"\u2022 I teleport to an unoccupied space I can see within 60 ft of me.",
				"\u2022 I vanish into a safe, endless demiplane until the start of my next turn, at which time I return at the same location I vanished from."
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature15" : {
			name : "Card Reading",
			source : [["VSoS", 166]],
			minlevel : 15,
			description : desc([
				"Once on each of my turns when I draw a card from deck as part of my Deck of Fate feature, I can declare a suit and check the top card of my deck. If I guessed the suit correctly, I can take the Dash, Disengage, or Use an object action as part of the same bonus action used for the feature."
			]),
			action : ["bonus action", "With Deck of Fate feature"]
		},
		"subclassfeature18" : {
			name : "Ace in the Hole",
			source : [["VSoS", 167]],
			minlevel : 18,
			description : desc([
				"Whenever I draw one or more cards from my deck, I draw twice as many. Put half of the drawn cards on the bottom of the deck and the other cards in my hand."
			])
		}
	}
});
AddSubClass("warmage", "house of dice", {
	regExpSearch : /^(?=.*house)(?=.*dice).*$/i,
	subname : "House of Dice",
	fullname : "House of Dice",
	source : [["VSoS", 167]],
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiency",
			source : [["VSoS", 167]],
			minlevel :3,
			description : desc([
				"I gain proficiency in the Sleight of Hand skill and Dice Set, if I don't already have it"
			]),
			toolProfs : ["Dice Set"],
			skills : ["Sleight of Hand"],
			skillstxt : "I gain proficiency with the Sleight of Hand skill"
		},
		"subclassfeature3.1" : {
			name : "Dice of Fate",
			source : [["VSoS", 167]],
			minlevel : 3,
			description : desc([
				"At 3rd level, I gain 4 Dice of Fate, which are d6's. Whenever you make an ability check, attack roll, saving throw, or damage roll, you can expend one Die of Fate and add it to the roll. Once I expend a Die of Fate, it goes to the GM, who can use it to add it to a roll made by an NPC or monster. Once the GM has used a die, it passes back to me, and so on. When I finish a long rest, I regain all expended Dice of Fate, whether or not the GM has used them.",
				"I gain additional 2 additional Dice of Fate and I can add two Dice of Fate to damage rolls with warmage spells."
			]),
			extraLimitedFeatures : [{
				name : "Dice of Fate",
				usages : "4 at level 3, +2 at level 7",
				usagescalc : "event.value = classes.known.warmage.level < 7 ? 4 : 6;",
				additional : 'd6',
				recovery : "long rest",
			}]
		},
		"subclassfeature3.2" : {
			name : "Chaos Roll",
			source : [["VSoS", 167]],
			minlevel : 3,
			description : desc([
				"I can expend 2 Dice of Fate as an action to create a chaotic surge of energy (see notes)."
			]),
			toNotesPage : [{
				name : "Chaos Rolls Table",
				page3notes : true,
				source : [["VSoS", 167]],
				note : desc([
					"\u2022 2: You cast fireball, at 3rd level, centered on yourself.",
					"\u2022 3: Your AC is reduced by 2 until the start of my next turn.",
					"\u2022 4: You fall prone.",
					"\u2022 5: Each creature other than yourself within 60 ft of you can only speak in a babbling nonsense language for the next minute, and can't perform the verbal components of spells.",
					"\u2022 6: A 5 ft radius sphere of butterflies, insects, or doves fills a location within 60 ft of you causing the area to be heavily obscured until the start of your next turn.",
					"\u2022 7: You gain 7 temp HP and keep the Dice of Fate instead of giving them to your GM.",
					"\u2022 8: You become invisible until the end of your next turn, as per the invisibility spell.",
					"\u2022 9: A random object within 60 ft of you explodes, dealing no damage to you or your allies, and dealing 3d6 fire damage to one creature caught by the blast chosen by the GM.",
					"\u2022 10: You teleport up to 60 ft to an unoccupied space you can see. Each creature within 5 ft of the destination must succeed on a Dexterity saving throw against your spell save DC or take 2d6 force damage.",
					"\u2022 11: Choose a creature you can see within 60 ft of you. That creature takes 4d6 necrotic damage, and you regain hit points equal to the necrotic damage dealt.",
					"\u2022 12: You cast lightning bolt and can add the Dice of Fate to the damage roll.",
				])
			}],
			action : ["action",""]
		},
		"subclassfeature7" : {
			name : "Loaded Dice",
			source : [["VSoS", 168]],
			minlevel : 7,
			description : desc([
				"I can subtly cheat on my dice. Once on each of my turns when I roll a d6, I can flip the die upside down. Note that on a balanced d6, the top and bottom numbers add up to 7, so you can determine the bottom number by subtracting the top number from 7."
			]),
			usages : 1,
			recovery : "Turn",
		},
		"subclassfeature10" : {
			name : "Twisted Fate",
			source : [["VSoS", 168]],
			minlevel : 10,
			description : desc([
				"When I make an attack roll or ability check with disadvantage on my turn, I can attempt to invert fate as a bonus action. I can expend a Die of Fate and roll it; on a 5, I ignore disadvantage, on a 6, I instead have advantage on the roll."
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature15" : {
			name : "Roll the Bones",
			source : [["VSoS", 168]],
			minlevel : 15,
			description : desc([
				"As a reaction when I take damage from a creature I can see, I can expend two Die of Fate to make a Chaos Roll."
			]),
			action : ["reaction", ""]
		},
		"subclassfeature18" : {
			name : "Steal Luck",
			source : [["VSoS", 168]],
			minlevel : 18,
			description : desc([
				"When I roll initiative, roll a d6. I steal that many Dice of Fate back from the GM."
			])
		}
	}
});

AddSubClass("warmage", "house of kings", {
	regExpSearch : /^(?=.*house)(?=.*kings).*$/i,
	subname : "House of Dice",
	fullname : "House of Dice",
	source : [["VSoS", 168]],
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiency",
			source : [["VSoS", 168]],
			minlevel : 3,
			description : desc([
				"I gain proficiency with medium armor as well as battleaxes, lances, longswords, tridents, and warhammers."
			]),
			armorProfs :[true, true, false, false],
			weaponProfs : [true, false, ["battleaxes", "lances", "longswords", "tridents", "warhammers"]]
		},
		"subclassfeature3.1" : {
			name : "Battle Tactics",
			source : [["VSoS", 168]],
			minlevel : 3,
			description : desc([
				"At 3rd level, I gain two battle dice, which are d8's. A battle die is expended when I use it. I regain all expended battle dice when I visih a short or long rest, or when I roll initiative.",
				"My battle dice changes and more battle dice become available at 7th (3d8), 13th (3d10), and 19th (4d10) level. Once per turn, I can expend a battle die to perform a stategem of my choice (see noes page). The saving throw for your stratagem is equal to your spellsave DC."
			]),
			extraLimitedFeatures : {
				name : "Battle Die",
				usages : levels.map( function(n) {
					return n < 7 ? 2 : n < 19 ? 3 : 4;
				}),
				additional : levels.map( function(n) {
					return n < 13 ? "d8" : "d10";
				}),
				recovery : "short rest"
			},
			toNotesPage : [{
				name : "Stratagem",
				source : [["VSoS", 169]],
				page3notes : true,
				note : desc([
					"\u2022 Blitz: As a bonus action, when you hit a creature with an attack, you can expend one battle die to maneuver one of your comrades intoa  more advantageous position. Choose a friendly creature that can see or hear you. That creature can use its reaction to move up to half its speed without provoking opporunity attacks from the target of your attack.",
					"\u2022 Check: As a bonus action, when you hit a creature with an attack, you can expend one battle die to force that creature to flee. The target must make a Charisma saving throw, unless the target is immune to being charmed, or it must immediately use its reaction, if available, to move up to half its speed directly away from you.",
					"\u2022 Flash of Brilliance: When you make an Intelligence or Wisdom check, you can expend one battle die to add it to the check. You can choose to use this stratagem after the ability check is rolled but before the GM says the result was a success or failure.",
					"\u2022 Gambit: When you hit a creature with an attack, you can expend one battle die to give your allies an opening. The next creature other than you to make an attack against the target adds the battle die to their attack roll.",
					"\u2022 Mystic Counsel: You can use a bonus action and expend one battle die to give counsel to a creature that can hear you within 30 ft. Once in the next minute when the creature makes a saving throw against a spell it can choose to roll the battle die and add the result to the saving throw.",
					"\u2022 Stalemate: When you hit a creature with an attack, you can expend one battle die as a bonus action to hold that creature in place. Until the end of its next turn, the target can’t willingly move unless it first takes the Disengage action."
				])
			}]
		},
		"subclassfeature7" : {
			name : "Leading from the Front",
			source : [["VSoS", 168]],
			minlevel : 7,
			description : desc([
				"Each friendly creature within 120 of me, includes myself, ignores nonmagical difficult terrain."
			])
		},
		"subclassfeature10" : {
			name : "Tactical Master",
			source : [["VSoS", 168]],
			minlevel : 10,
			description : desc([
				"Friendly creatures within 10 ft of me add my Intelligence modifier to their saving throws against spells and magical effects that deal damage."
			]),
			savetxt : { text : ["Add Int mod to damaging spells and magical effects"] },
			additional : levels.map( function(n) {
				return n < 10 ? "" : "10-ft radius"
			})
		},
		"subclassfeature15" : {
			name : "Stratagem",
			source : [["VSoS", 168]],
			minlevel : 15,
			description : desc([
				"I learn the Checkmate stratagem."
			]),
			toNotesPage : [{
				name : "Stratagem: Checkmate",
				source : [["VSoS", 169]],
				page3notes : true,
				amendTo : "Stratagem",
				note : desc([
					"\u2022 Checkmate: When I hit a creature with a weapon or spell attack, I can use my bonus action and expend a battle die to direct one of my companions to strike. When I do so, choose a friendly creature who can see or hear me that is within reach of the creature you hit. That creature can immediately use its reaction to make one weapon attack or cast a cantrip that requires an attack roll, adding the battle die to the attack's damage."
				])
			}],
			action : ["bonus action", "Checkmate, 1 Battle Die"],
		},
		"subclassfeature18" : {
			name : "Grandmaster", 
			source : [["VSoS", 169]],
			minlevel : 18,
			description : desc([
				"When I roll initiative, choose a number of friendly creatures up to my Intelligence modifier that can see or hear me. Each of the chosen creatures gain a battle die, without you having to expend any battle dice.",
				"Once within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, damage roll, or saving throw it makes. The creature can wait until after it makes the roll before deciding to add the battle die, but must decide before the GM determines the roll's outcome. Once the die is rolled, it is lost. A creature can only have one battle die from this feature at a time."
			])
		}
	}
});
AddSubClass("warmage", "house of knights", {
	regExpSearch : /^(?=.*house)(?=.*knights).*$/i,
	fullname : "House of Knights",
	subname : "House of Knights",
	source : [["VSoS", 169]],
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiency",
			source : [["VSoS", 169]],
			minlevel : 3,
			description : desc([
				"I gain proficiency with medium armor and martial weapons."
			]),
			armorProfs : [true, true, false, false],
			weaponProfs : [true, true]
		},
		"subclassfeature3.1" : {
			name : "Force Breastplate",
			source : [["VSoS", 169]],
			minlevel : 3,
			description : desc([
				"While I'm wearing light or medium armor or under the effects of the mage armor spell, I can add my Intelligence modifier, instead of Dexterity, for my AC."
			]),
			//from Joost
			extraAC : [{ 
				mod : "Int-Dex",
				text : "I add my Intelligence modifier to AC instead of my Dexterity.",
				stopeval : function (v) { return v.mediumArmor || v.heavyArmor; } // for everything but medium and heavy armor
			}, {
				mod : "min(2|Int)-min(2|Dex)",
				text : "I add my Intelligence modifier (max 2) to AC instead of my Dexterity (max 2) when wearing medium armor.",
				stopeval : function (v) { return !v.mediumArmor; } // only for medium armor
			}]
		},
		"subclassfeature3.2" : {
			name : "Mystical Weapon",
			source : [["VSoS", 169]],
			minlevel : 3,
			description : desc([
				"I learn the force weapon cantrip, which doesn't count against my number of cantrips known. Additionally, on my turn when I would draw a weapon, I can summon a simple or martial weapon of my choice, made entirely of magical force, to my empty hand. This weapon counts as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage. This weapon vanishes when it leaves my hand."
			]),
			spellcastingBonus : [{
				name : "Mystical Weapon",
				spells : ["force weapon"],
				selection : ["force weapon"],
				firstCol : "atwill"
			}]
		},
		"subclassfeature7" : {
			name : "Flurry of Blades",
			source : [["VSoS", 169]],
			minlevel : 7,
			description : desc([
				"When I cast a cantrip that allows me to make multiple attack spells, such as force weapon ot magic daggers, I can use my bonus action to make one additional spell attack with that cantrip."
			]),
			action : ["bonus action", "Flurry of Blades (w/2+ att. roll cantrip)"]
		},
		"subclassfeature10" : {
			name : "Knight's Ward",
			source : [["VSoS", 170]],
			minlevel : 10,
			description : desc([
				"I learn to forge a hardened magical barrier between me and my foes. As a bonus action on my turn, I can gain a number of temporary hit points equal to twice my warmage level, which last for 1 minute.",
				"Once I use this feature, I can't use it again until I finished a short or long rest."
			]),
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"subclassfeature15" : {
			name : "Tactical Maneuver",
			source : [["VSoS", 170]],
			minlevel : 15,
			description : desc([
				"I can spend my entire movement to teleport up to half my speed to an unoccupied space I can see."
			])
		},
		"subclassfeature18" : {
			name : "Field of Blades",
			source : [["VSoS", 170]],
			minlevel : 18,
			description : desc([
				"I learn to summon a whirlwind of mystical weapons, striking at a legion of foes in a single swipe. As an action on my turn, I can make a melee spell attack against up to five creatures I can see within 30 ft of me, making a separate attack roll for each. On a hit, a target takes 2d10 + my Intelligence modifier."
			]),
			action : ["action", ""]
		}
	}
});

AddSubClass("warmage", "house of lancers", {
	regExpSearch : /^(?=.*house)(?=.*lancers).*$/i,
	fullname : "House of Lancers",
	subname : "House of Lancers",
	source : [["VSoS", 170]],
	features : {
		"subclassfeature3" : {
			name : "Intercept Technique",
			source : [["VSoS", 170]],
			minlevel : 3,
			description : desc([
				"While I am wearing no armor and not wielding a shield, or under the effects of the mage armor spell, I can add my Intelligence modifier to my AC instead of Dexterity."
			]),
			extraAC : [{ 
				mod : "Int-Dex",
				text : "I add my Intelligence modifier to AC instead of my Dexterity.",
				stopeval : function (v) { return v.wearingArmor || v.usingShield; }
			}]
		},
		"subclassfeature3.1" : { 
			name : "Hand-to-Hand Arcana",
			source : [["VSoS", 170]],
			minlevel : 3,
			description : desc([
				"At 3rd level, I learn the secrets to unarmed combat and gain the following:",
				"My unarmed strikes use Intelligence instead of Stength for the attack and damage rolls for unarmed strikes.",
				"The damage instead becomes a d6.",
				"My unarmed strikes count as melee weapons for the purposes of warmage spells."
			]),
			calcChanges : {
				atkAdd : [
					function( fields, v ) { //checks if either the damage is 1 and/or ability is Str
						if (v.baseWeaponName == "unarmed strike" && fields.mod == 1) {
							fields.mod = 4;
						};
						if (v.baseWeaponName == "unarmed strike" && fields.Damage_Die == 1) {
							fields.Damage_Die = '1d6';
						};
					}
				],
				atkCalc : [
					function( fields, v, output ) {
						if( v.baseWeaponName == "unarmed strike" && fields.mod == 1) {
							fields.mod = 4;
						};
						if( v.baseWeaponName == "unarmed strike" && fields.Damage_Die == 1 ) {
							fields.die = '1d6';
						}
					}
				]
			}
		},
		"subclassfeature3.2" : {
			name : "Shock Trooper",
			source : [["VSoS", 170]],
			minlevel : 3,
			description : desc([
				"Whenever I make a melee attack on my turn against a creature that I can see, I can lunge up to 15 ft toward the target before making the attack. This movement doesn't provoke opportunity attacks. I can perform this movement even if it causes me to travel through the air, though I fall after making the attack if I don't land on solid ground."
			])
		},
		"subclassfeature7" : {
			name : "Mystical Physicality",
			source : [["VSoS", 170]],
			minlevel : 7,
			description : desc([
				"Starting at 7th level, whenever I make Strength, Dexterity, or Constitution check, I can use my Intelligence modifier instead of the normal modifier.",
				"In addition, moving through difficult terrain no longer costs me additional movement."
			])
		},
		"subclassfeature10" : {
			name : "Deflect Energy",
			source : [["VSoS", 170]],
			minlevel : 10,
			description : desc([
				"By 10th level, I can deflect bolts of energy with my bare hands. As a reaction when I am hit by a ranged spell or weapon attack that deals cold, fire, force, lightning, necrotic, or radiant, I can use my reaction to deflect the bolt. The damage I take from the attack is reduced by 1d10 + my Intelligence modifier + half my warmage level (rounded down)."
			]),
			additional : levels.map( function(n) {
				return n < 10 ? "" : "1d10+Int mod.+" + Math.floor(n/2);
			})
		},
		"subclassfeature15" : {
			name : "Improved Shock Trooper",
			source : [["VSoS", 170]],
			minlevel : 15,
			description : desc([
				"I can now lunge up to 30 ft using my shock trooper feature. This movement now causes me to teleport through creatures and objects, blinking to the target in an instant. I can't end my movement in an occupied space."
			])
		},
		"subclassfeature18" : {
			name : "Flurry of Spells",
			source : [["VSoS", 170]],
			minlevel : 18,
			description : desc([
				"Starting at 18th level, I can now cast spells with superhuman speed. As an action, I can expend a use of my Arcane Surge feature to case three different cantrips that have a casting time of 1 action or 1 bonus action. I can't use my Arcane Surge feature on any of these cantrips.",
				"Once I use this feature, I can't use it again until I finished a long rest."
			]),
			action : ["action" ,"Flurry of Spells (Arcane Surge)"],
			usages : 1,
			recovery : "long rest"
		}
	}
});

AddSubClass("warmage", "house of pawns", {
	regExpSearch : /^(?=.*house)(?=.*pawns).*$/i,
	fullname : "House of Pawns",
	subname : "House of Pawns",
	source : [["VSoS", 171]],
	features : {
		"subclassfeature3" : {
			name : "Promotion",
			source : [["VSoS", 171]],
			minlevel : 3,
			description : desc([
				"When I choose this house at 3rd level, I learn an additional warmage trick which doesn't count against me. Additionally, whenever I learn a warmage trick, it can be from another house, as long as I meet the rest of the requirements."
			]),
			bonusClassExtrachoices : [{
				"class" : "warmage",
				subclass : "house of pawns",
				feature : "warmage tricks",
				bonus : 1
			}]
			//implement checks later
		},
		"subclassfeature3.1" : {
			name : "Adaptive Arcanist",
			source : [["VSoS", 171]],
			minlevel : 3,
			description : desc([
				"When I finish a short or long rest, I can choose any warmage cantrip, which doesn't count against the number of cantrips I know, until I choose a different one using this feature."
			]),
			eval : function() {
				CurrentSpells["warmage-adaptive arcanist"] = {
					name : "Adaptive Arcanist",
					ability : 4,
					list : {"class" : "warmage"},
					known : {cantrips : 0, spells : 'list'},
					bonus : {
                        bon1 : {
                            name : 'Just select "Full List"',
                            spells : []
                        },
                        bon2 : {
                            name : 'on the bottom left',
                            spells : []
                        }
                    },
                    typeList : 4,
                    refType : "class",
                    allowUpCasting : true,
                    firstCol : ""
				}
				SetStringifieds('spells'); CurrentUpdates.types.push('spells');
			},
			removeeval : function () {
                delete CurrentSpells["warmage-adaptive arcanist"];
                SetStringifieds('spells'); CurrentUpdates.types.push('spells');
            }
		},
		"subclassfeature7" : {
			name : "Pawn Storm",
			source : [["VSoS", 171]],
			minlevel : 7,
			description : desc([
				"At 7th level, if I target a creature with a cantrip, that creature can't make opportunity attacks against me for the rest of my turn, whether I deal damage with the cantrip or not."
			])
		},
		"subclassfeature10" : {
			name : "Additional Arcane Fighting Style",
			source : [["VSoS", 171]],
			minlevel : 10,
			description : desc([
				"I can choose an additional fighting style from the Arcane Fighting Style class feature."
			]),
			bonusClassExtrachoices : [{
				"class" : "warmage",
				feature : "arcane fighting style",
				bonus : 1
			}]
		},
		"subclassfeature15" : {
			name : "Opening Move",
			source : [["VSoS", 171]],
			minlevel : 15,
			description : desc([
				"Starting at 15th level, I can add my Intelligence modifier to initiative rolls. Additionally, when I roll initiative and not surprised, I can move up to my speed."
			]),
			addmod : [{ type : "skill", field : "Init", mod : "Int", text : "I can add my Intelligence modifier to initiative rolls."}]
		},
		"subclassfeature18" : {
			name : "Fundamental Mastery",
			source : [["VSoS", 171]],
			minlevel : 18,
			description : desc([
				"At 18th level, once per turn when I roll damage for a warmage cantrip, I can choose one damage die and treat it as having rolled its maximum value."
			]),
			usages : 1,
			recovery : "Turn"
		}
	}
});

AddSubClass("warmage", "house of rooks", {
	regExpSearch : /^(?=.*house)(?=.*rooks).*$/i,
	fullname : "House of Rooks",
	subname : "House of Rooks",
	source : [["VSoS", 171]],
	features : {
		"subclassfeature3" : {
			name : "Rook Strike",
			source : [["VSoS", 171]],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can gain advantage on the next spel attack roll I make on my turn. Alternatively, I can impose disadvantage on a saving throw a creature makes against a warmage spell I cast before the end of my turn.",
				"Once I use this feature, I can't use it again until I finish a short or long rest, or until I reduce a creature to 0 hit points with a cantrip."
			]),
			action : ["bonus action", ""],
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature3.1" : {
			name : "Rasp",
			source : [["VSoS", 171]],
			minlevel : 3,
			description : desc([
				"I can cast the knock spell at will without expending a spell slot. When I cast it this way, it has a casting time of 1 minute and the spell's casting is completely silent."
			]),
			spellcastingBonus : [{
				name : "Rasp",
				spells : ["knock"],
				selection : ["knock"],
				firstCol : "atwill"
			}]
		},
		"subclassfeature7" : {
			name : "Arcane Acrobat",
			source : [["VSoS", 171]],
			minlevel : 7,
			description : desc([
				"At 7th level, I can add my Intelligence modifier to all Dexterity checks I make. Additionally, when I fall and aren't incapacitated, I can subtract up to 60 ft from the fall when calculating fall damage."
			])
		},
		"subclassfeature10" : {
			name : "Fleeting Decoy",
			source : [["VSoS", 171]],
			minlevel : 10,
			description : desc([
				"As a reaction when I take damage from a creature that I can see, I can raise a defensive illusion to protect me from further harm. Attacks made against you have disadvantage until the start of my next turn."
			]),
			action : ["reaction", ""]
		},
		"subclassfeature15" : {
			name : "Elusive Step",
			source : [["VSoS", 171]],
			minlevel : 15,
			description : desc([
				"By 15th level, I'm extremely difficult to pin down. If I move more that 15 ft on my turn, any additional movement I make doesn't provoke opportunity attacks."
			])
		},
		"subclassfeature18" : {
			name : "Flash of Feathers",
			source : [["VSoS", 171]],
			minlevel : 18,
			description : desc([
				"At 18th level, I can cast the invisibility spell once, targeting only myself, without using a spell slot or spell components. While I'm invisible, my speed is doubled, and I can make one weapon attack or cast one warmage cantrip without ending the spell.",
				"Once I use this feature, I can't use it again until I finish a short or long rest."
			]),
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : [{
				name : "Flash of Feathers",
				spells : ["invisibility"],
				selection : ["invisibility"],
				firstCol : "oncelr"
			}]
		}
	}
});

//Companion list for House of Bishops feature.
CompanionList["mystical companion"] = {
	name : "Mystical Companion",
	nameMenu : "Familiar (Warmage House of Bishops)",
	source : ["VSoS", 166],
	includeCheck : function(sCrea, objCrea, iCreaCR) { //only imp, pseudodragon, quasit, or sprite
		return /^(imp|pseudodragon|quasit|sprite)$/i.test(sCrea);
	}
};

//Added these cantrips from https://pastebin.com/0CdaqJs5 by u/AnasurimborInrilatas
//I did not write anything below. 
//I changed the springheel spell's class since it was it set to 'springheel' instead of 'warmage'
SpellsList["arc blade"] = {
	name : "Arc Blade",
	classes : ["warmage"],
	source : ["VSoS", 330],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "S:5-ft rad",
	components : "V,M",
	compMaterial : "A melee weapon",
	duration : "Instantaneous",
	ritual: false,
	description : "Melee wea atk w/cast; hit: +0d8 Ltng. dmg, 1 crea in 5 ft 1d6 Ltng dmg; +1 die ea CL5/11/17",
	descriptionCantripDie : "Melee wea atk with cast; hit: +`CD-1`d8 Ltng. dmg, 1 crea in 5 ft `CD`d6 Fire dmg",
	descriptionFull : "As part of the action used to cast this spell, you must make a melee attack with a weapon against one creature within the spell’s range, otherwise the spell fails. On a hit, the target suffers the weapon attack’s normal effects, except that any damage dealt by the attack is lightning damage instead of its normal type. Additionally, an arc of lightning jumps to a creature you choose within 5 feet of the target, dealing 1d6 lightning damage." + "\n   " + "This spell’s damage increases when you reach certain levels. At 5th level, the melee attack deals an additional 1d8 lightning damage, and the secondary damage deals an additional 1d6 lightning damage to their targets. Both damage rolls increase by one die at 11th level (2d8 and 3d6) and 17th level (3d8 and 4d6)."
};
SpellsList["burning blade"] = {
	name : "Burning Blade",
	classes : ["warmage"],
	source : ["VSoS", 331],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "S:5-ft rad",
	components : "V,M",
	compMaterial : "A melee weapon",
	duration : "Instantaneous",
	ritual: false,
	description : "Melee wea atk w/cast; hit: wea dmg is Fire +0d6 Fire dmg, fire stays in tgt space; +1d6 CL5/11/17, B",
	descriptionCantripDie : "Melee wea atk with cast; hit: +`CD-1`d6 Fire dmg, fire stays in tgt space;",
	descriptionFull : "As part of the action used to cast this spell, you must make a melee attack with a weapon against one creature within the spell’s range, otherwise the spell fails. On a hit, the target suffers the weapon attack’s normal effects, except that any damage dealt by the attack is fire damage instead of its normal type. Additionally, embers whirl in the target’s space. Until the start of your next turn, when a creature enters the space for the first time or ends its turn there, you can use your reaction to deal 1d6 fire damage to the creature, ending the spell." + "\n   " + "This spell’s damage increases when you reach certain levels. At 5th level, the melee attack deals an additional 1d6 fire damage to the target on a hit, and the secondary damage deals an additional 1d6 fire damage to its target. Both damage rolls increase by one die at 11th level (2d6 and 3d6) and 17th level (3d6 and 4d6)."
};
SpellsList["card trick"] = {
	name : "Card Trick",
	classes : ["warmage", "witch", "bard", "sorcerer", "wizard"],
	source : ["VSoS", 332],
	level : 0,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A deck of playing cards",
	duration : "Instantaneous",
	save : "Dex",
	ritual: false,
	description : "Choose ranged spell attack or 1 crea Dex save, hit/fail: 1d6 Force dmg; +1d6 CL5/11/17",
	descriptionFull : "With a flash of your hands, you fling a playing or tarot card charged with energy at your opponents. Choose whether you make a ranged spell attack roll or for the target to make a Dexterity saving throw. On a hit or a failed saving throw, the target takes 1d6 force damage." + "\n   " + "This spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
};
SpellsList["caustic blade"] = {
	name : "Caustic Blade",
	classes : ["necromancer", "warmage"],
	source : ["VSoS", 332],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "S:5-ft rad",
	components : "V,M",
	compMaterial : "A melee weapon",
	duration : "Instantaneous",
	ritual: false,
	description : "Melee wea atk w/cast; hit: wea dmg is Acid +0d8 Acid dmg, miss: 1d8 Acid dmg; +1d8 CL5/11/17",
	descriptionCantripDie : "Melee wea atk with cast; hit: +`CD-1`d8 Acid dmg, miss: `CD`d8 Acid dmg",
	descriptionFull : "As part of the action used to cast this spell, you must make a melee attack with a weapon against one creature within the spell’s range, otherwise the spell fails. On a hit, the target suffers the weapon attack’s normal effects, except that any damage dealt by the attack is acid damage instead of its normal type. If you miss by 3 or less, acid splashes on the target, and you instead deal 1d8 acid damage." + "\n   " + "This spell’s damage increases when you reach certain levels. At 5th level, the melee attack deals an additional 1d8 acid damage to the target on a hit, and the acid damage dealt on a miss increases to 2d8. Both damage rolls increase by one die at 11th level (2d8 and 3d8) and 17th level (3d8 and 4d8)."
};
SpellsList["cheat"] = {
	name : "Cheat",
	classes : ["necromancer", "warmage", "witch", "bard", "sorcerer", "warlock", "wizard"],
	source : ["VSoS", 332],
	level : 0,
	school : "Div",
	time : "1 bns",
	range : "Self",
	components : "S,M",
	compMaterial : "A weighted die",
	duration : "1 rnd",
	ritual: false,
	description : "Reroll ability checks to play nonmagical games of skill",
	descriptionFull : "You subtly twist your fingers, and fate seems to follow suit. For the duration, you can reroll any ability check you make to play nonmagical games of skill. Therefore, this spell could influence a game of poker, but not the result of a deck of many things."
};
SpellsList["cryptogram"] = {
	name : "Cryptogram",
	classes : ["necromancer", "warmage", "witch", "bard", "sorcerer", "warlock", "wizard"],
	source : ["VSoS", 334],
	level : 0,
	school : "Conj",
	time : "1 a",
	range : "Unlimited",
	components : "V,S,M",
	compMaterial : "A small written message",
	duration : "Instantaneous",
	description : "Send a message up to 8 characters (incl. spaces) to known crea on same plane, 1/day",
	descriptionFull : "You send a small scroll with a short message to a creature of your choice. The recipient must be a creature known to you and also be on the same plane of existence as you. This scroll will hover in front of the recipient, drop into their pocket, or appear sitting on something nearby. The scroll’s message can be up to 8 characters long (spaces count as characters). You can send only one scroll to a single target each day."
};
SpellsList["finger guns"] = {
	name : "Finger Guns",
	classes : ["warmage", "bard", "sorcerer", "wizard"],
	source : ["VSoS", 338],
	level : 0,
	school : "Evoc",
	time : "1 bns",
	range : "Self",
	components : "V,S",
	duration : "1 min",
	ritual: false,
	description : "Action for ranged spell atk, 60 ft, 1d8 Force dmg on hit; counts as firearm; +1d8 CL5/11/17",
	descriptionCantripDie : "Action for ranged spell atk, 60 ft, `CD`d8 Force dmg on hit; counts as firearm",
	descriptionFull : "You extend your forefinger and thumb, a dangerous gesture mimicking a gun. For the duration, you can use your action to make a ranged spell attack against one creature you can see within 60 feet of you, dealing 1d8 force damage on a hit." + "\n   " + "Your finger gun doesn’t require ammunition, but it is considered to be a firearm for spells and effects that apply to firearms." + "\n   " + "The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
};
SpellsList["force buckler"] = {
	name : "Force Buckler",
	classes : ["warmage"],
	source : ["VSoS", 339],
	level : 0,
	school : "Abjur",
	time : "1 bns",
	range : "Self",
	components : "V,S,M\u0192",
	compMaterial : "A specially prepared gauntlet worth at least 5 gp",
	duration : "1 rnd",
	ritual: false,
	description : "My AC gains +2 as if wielding a shield; ends if hit by an attack",
	descriptionFull : "You summon a translucent yet visible field of force, which springs forth from the prepared gauntlet. Until the start of your next turn, this shield grants you a +2 bonus to your Armor Class, as if you were wielding a shield. This spell ends early if you are hit by an attack."
};
SpellsList["force dart"] = {
	name : "Force Dart",
	classes : ["warmage"],
	source : ["VSoS", 339],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "120 ft",
	components : "V,S,M\u0192",
	compMaterial : "A specially prepared gauntlet worth at least 5 gp",
	duration : "Instantaneous",
	ritual: false,
	description : "Ranged spell atk for 1d10 Force dmg; +1d10 CL5/11/17",
	descriptionCantripDie : "Ranged spell atk, `CD` beams deal 1d10 Force dmg each",
	descriptionFull : "You fling a dart of magical force at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage." + "\n   " + "This spell’s damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10)."
};
SpellsList["force weapon"] = {
	name : "Force Weapon",
	classes : ["warmage"],
	source : ["VSoS", 339],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "5 ft",
	components : "V,S,M\u0192",
	compMaterial : "A specially prepared gauntlet worth at least 5 gp",
	duration : "1 rnd",
	ritual: false,
	description : "Melee spell atk for 1d10 Force dmg; can opportunity attack until next turn; +1 atk CL5/11/17",
	descriptionCantripDie : "`CD` melee spell atks for 1d10 Force dmg ea; can make 1 Opp. Attack before next turn",
	descriptionFull : "You conjure a blade of magical force in the air, which lashes out at your foes. Make a melee spell attack against a creature within range. On a hit, the target takes 1d10 force damage. The blade remains in existence for a short time; until the start of your next turn, you can make a single strike with your mystical blade as an opportunity attack." + "\n   " + "You can make 1 additional attack on your turn at 5th level (2 attacks), at 11th level (3 attacks), and at 17th level (4 attacks)."
};
SpellsList["frigid blade"] = {
	name : "Frigid Blade",
	classes : ["warmage"],
	source : ["VSoS", 340],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "S:5-ft rad",
	components : "V,M",
	compMaterial : "A melee weapon",
	duration : "1 rnd",
	ritual: false,
	description : "Melee wea atk w/cast; hit: +0d8 Cold dmg, 1d8 Cold if moves before my turn; +1d8 CL5/11/17, B",
	descriptionCantripDie : "Melee wea atk with cast; hit: +`CD-1`d8 Cold dmg, `CD`d8 Cold dmg if moves before my turn",
	descriptionFull : "As part of the action used to cast this spell, you must make a melee attack with a weapon against one creature within the spell’s range, otherwise the spell fails. On a hit, the attack does damage as normal, except that the attack deals cold damage instead of its normal type. Additionally, the target is covered in a brittle frost until the start of your next turn. If the target willingly moves before then, you can use your reaction to deal 1d8 cold damage to the target, ending the spell." + "\n   " + "At 5th level, the melee attack and secondary damage each deal an additional 1d8 cold damage. Both damage rolls increase by 1d8 at 11th level (2d8 and 3d8) and 17th level (3d8 and 4d8)."
};
SpellsList["lightning surge"] = {
	name : "Lightning Surge",
	classes : ["necromancer", "warmage", "sorcerer", "warlock", "wizard"],
	source : ["VSoS", 347],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "S:5-ft rad",
	components : "V,S,M",
	compMaterial : "Two bits of copper wire",
	duration : "Instantaneous",
	save : "Dex",
	ritual: false,
	description : "Crea in 5 ft save or 1d6 Lightning dmg; +1d6 CL5/11/17",
	descriptionCantripDie : "Creatures within 5 ft save or `CD`d6 Lightning damage",
	descriptionFull : "You emit a dazzling array of short lightning bolts in all directions. All other creatures within 5 feet of you must succeed on a Dexterity saving throw or take 1d6 lightning damage." + "\n   " + "This spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
};
SpellsList["magic daggers"] = {
	name : "Magic Daggers",
	classes : ["warmage", "bard"],
	source : ["VSoS", 347],
	level : 0,
	school : "Conj",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	ritual: false,
	description : "Ranged spell atk w/ dagger 1d6 Prc. dmg; CL5:2, CL11:3, CL17:4 daggers",
	descriptionCantripDie : "`CD` ranged spell atks for 1d6 Piercing damage each",
	descriptionFull : "With a flourish, you conjure a throwing dagger of magical force out of thin air and flick it from your wrist at a target you can see. Make a ranged spell attack roll against a creature within range. On a hit, the target takes 1d6 magical piercing damage. The dagger vanishes after the attack." + "\n   " + "At higher levels, you conjure more daggers out of force and make additional attacks: two daggers at 5th level, three daggers at 11th level, and four daggers at 17th level. You can use the daggers to attack the same target or at different ones. Make a separate attack roll for each dagger."
};
SpellsList["moment to think"] = {
	name : "Moment to Think",
	classes : ["warmage", "cleric", "sorcerer", "wizard"],
	source : ["VSoS", 350],
	level : 0,
	school : "Trans",
	time : "1 bns",
	range : "Self",
	components : "V",
	duration : "Instantaneous",
	ritual: false,
	description : "Move in space and Search, Use Object, or Int chk to recall info while time stops",
	descriptionFull : "When you cast this spell, you briefly stop time for everyone but yourself. You can take one additional action and move around in your space while no time passes for other creatures. That action can be used only to take the Search or Use an Object action, or to make an Intelligence check to remember information about something." + "\n   " + "Furthermore, you can’t affect or damage any creature or object, other than objects you are wearing or carrying. If an object leaves your hand, it also becomes frozen in time."
};
SpellsList["phantom grapnel"] = {
	name : "Phantom Grapnel",
	classes : ["warmage"],
	source : ["VSoS", 351],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "30 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Str",
	ritual: false,
	description : "Move to Huge or larger crea or empty space, or pull Large or smaller crea 10 ft. to me on failed save",
	descriptionFull : "You conjure a chain and hook made of magical force, which you propel at a creature or unoccupied space you can see within range. When you target a space or a creature of Huge size or larger, your grapnel pulls you to that target in a straight line. You provoke opportunity attacks for this movement as normal. When you target a creature of Large size or smaller, you pull the target up to 10 feet towards you. A creature can make a Strength saving throw to resist this movement."
};
SpellsList["quickstep"] = {
	name : "Quickstep",
	classes : ["warmage"],
	source : ["VSoS", 352],
	level : 0,
	school : "Trans",
	time : "1 bns",
	range : "Self",
	components : "V",
	duration : "1 rnd",
	ritual: false,
	description : "My walking speed increases by 10 ft until the start of my next turn",
	descriptionFull : "You call upon your inner reserves to give you a brief flash of speed. When you cast this spell, your walking speed increases by 10 feet until the start of your next turn."
};
SpellsList["springheel"] = {
	name : "Springheel",
    // classes : ["springheel", "druid"], typo in the original script
	classes : ["warmage", "druid"],  //corrected class list 
	source : ["VSoS", 354],
	level : 0,
	school : "Trans",
	time : "1 bns",
	range : "Self",
	components : "V",
	duration : "1 rnd",
	ritual: false,
	description : "Jump speed increases by 10 ft., and can running high or long jump w/o running start",
	descriptionFull : "You flood magic into your legs, allowing you to bound high into the air from a standstill. When you cast this spell, your jump distance increases 10 feet until the start of your next turn, and you can make a running high jump or a running long jump without a running start."
};
SpellsList["sonic pulse"] = {
	name : "Sonic Pulse",
	classes : ["warmage"],
	source : ["VSoS", 354],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	ritual: false,
	description : "1 crea save or 1d8 Thun dmg and deafened until my next turn; 1d10 within 10 ft; +1d8/1d10 CL5/11/17",
	descriptionCantripDie : "1 crea save or `CD`d8 Thun dmg and deafened until my next turn; `CD`d10 within 10 ft",
	descriptionFull : "You compress a thunderous boom into an invisible ball and project it at a creature you can see within range. The target must succeed on a Constitution saving throw, or it takes 1d8 thunder damage and is deafened until the start of your next turn." + "\n   " + "If the spell’s target is within 10 feet of you, this spell’s damage becomes d10s, instead of d8s." + "\n   " + "This spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
};
SpellsList["thunderous distortion"] = {
	name : "Thunderous Distortion",
	classes : ["warmage"],
	source : ["VSoS", 355],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "S:10-ft cone",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	ritual: false,
	description : "Crea in area save or 1d6 Thun. dmg; if cast on prev. turn, 1d8 dmg; +1d6/1d8 CL 5/11/17",
	descriptionCantripDie : "Crea in area save or `CD`d6 Thun. dmg; if cast on prev. turn, `CD`d8 instead",
	descriptionFull : "You produce a distorted wave of noise in a 10-foot cone, which can be heard up to 100 feet away. Each creature in that area must succeed a Constitution saving throw, or take 1d6 thunder damage." + "\n   " + "An echo of this noise persists until the end of your next turn. If you cast this spell again before the end of your next turn, its damage becomes d8s, instead of d6s." + "\n   " + "This spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
};
//add cantrip weapon attack entries from https://pastebin.com/0CdaqJs5
WeaponsList["arc blade"] = {
	regExpSearch : /^(?=.*arc)(?=.*blade).*$/i,
	name : "Arc Blade",
	source : ["VSoS", 330],
	list : "spell",
	ability : 0,
	type : "Cantrip",
	damage : ["Bd8/Cd6", "", "lightning"],
	range : "With melee wea",
	description : "Wea dmg is Ltng; 1st dmg added to the atk; 2nd to a tgt within 5 ft on hit",
	abilitytodamage : false,
	dc : false
};
WeaponsList["burning blade"] = {
	regExpSearch : /^(?=.*burning)(?=.*blade).*$/i,
	name : "Burning Blade",
	source : ["VSoS", 331],
	list : "spell",
	ability : 0,
	type : "Cantrip",
	damage : ["Bd6/Cd6", "", "fire"],
	range : "With melee wea",
	description : "Wea dmg is Fire; 1st dmg added to the atk; 2nd as rea to a tgt in the space; B",
	abilitytodamage : false,
	dc : false
};
WeaponsList["card trick"] = {
	regExpSearch : /card trick/i,
	name : "Card Trick",
	source : ["VSoS", 332],
	list : "spell",
	ability : 6,
	type : "Cantrip",
	damage : ["C", 6, "force"],
	range : "60 ft",
	description : "Choose: spell attack, or target Dex save vs. spell save DC",
	abilitytodamage : false,
	dc : false
};
WeaponsList["caustic blade"] = {
	regExpSearch : /caustic blade/i,
	name : "Caustic Blade",
	source : ["VSoS", 332],
	list : "spell",
	ability : 0,
	type : "Cantrip",
	damage : ["Bd8/Cd8", "", "acid"],
	range : "With melee wea",
	description : "Wea dmg is Acid; 1st dmg on hit, 2nd on miss by 3 or less",
	abilitytodamage : false,
	dc : false
};
WeaponsList["finger guns"] = {
	regExpSearch : /finger guns/i,
	name : "Finger Guns",
	source : ["VSoS", 338],
	list : "spell",
	ability : 6,
	type : "Cantrip",
	damage : ["C", 8, "force"],
	range : "60 ft",
	description : "1 action to attack for 1 minute; counts as firearm",
	abilitytodamage : false,
	dc : false
};
WeaponsList["force dart"] = {
	regExpSearch : /force dart/i,
	name : "Force Dart",
	source : ["VSoS", 339],
	list : "spell",
	ability : 6,
	type : "Cantrip",
	damage : ["C", 10, "force"],
	range : "120 ft",
	description : "Can target creatures or objects",
	abilitytodamage : false,
	dc : false
};
WeaponsList["force weapon"] = {
	regExpSearch : /force weapon/i,
	name : "Force Weapon",
	source : ["VSoS", 339],
	list : "spell",
	ability : 6,
	type : "Cantrip",
	damage : ["C", 10, "Force"],
	range : "5 ft",
	description : "Can also make 1 opportunity attack before next turn; scaling adds atks, not dmg",
	abilitytodamage : false,
	dc : false
};
WeaponsList["frigid blade"] = {
	regExpSearch : /frigid blade/i,
	name : "Frigid Blade",
	source : ["VSoS", 340],
	list : "spell",
	ability : 0,
	type : "Cantrip",
	damage : ["Bd8/Cd8", "", "cold"],
	range : "With melee wea",
	description : "Wea dmg is Cold; 1st dmg add to atk; 2nd to tgt if it moves before my next turn",
	abilitytodamage : false,
	dc : false
};
WeaponsList["lightning surge"] = {
	regExpSearch : /lightning surge/i,
	name : "Lightning Surge",
	source : ["VSoS", 347],
	list : "spell",
	ability : 6,
	type : "Cantrip",
	damage : ["C", 6, "lightning"],
	range : "S:5-ft rad",
	description : "Crea in range Dex save; success: nothing",
	abilitytodamage : false,
	dc : true
};
WeaponsList["magic daggers"] = {
	regExpSearch : /magic daggers/i,
	name : "Magic Daggers",
	source : ["VSoS", 348],
	list : "spell",
	ability : 6,
	type : "Cantrip",
	damage : ["C", 6, "piercing"],
	range : "60 ft",
	description : "Each die is a separate dagger (scaling adds attacks, not damage)",
	abilitytodamage : false,
	dc : false
};
WeaponsList["sonic pulse"] = {
	regExpSearch : /sonic pulse/i,
	name : "Sonic Pulse",
	source : ["VSoS", 354],
	list : "spell",
	ability : 6,
	type : "Cantrip",
	damage : ["C", 8, "thunder"],
	range : "60 ft",
	description : "Con save, fail: deafened until my next turn; within 10 ft, d10s instead of d8s",
	abilitytodamage : false,
	dc : true
};
WeaponsList["thunderous distortion"] = {
	regExpSearch : /thunderous distortion/i,
	name : "Thunderous Distortion",
	source : ["VSoS", 355],
	list : "spell",
	ability : 6,
	type : "Cantrip",
	damage : ["C", 6, "thunder"],
	range : "S:10-ft cone",
	description : "Crea in area Con save; cast again next turn for d8s instead of d6s",
	abilitytodamage : false,
	dc : true
};

/*

	This was my attempt to try to work on the previous script made by MPMB to add the house of bishops subclass.
	Had to stop due to MFoV and VSoS being different
	Also this was quite messy and I wanted to redo what I wrote

*/
// AddSubClass("warmage", "bishops", {
// 	regExpSearch : /^(?=.*warmage)(?=.*bishops?).*$/i,
// 	subname : "House of Bishops",
// 	source : ["VSoS", 164],
// 	features : {
// 		"subclassfeature3" : { //this needs some fixing since it essentially gets access to the wizard spell list
// 			name : "Potent Spellcasting",
// 			source : [["VSoS", 165], ["MFoV:CW",0]],
//             minlevel : 3,
//             description : desc([
//                 "At 3rd level, I gain the ability to cast spells more potent than cantrips. I gain one spell from any school and 2 from conjuration or evocation. Any other spells must also be conjuration or evocation",
//                 "I can cast wizard spells, using Intelligence as my spellcasting ability.",
//                 "Whenever I gain a warmage level, I can replace a spell I know with another from the wizard spell list"
//             ]),
//             //custom additional since there is essentially no pattern to this
//             additional : ["", "", "3 spells known", "4 spells known", "4 spells known", "4 spells known", "5 spells known", "6 spells known", "6 spells known", "7 spells known", "8 spells known", "8 spells known", "9 spells known", "10 spells known", "10 spells known", "11 spells known", "11 spells known", "11 spells known", "12 spells known", "13 spells known"],
//             commoneval : function(chc,lvl) {
//                 if(!chc) return;
//                 CurrentSpells['Potent Spellcasting'] = {
//                     name : 'Wizard Spells',
//                     level : lvl,
//                     typeSp : "known",
//                     refType : "class",
//                     ability : 4, 
//                     abilityToUse : [4, []],
//                     list : {"class" : "warmage"},
//                     known : {
//                         cantrips : [],
//                         spells : [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13], 
//                         factor : [3,"default"],    //force chosen class to use half-casting factor from spellblade
//                         spellsTable : false
//                     },
//                     allowUpCasting : true,
//                 }
//                 SetStringifieds('spells'); CurrentUpdates.types.push('spells');
//             },
//             // abilitySave : 4,
//             // spellcastingFactor : 3, //im not entirely sure if this is true
//             // spellcastingList : {
//             //     "class" : "wizard",
//             //     school : ["Evoc", "Conj"],
//             //     level : [1, 4]
//             // },
//             // spellcastingKnown : {
//             //     cantrips : [], //leave empty since we gain no access to cantrips
//             //     spells : [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13]
//             // },
// 		},
//         calcChanges : {
//             atkCalc : [
//                 function(fields, v, output) {
//                     //must be a leveled spell from the warmage spell list
//                     if(classes.known.warmage && classes.known.warmage.level > 4 && v.isSpell && v.thisWeapon[3] && SpellsList[v.thisWeapon[3]].level !== 0 && v.thisWeapon[4].indexOf("warmage") !== -1) {
//                         var lvl = classes.known.warmage.lvl;
//                         output.extraDmg += lvl + "d6";
//                     }
//                 }
//             ],
//             spellAdd : [
//                 function(spellKey, spellObj, spName) {
//                     /*
//                         The warmage edge feature is part of the class feature and this feature is a separate subclass but adds on to it.
//                         Since this is done in the class, we can exclude it being a cantrip, but we will need to add Int to the damage (not yet done)
//                     */
//                     //exclude magic missile from this feature. It only applies to leveled warmage spells
//                     if(spellObj.psionic || spName !== "warmage" || spellKey === "magic missile" || spellObj.level === 0) return;
//                     var lvl = levels.map(function (n) {
//                         return n < 5 ? 0 : n < 11 ? 1 : n < 17 ? 2 : 3
//                     });
//                     //lvl 1-4 is 0, 5-10 is 1, 11-16 is 2, and 17-20 is 3
//                     return genericSpellDmgEdit(spellKey, spellObj, "dmg|damage", lvl + "d6");
//                 }
//             ]
//         }
// 	}
// })
