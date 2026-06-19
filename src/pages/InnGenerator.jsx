import React, { useState, useEffect, useMemo, useRef } from "react";
import { Dice5, Lock, LockOpen, ClipboardCopy, Check, Bookmark, BookmarkPlus, X, Trash2, Upload, Download, Pencil } from "lucide-react";

// ============================================================
// GENERATOR DATA
// ============================================================

const NAME_PARTS = {
  adj: ["Crooked", "Drunken", "Silver", "Golden", "Rusty", "Weeping", "Laughing", "Sleeping", "Salty", "Crimson", "Hollow", "Wandering", "Stout", "Black", "White", "Three-Legged", "One-Eyed", "Restless", "Gilded", "Mossy", "Iron-Bound", "Brazen", "Quiet", "Mended", "Forgotten"],
  beast: ["Stag", "Goose", "Boar", "Raven", "Hound", "Drake", "Pony", "Owl", "Wolf", "Cat", "Fox", "Hart", "Bear", "Mare", "Cockerel", "Toad", "Pike", "Hare", "Magpie", "Bull"],
  object: ["Tankard", "Lantern", "Anvil", "Bell", "Crown", "Kettle", "Shield", "Boot", "Quill", "Hearth", "Wheel", "Sickle", "Compass", "Cup", "Helm", "Key", "Goblet", "Hammer", "Coin", "Knot"],
  person: ["Old Mira", "Cobb", "Hatch", "Ginny", "Wessel", "Marta", "Old Brom", "Tilda", "Garrick", "Auntie Mab", "Hob", "Pell", "Drosh", "Yarrow"],
  place: ["Rest", "Hearth", "Lodge", "Cellar", "Crossing", "Repose", "House", "Hollow", "Stand"],
};

const INN_TYPES = [
  "Roadside inn", "Riverside tavern", "Dockside alehouse", "Hillfort lodge",
  "Crossroads coaching inn", "Village public house", "City tavern", "Border outpost",
  "Hunting lodge", "Pilgrim's rest", "Forest waystation",
];

// Hand-drawn tavern floor plans. Each is a path to an image in /public.
// More drawings get added by uploading the PNG to public/ and adding a line here.
const FLOORPLAN_VARIANTS = [
  "/tavern_wilderness_01.png",
];

const EXTERIORS = [
  "A squat stone building hunched against the wind, its painted sign creaking on rusted chains.",
  "Three stories of dark timber, with mullioned windows glowing amber against the dusk.",
  "Whitewashed walls beneath a steep slate roof, ivy creeping over the south side.",
  "A converted granary, half-timbered and leaning slightly to the east. Smoke curls from two chimneys.",
  "Low-roofed and broad, with a wide veranda where the regulars take their pipes.",
  "A respectable establishment with a freshly-swept stoop and lanterns lit even before sundown.",
  "Patched and weather-bitten, but warm light spills from every shutter.",
  "Built into the lee of a great oak, its eastern wall growing into the trunk itself.",
];

const RACES = ["human", "half-elf", "dwarf", "halfling", "gnome", "tiefling", "half-orc", "human", "human", "halfling"];

const KEEPER_NAMES = ["Mira Holloway", "Bram Cobb", "Hatch Greel", "Old Wessel", "Ginnara Vey", "Tobin Marsh", "Mistress Halgrave", "Drosk Iron-Tooth", "Yarrow Penn", "Cael Ashring", "Mabb Threadgill", "Old Pell", "Sera Vintner", "Hob Stillwater", "Garrick Voss", "Auntie Mab", "Doress the Younger", "Vanya Karst", "Edric Plumm", "Tilda Marsh"];

const KEEPER_DEMEANORS = [
  "warm and quick to laugh, but their eyes never quite settle",
  "blunt to the point of rudeness, but fair",
  "soft-spoken, with the careful manner of someone who has seen too much",
  "loud, theatrical, and clearly the establishment's main attraction",
  "weary, polite, going through the motions",
  "shrewd and watchful — they're counting every coin you touch",
  "gentle and motherly, treating every guest like a returning child",
  "gruff, but secretly delighted by good stories",
  "young and a little out of their depth, having inherited the place recently",
  "ancient, half-deaf, and absolutely in command",
  "nervous, distracted, and watching the door more than the room",
  "exacting and precise, treating service as a sacred trade",
  "thoughtful and slow to answer, as though weighing each word for cost",
  "charming in a way that feels rehearsed, though no less effective for it",
  "brisk and businesslike, with no patience for ceremony",
  "haunted-looking, but courteous, and a fine listener besides",
  "effusive to strangers, oddly cool toward their own staff",
  "prone to laughter at the wrong moments, and apologizing afterwards",
  "bookish, soft-handed, and clearly not born to this work",
  "bristling with old grievances they will, given any opening, recount in full",
  "generous with their food and stingy with their words",
  "a recent widow or widower, and only half here on most evenings",
  "formal in a way that suggests they once served a much grander house",
  "merry on the surface, with a tiredness that surfaces between rounds",
  "talkative when sober, silent after the third cup",
];

const KEEPER_SECRETS = [
  "is a retired adventurer with a chest of relics they can't bring themselves to sell",
  "owes a serious debt to a local thieves' guild",
  "is sheltering a fugitive in the cellar",
  "is a deserter from a distant army, traveling under a false name",
  "secretly fences stolen goods through the back door on third-days",
  "is searching, quietly and constantly, for word of a child who disappeared years ago",
  "brews a forbidden draught for a small list of trusted patrons",
  "is in love with a regular and certain it will never be returned",
  "keeps a journal of every guest, in a cipher only they can read",
  "is bound by an old oath to provide shelter to any who ask, no matter the cost",
  "knows the true location of a buried treasure but is too afraid to dig it up",
  "has been replaced — recently, perhaps — by something that wears their face well enough",
  "is the third in a line of keepers using the same name; no one has noticed",
  "is searching, very patiently, for the person who killed their younger brother",
  "has been working off an old curse, one guest at a time, for longer than anyone knows",
  "is a deposed noble traveling as a commoner, and has begun to enjoy it more than expected",
  "holds a sealed letter that, opened, would unmake a neighboring lord",
  "lost a child at sea twelve years ago, and still sets a place for them at the long table",
  "is fluent in three languages they refuse to admit to speaking",
  "has been smuggling something small but important across the border in the bedding",
  "is collecting evidence against a powerful magistrate, very slowly, very carefully",
  "once spent a year as a prisoner of war and has never spoken of it",
  "believes the inn itself is alive in some small way, and is probably correct",
  "recognized one of the party from a portrait they have been carrying for years",
  "knows exactly which floorboard the bones are under, and never walks across it",
];

const KEEPER_WANTS = [
  "to buy out the inn next door and finally have a kitchen large enough",
  "to find a worthy apprentice and consider retirement",
  "to clear the family name once and for all",
  "to send their child to learn a proper trade somewhere far away",
  "to settle an old debt to a friend long dead",
  "to expand the cellar and start brewing their own ale",
  "to fix the leak in the south roof before the rains return",
  "to find the letter they misplaced years ago, before anyone else does",
  "to take a single day off, just once, to see what it feels like",
  "to be remembered fondly by at least a few of the guests who pass through",
  "to keep this place running through one more winter, the way they always do",
  "to make this inn the kind of place travelers tell stories about",
  "to find out who their father was, before the trail goes cold",
  "to die in this very building, and not somewhere on the road",
  "to teach the old dog one new trick before the year is out",
  "to read every book a particular guest left behind, and then read them again",
  "to outlive a specific rival three towns over",
  "to repay an old kindness no one remembers giving",
  "to see the ocean once, having lived inland for sixty years",
  "to talk a wayward niece into coming home",
  "to finish a project in the attic no one is allowed to see",
  "to apologize, properly, to someone they wronged long ago — if they can find them",
  "to learn the truth about what happened the year before they were born",
  "to write down everything they know before they begin to forget it",
  "to stop dreaming, just for a night, of the place they came from",
];

const OPENING_LINES = [
  "A traveler's first sight.",
  "From the road, before you draw near.",
  "Marked from the trail by lantern-light.",
  "The first sight, coming over the rise.",
  "Standing alone at the crossroads.",
  "Seen first as a single lantern in the dusk.",
  "The Codex's note on this house.",
  "Spoken of, by those who have passed through.",
  "Coming in from the road, late.",
  "On the approach, at dusk.",
  "As you push open the door.",
  "Crossing the threshold.",
  "What strangers see, before they enter.",
  "As remembered by the last guest to leave.",
  "Recorded by a wandering scribe.",
  "How the place is known to those who travel.",
  "The Codex's first impression.",
  "An entry made by lamplight, after.",
];

const STAFF_ROLES = [
  ["a cook", ["surly", "extravagantly bearded", "missing two fingers", "humming constantly", "famed for one specific dish"]],
  ["a serving lad", ["wide-eyed", "deaf in one ear", "an orphan the keeper took in", "rumored to be the keeper's child", "with surprisingly good handwriting"]],
  ["a stable hand", ["who speaks more to the horses than to people", "with a livid scar across one cheek", "who used to ride for a noble house", "always covered in straw"]],
  ["a serving girl", ["sharp-tongued", "studying letters in her free time", "engaged to a soldier away at the border", "secretly the best fighter in the place"]],
  ["a barback", ["enormous and gentle", "a former monk", "who knows everyone's drink without asking", "with mismatched eyes"]],
];

const PATRON_NAMES = ["Old Tom", "Reeve Asher", "the merchant Veld", "a hooded stranger", "Sister Imma", "the Karsten twins", "Captain Hoss", "young Lemmy", "an off-duty city watchman", "a traveling tinker", "Halfwit Hen", "Master Drown", "the widow Beckett", "a quiet woman in road-dust", "two pilgrims bound for the high country", "a bard with a borrowed lute", "an unlucky-looking gambler", "a courier in messenger's livery"];

const PATRON_ACTIVITIES = [
  "is three drinks past their wisdom and getting louder",
  "has been nursing the same ale for two hours and watching the door",
  "is in heated negotiation over something hidden under a cloth",
  "won't stop trying to start a song",
  "is losing badly at dice and beginning to suspect cheating",
  "keeps glancing at the party and looking away",
  "is asleep face-down in their plate",
  "is reading aloud, badly, from a stained pamphlet",
  "is buying drinks for everyone — suspiciously generously",
  "is haggling over the price of a relic the keeper clearly doesn't want",
  "has just arrived, breathless, and asked for the keeper by name",
  "appears to be writing a letter and weeping silently",
  "is showing off a fresh scar to an audience of two",
  "has been telling the same story for an hour, and no one has the heart to leave",
  "is sketching the other patrons in a small leather book, very deliberately",
  "is waiting for someone who is not coming, and beginning to realize it",
  "is cleaning a sword openly at the table, slowly, watching the room",
  "has fallen suddenly silent and is staring at someone across the room",
  "is arm-wrestling a much smaller opponent and losing badly",
  "is whispering to a small caged bird on the table beside them",
  "is comparing maps with a stranger, fingers tracing routes",
  "is being interviewed by the bard in the corner, who is taking careful notes",
  "is half-asleep, hat tipped forward, but their hand never leaves their belt",
  "is feeding scraps to a dog that is not theirs, under the table",
  "has just had an argument with their companion and is pretending nothing happened",
];

const FOODS = [
  ["Brown bread and dripping", 2, "cp"],
  ["Mutton stew with barley", 4, "cp"],
  ["Roast fowl with turnips", 8, "cp"],
  ["River fish, fried in butter", 6, "cp"],
  ["Pickled eggs (each)", 1, "cp"],
  ["A wedge of hard cheese", 3, "cp"],
  ["The keeper's own meat pie", 5, "cp"],
  ["Boiled cabbage and salt pork", 3, "cp"],
  ["A bowl of pottage", 2, "cp"],
  ["Smoked trout with cress", 7, "cp"],
  ["Honey-glazed parsnips", 3, "cp"],
  ["Venison, when the hunt's been good", 1, "sp"],
];

const DRINKS = [
  ["A mug of the house ale", 2, "cp"],
  ["Dark stout, thick as porridge", 3, "cp"],
  ["Cider, cloudy and cold", 2, "cp"],
  ["Wine — they call it red, anyway", 5, "cp"],
  ["A measure of grain spirit", 6, "cp"],
  ["Spiced mead from the hill country", 4, "cp"],
  ["Watered wine for the children", 1, "cp"],
  ["The 'Innkeeper's Mistake' — don't ask", 8, "cp"],
  ["Hot tea, with honey if you ask nicely", 1, "cp"],
  ["Buttered rum, on cold nights only", 5, "cp"],
  ["Pear brandy — the keeper's own", 1, "sp"],
  ["Mulled wine, kept warm on the hearth", 4, "cp"],
  ["Small beer, weak and forgiving", 1, "cp"],
  ["A draught of the dark stuff from behind the bar", 1, "sp"],
];

const ROOM_OPTIONS = [
  ["A bed in the common room", 3, "cp"],
  ["A shared room with three other guests", 5, "cp"],
  ["A small private room", 1, "sp"],
  ["A proper room with a bed and a chest", 2, "sp"],
  ["The good room, with a view of the road", 5, "sp"],
];

const RUMORS = [
  "Sheep have been going missing on the north road. Not slaughtered — taken. Whole.",
  "Old Garrick swears he saw a light moving inside the abandoned mill three nights running.",
  "The lord's tax collector is overdue by a week. The roads are clear. Where is he?",
  "A stranger paid in gold last fortnight. Real gold, foreign mint. He hasn't been seen since.",
  "There's a job, if you can keep your mouth shut. Ask the man in the green hood after midnight.",
  "Children in the village have all been having the same dream. A door, and something on the other side.",
  "The river ran black for a full hour yesterday afternoon. No one knows why.",
  "Whatever you do, don't take rooms above the kitchen tonight. Just trust me.",
  "There's said to be a witch in the wood east of here, and she takes payment in memories.",
  "A bounty was posted at the next town over. Five hundred silver for a girl with a copper birthmark.",
  "Old maps in the cellar show a tunnel that shouldn't exist. The keeper doesn't talk about it.",
  "Pilgrims passed through last week heading for a shrine no one's heard of.",
  "There's been singing from the standing stones at night. Not human singing.",
  "The miller's youngest came home with pockets full of silver and won't say where from.",
];

const QUIRKS = [
  "A stuffed and badly-mounted wyvern hangs over the bar. It has three eyes. One has been added.",
  "Every guest is required to add a verse to the house ballad before leaving. The book is enormous.",
  "The floorboards in the common room creak in a recognizable tune when crossed in a certain order.",
  "A small white cat is allowed to walk on the tables. No one shoos it. No one is permitted to touch it.",
  "The keeper insists on serving every guest themselves, at least once, no matter how busy.",
  "There is a chair by the window that is never occupied. A full meal is set there each evening.",
  "The walls are covered in carved initials, going back generations. New guests are encouraged to add theirs — in a specific corner only.",
  "Music boxes line one wall, all of them wound and playing at slightly different tempos.",
  "A bell in the rafters rings, just once, sometime in the small hours. No one will explain it.",
  "The drinks are all served in mismatched cups, and the keeper assigns them based on something only they understand.",
  "There is no clock, and the keeper grows visibly upset if anyone asks the hour.",
  "An old hunting dog sleeps by the fire. It is well over twenty years old and shows no signs of dying.",
  "A great brass bell hangs by the door. No one knows what it is supposed to summon, but everyone agrees not to ring it.",
  "The keeper greets every new guest with the same exact phrase, delivered with great care. No one has ever heard them deviate.",
  "Every plate is marked on the underside with a different small symbol. Regulars learn which is theirs.",
  "The fire is fed only by guests, never by the staff. A basket of split wood sits by the hearth for the purpose.",
  "There is one window that is always shuttered, even on the warmest days, and no one will explain why.",
  "A long mirror hangs at the foot of the stairs. Guests are gently asked not to look into it after dark.",
  "A framed page from an unknown book hangs above the bar. The text is in a script no one present can read.",
  "Above each table is a small lantern with colored glass. The keeper changes which color hangs where on certain nights, and only they know the meaning.",
];

const TROUBLES = [
  "The cellar has been locked for a week. The keeper won't say why, and is fetching ale from the storeroom instead.",
  "There's a fresh patch of plaster on the wall behind the long table. It's the wrong color.",
  "One of the upstairs doors has had its lock replaced — recently, and on the outside.",
  "The serving lad has a bruise on his wrist in the shape of a hand much larger than his own.",
  "Two guests arrived yesterday. Only one was seen at breakfast. Their belongings are still upstairs.",
  "A faint, sweet smell rises from one of the floorboards near the hearth when the fire is low.",
  "The keeper checks the road every quarter hour, and tries to pretend they aren't.",
  "Someone has been stealing small items from the guests — buttons, a comb, a single boot — and leaving copper coins in their place.",
  "The dog won't go near the back hall, and growls if pushed.",
  "There is a sealed letter behind the bar, addressed to no one, that the keeper has been told to give to 'whoever asks for it correctly.'",
  "A new serving girl started three days ago. No one — including the staff — can quite remember who hired her.",
  "The keeper has been counting heads in the common room every quarter hour, frowning, and shaking their head.",
  "There is fresh mud on the back stairs at dawn, every dawn this week, and no one will admit to having gone out.",
  "A guest staying for three days has not been seen to eat, drink, or sleep, and the staff have been told not to ask.",
  "The horses in the stable were spooked badly an hour before dawn. There were no tracks in the snow around the building.",
  "Someone has been adding names to the guest book in a hand the keeper does not recognize, dated for next week.",
  "The shutters on the second floor were all open this morning, every one of them, and no one will admit to opening them.",
  "There is a coin in the till that should not be there — old, foreign, struck in a year that does not exist on any king's reign.",
  "A second cellar door has appeared behind a stack of barrels. The keeper does not remember a second cellar door.",
  "The cat that has lived at the inn for six years will not come inside tonight, no matter the coaxing.",
];

// ============================================================
// REGIONAL FLAVOR
// ============================================================

const REGIONS = {
  coastal: {
    nameAdj: ["Salt-Worn", "Briny", "Storm-Lashed", "Tidal", "Drowned", "Sea-Bitten", "Pearled", "Foggy", "Wave-Worn", "Smuggler's", "Salted", "Weathered", "Foundering", "Lost"],
    nameBeast: ["Gull", "Crab", "Pike", "Eel", "Heron", "Cormorant", "Whale", "Mackerel", "Squid", "Selkie", "Sea-Wolf", "Tern", "Octopus", "Lobster"],
    nameObject: ["Anchor", "Mast", "Net", "Lantern", "Buoy", "Helm", "Sail", "Compass", "Trident", "Lighthouse", "Trawl", "Hook"],
    keeperNames: ["Salt-Bess Marrow", "Old Skip Harrow", "Captain Dronn (ret.)", "Tomma Tideford", "Goodwife Plinch", "Bram Saltwell", "Mer Halgrave", "Old Pip the Pilot", "Ester Cawl", "Hookhand Mardon", "Wynne the Wrecker", "Hess Brinewater", "Old Coll the Cooper"],
    patronNames: ["a sailor on shore leave", "the harbourmaster's clerk", "an old whaler with a scarred jaw", "a smuggler with a missing finger", "a foreign sea-captain", "the lighthouse keeper", "two fishermen mending nets", "a ship's cook on leave", "a wrecker in a heavy coat", "a young midshipman", "the customs inspector, off-duty", "a sailmaker's apprentice", "a pearl-diver from the southern isles"],
    types: ["Dockside alehouse", "Fisherman's tavern", "Harbour inn", "Quayside lodge", "Smuggler's roost", "Lighthouse rest", "Cliff-foot tavern"],
    exteriors: [
      "Salt-bleached timbers and a roof patched with old sailcloth, nets hung to dry along the south wall.",
      "Built half on stilts above the high-tide mark, with a long jetty leading to the door.",
      "A squat stone keep of a place, shutters drawn against the salt wind, smelling of brine and woodsmoke.",
      "Tall and narrow, painted in faded harbour colours, with the inn's lantern visible far out at sea.",
      "Low and weather-beaten, half-buried in shingle, with a rusted ship's bell hung by the door.",
      "Built into the chalk cliff itself, its windows looking out over a bay where ships ride at anchor.",
    ],
    foods: [
      ["Smoked herring with brown bread", 4, "cp"],
      ["A bowl of crab stew", 6, "cp"],
      ["Salt cod and boiled potatoes", 5, "cp"],
      ["Oysters by the half-dozen", 8, "cp"],
      ["Eel pie, served hot", 7, "cp"],
      ["Pickled samphire (with anything)", 2, "cp"],
      ["Mussels steamed in cider", 5, "cp"],
      ["Fish chowder with hard bread", 4, "cp"],
      ["Whatever was in the nets this morning", 6, "cp"],
      ["Boiled crab claws with vinegar", 7, "cp"],
    ],
    drinks: [
      ["Grog, well-watered", 2, "cp"],
      ["Strong coastal cider", 3, "cp"],
      ["Salt-cured rum (one measure)", 6, "cp"],
      ["Kelp wine — an acquired taste", 4, "cp"],
      ["Dark ale from the brewery on the point", 3, "cp"],
      ["Hot buttered rum on cold nights", 5, "cp"],
      ["The 'Drowned Man' — don't ask", 8, "cp"],
    ],
    rumors: [
      "A ship came in last night with no crew. The cargo was untouched. The lifeboats were still stowed.",
      "Children found a corpse on the beach in armour no one recognised. The harbourmaster had it removed quickly.",
      "There's been singing from the rocks at low tide. The fisherwomen say not to listen.",
      "The lighthouse keeper hasn't lit the lamp for three nights. No one has gone to check.",
      "A merchant's wife paid in old coin minted across the sea. She'd never been there, she says.",
      "Smugglers have a new route through the sea caves. They pay well for blind eyes.",
      "Something has been pulling fishermen's nets up empty and shredded for two weeks running.",
      "A storm drove a strange ship into the bay three days ago. Nobody goes ashore. Nobody seems to leave.",
      "The old harbour seal that's lived here for thirty years is gone. The fishermen are uneasy.",
      "A bottle washed up yesterday with a name inside written on parchment. Just a name. The reeve has the parchment now.",
    ],
  },

  mountain: {
    nameAdj: ["Frozen", "High", "Stone-", "Wind-Bitten", "Snow-Crowned", "Iron-", "Storm-", "Cragside", "Pass-", "Hollow", "Last", "Eagle-"],
    nameBeast: ["Goat", "Eagle", "Ram", "Falcon", "Marmot", "Wolverine", "Bighorn", "Lynx", "Yak", "Crow", "Wolf", "Stoat"],
    nameObject: ["Pick", "Lantern", "Cairn", "Horn", "Anvil", "Hammer", "Forge", "Chain", "Watchfire", "Beacon", "Bell", "Spike"],
    keeperNames: ["Old Karn Stoneward", "Mistress Drannar Iron-Tooth", "Brogga Pickforge", "Highland Hethel", "Greybeard Vol", "Mother Cairnford", "Tobin Hardrock", "Auntie Hild", "Trapper Kestrel", "Ovrik Pass-Master", "Old Mab of the Heights", "Hess Snowfoot", "Jorund the Climber"],
    patronNames: ["a pack-mule driver with chapped hands", "a miner with quartz dust in his beard", "a goat-herd from the high pastures", "an injured climber, propped by the fire", "a road-warden in heavy boots", "a venturing prospector", "a herald carrying overdue dispatches", "two pilgrims bound for a mountain shrine", "an old guide who knows every pass", "a smith on his way to the next holding", "a wandering bone-setter", "a deserter from the keep on the ridge"],
    types: ["Highland lodge", "Mountain pass inn", "Mining camp tavern", "Cliffside rest", "Alpine waystation", "Watchtower inn", "Last lodge before the pass"],
    exteriors: [
      "Heavy stone walls beneath a steep slate roof, smoke rising straight up from the chimney into the thin air.",
      "Built of squared timber and stone, with sturdy shutters and an iron-banded door against the wind.",
      "A long low building hugging the leeward side of the ridge, its eaves heavy with old icicles.",
      "Three storeys of pitched timber rising from a granite foundation, with a wide stable wing for pack mules.",
      "Half-buried into the mountainside, with only the chimney and door visible from the road in winter.",
      "Sturdy and unornamented, its walls scarred by rockfall, its sign-board chained against the wind.",
    ],
    foods: [
      ["Mutton and root stew", 5, "cp"],
      ["Hard bread with goat cheese", 3, "cp"],
      ["Smoked venison and pickles", 6, "cp"],
      ["Pickled cabbage and salt pork", 3, "cp"],
      ["Hot porridge with butter and honey", 2, "cp"],
      ["Mountain trout, fried whole", 6, "cp"],
      ["Hard sausage and dark bread", 4, "cp"],
      ["Roasted chestnuts (by the handful)", 1, "cp"],
      ["A bowl of barley with marrow bones", 4, "cp"],
      ["The keeper's own smoked ham", 7, "cp"],
    ],
    drinks: [
      ["Hot spiced wine", 4, "cp"],
      ["Highland whisky, a thumb-deep", 6, "cp"],
      ["Mead with juniper", 4, "cp"],
      ["Pine-resin spirits", 5, "cp"],
      ["A mug of strong black ale", 3, "cp"],
      ["Goat's milk warmed with honey", 2, "cp"],
      ["Old Karn's 'Climber's Cure'", 8, "cp"],
    ],
    rumors: [
      "The pass has been closed by something larger than a rockfall. The road wardens won't go up.",
      "Miners hit a vein last week that runs warm. The deeper they dig, the warmer the rock.",
      "Old Karn's been hearing horns from the high peaks at night. He's the only one who'll talk about it.",
      "A goat-herd's flock came back without him. They wouldn't go near the high meadow after.",
      "There's a stranger living in the old fire-watcher's tower. No one saw him arrive.",
      "The mountain has been giving up old bones from a glacier high in the western range. Old bones, in armour.",
      "Travellers say there's a new lake in the high country, where there shouldn't be one. It doesn't freeze.",
      "An avalanche last month uncovered a door cut into solid rock. The miners have been forbidden to approach it.",
      "Three of the pack mules came home in their traces yesterday, without the wagon and without the driver.",
      "Smoke has been rising from the ruined watchtower on the south peak. No one is supposed to be up there.",
    ],
  },

  city: {
    nameAdj: ["Gilded", "Royal", "Ironwood", "Polished", "Refined", "Old", "Crown's", "Bishop's", "Merchant's", "Crested", "Brass", "Vellum"],
    nameBeast: ["Lion", "Hound", "Stag", "Hawk", "Swan", "Greyhound", "Phoenix", "Griffin", "Mastiff", "Falcon", "Peacock"],
    nameObject: ["Crown", "Quill", "Scales", "Coin", "Helm", "Sword", "Goblet", "Book", "Seal", "Crest", "Sceptre", "Mirror"],
    keeperNames: ["Master Edric Vellum", "Madame Halrose", "Old Voss the Vintner", "Mistress Cara Lockworth", "Sir Bellamy (lately of the Watch)", "Tobias Halgrove", "Lady Marsen", "Master Crispin Quill", "Goodwife Bristle", "Aldous Penn, esquire", "Madame Threadgill", "Master Renn the Younger"],
    patronNames: ["an off-duty guildsman", "a junior scribe spending his stipend", "a poet in fashionable disrepair", "a noble's discreet companion", "a guild auditor passing through", "a foreign merchant in fine cloth", "an actor between roles", "a magistrate's clerk reading dispatches", "a country gentleman in town for the season", "a foreign emissary's translator", "a money-lender taking notes", "a courtesan resting between engagements", "a city watchman just off his shift"],
    types: ["Merchant's lodge", "Guild-house tavern", "City inn", "Diplomatic rest", "Theatre-district pub", "Magistrate's tavern", "Old quarter alehouse"],
    exteriors: [
      "Three storeys of fine brickwork, with mullioned windows and a polished brass sign that catches the lamplight.",
      "A respectable city inn with a swept stoop, a uniformed doorman, and stained glass above the entry.",
      "Wedged between two taller buildings, its narrow front betraying nothing of the great common room within.",
      "An old guildhall converted to an inn, its stone facade carved with the marks of long-dead trades.",
      "Half-timbered and proudly old-fashioned amid newer construction, with the city's coat-of-arms above the door.",
      "A four-storey establishment with private dining rooms on the upper floors and its own livery in the yard.",
    ],
    foods: [
      ["Roast capon with sage stuffing", 8, "cp"],
      ["Spiced pork sausages with mustard", 6, "cp"],
      ["Fine wheat bread with honeyed butter", 3, "cp"],
      ["Cured ham, pickles, and soft cheese", 7, "cp"],
      ["A veal pie of the city style", 9, "cp"],
      ["A plate of city cheeses with figs", 8, "cp"],
      ["Stuffed mushrooms in wine sauce", 6, "cp"],
      ["Saffron rice with raisins", 7, "cp"],
      ["A whole roasted partridge", 1, "sp"],
      ["Almond cakes, three for a coin", 4, "cp"],
    ],
    drinks: [
      ["Imported red wine, the house pour", 5, "cp"],
      ["Spiced brandy from the south", 8, "cp"],
      ["City ale, popular at court", 3, "cp"],
      ["Apricot liqueur in a small glass", 6, "cp"],
      ["A bottle of the good vintage", 3, "sp"],
      ["Spiced wine, served hot", 4, "cp"],
      ["Coffee, very fashionable lately", 5, "cp"],
    ],
    rumors: [
      "The Guild of Locksmiths is voting for a new master tonight. Three candidates. Two will not see morning.",
      "A noble's daughter was seen leaving a fortune-teller's house at dawn. She was crying.",
      "The watch found a body in the canal — well-dressed, no purse. Third one this month.",
      "A printer was arrested for what he was setting in type. The press has been smashed.",
      "There's a job at the great house on Mercer Street. They're hiring quietly, asking the wrong questions.",
      "The Duke's physician hasn't been seen for a fortnight. They say the Duke has not been seen either.",
      "A foreign ambassador has been keeping odd company in the wine-cellar of the Three Sisters.",
      "Someone has been buying up debts across the merchant quarter — all from one specific bloodline.",
      "The bells of Saint Galen's rang at three in the morning yesterday. The sacristan swears no one was in the tower.",
      "A masked figure has been settling old grievances in the back alleys. The watch are quietly grateful.",
    ],
  },

  wilderness: {
    nameAdj: ["Hidden", "Lonely", "Lost", "Last", "Old", "Far", "Deep", "Whispering", "Forsaken", "Hollow", "Witchwood", "Crooked"],
    nameBeast: ["Wolf", "Bear", "Stag", "Boar", "Hawk", "Lynx", "Crow", "Fox", "Hart", "Owl", "Raven", "Wyrm"],
    nameObject: ["Bow", "Trap", "Antler", "Pelt", "Hatchet", "Lantern", "Snare", "Cairn", "Standing-Stone", "Talisman"],
    keeperNames: ["Old Wyl of the Wood", "Hether Antlerward", "Trapper Drosk", "Ginnara the Quiet", "Brom Hollow-Foot", "Mother Kestrel", "Cael Longbow", "Auntie Rook", "Old Hemlock", "Mab Three-Hares", "Garth Wolfsbrother", "Eyrne the Hedge-Wife", "Old Pell of the Crossroads"],
    patronNames: ["a fur trapper with a wet pack", "a wood-cutter with sap-stained hands", "a herbalist on her route", "a lone ranger by the door", "a hunter who's been at it too long", "a wandering hedge-witch", "a pilgrim who took a wrong turn", "two charcoal-burners, dark with soot", "a courier on a desperate ride", "an old hermit who rarely speaks", "a borderland scout with a bandaged arm", "a falconer with a cloth-hooded bird", "a woad-painter from the deep wood"],
    types: ["Forest lodge", "Hunter's rest", "Trapper's cabin", "Wayfarer's hut", "Old hermit's roadhouse", "Moorland inn", "Borderland post"],
    exteriors: [
      "Rough-hewn timber walls beneath a heavy thatched roof, smoke curling up through the canopy above.",
      "Built around the trunk of an enormous oak, its rooms wrapping the great tree like a wooden coat.",
      "Low, sprawling, and patched many times over, surrounded by a palisade of sharpened stakes.",
      "A long-house in the old style, with antlers above the door and a single lantern burning even by day.",
      "Three small buildings clustered around a courtyard, all of grey stone and lichen, isolated for miles in any direction.",
      "Half hut, half stockade, the only light for a day's travel in any direction.",
    ],
    foods: [
      ["Roasted hare on a spit", 5, "cp"],
      ["Wild boar with foraged greens", 8, "cp"],
      ["Smoked venison, sliced thin", 6, "cp"],
      ["Mushroom stew, dark and earthy", 4, "cp"],
      ["Berry compote on hard bread", 3, "cp"],
      ["Pine-nut bread, just baked", 2, "cp"],
      ["Roast pheasant, when the hunt allows", 9, "cp"],
      ["Acorn porridge with wild honey", 3, "cp"],
      ["A trout from the brook, fried in butter", 6, "cp"],
      ["Whatever the trapper brought in this morning", 6, "cp"],
    ],
    drinks: [
      ["Pine-needle ale", 3, "cp"],
      ["Bramble wine, dark as old blood", 4, "cp"],
      ["Honey mead from the keeper's hives", 4, "cp"],
      ["Bitter forest spirits", 6, "cp"],
      ["Hot water with herbs, in winter", 1, "cp"],
      ["Cider, made on the premises", 3, "cp"],
      ["The 'Witch's Kiss' — green, fragrant, strong", 7, "cp"],
    ],
    rumors: [
      "The trapper's line hasn't been checked in a week. He hasn't come back from the east woods.",
      "Something has been tearing the bark off the old oaks in great vertical strips. Taller than a man.",
      "A wood-cutter found tracks that change halfway across a clearing. He won't speak of them.",
      "The herbalist who lived past the brook is gone. Her cottage is in order, untouched. She just isn't there.",
      "Travellers report seeing the same lone figure on the road, ahead of them, day after day. They never close the distance.",
      "The standing stones in the south clearing were eleven last summer. They are twelve now.",
      "Three farms past the treeline have been abandoned in a month — doors left open, kettles still on the hearths.",
      "An old hermit who never came to the inn before came in last week, ate nothing, drank one cup of water, and left without speaking. He was crying.",
      "Hounds have started refusing to go past the river bend. Even the brave ones.",
      "There's been smoke from a clearing where no one is supposed to live. It rises every evening at the same hour.",
    ],
  },
};

const REGION_LIST = ["any", "coastal", "mountain", "city", "wilderness"];
const REGION_LABELS = {
  any: "Any",
  coastal: "Coastal",
  mountain: "Mountain",
  city: "City",
  wilderness: "Wilderness",
};

// Pulls a content pool, using regional override when present
function getPool(region, poolName) {
  if (region && region !== "any" && REGIONS[region]?.[poolName]) {
    return REGIONS[region][poolName];
  }
  // Fall back to the default pools
  const defaults = {
    nameAdj: NAME_PARTS.adj,
    nameBeast: NAME_PARTS.beast,
    nameObject: NAME_PARTS.object,
    namePerson: NAME_PARTS.person,
    namePlace: NAME_PARTS.place,
    types: INN_TYPES,
    exteriors: EXTERIORS,
    foods: FOODS,
    drinks: DRINKS,
    rumors: RUMORS,
    keeperNames: KEEPER_NAMES,
    patronNames: PATRON_NAMES,
  };
  return defaults[poolName];
}

// ============================================================
// TONAL FLAVOR
// ============================================================

const TONES = {
  cozy: {
    keeperDemeanors: [
      "warm and motherly, remembering every regular's drink without being asked",
      "cheerful and a little too talkative, but everyone loves them anyway",
      "patient, kind, and treats every guest like a returning family member",
      "endearingly flustered, yet somehow gets everything right in the end",
      "competent and calm — exactly what a tired traveler needs",
      "jolly, well-fed, and entirely committed to feeding everyone else just as well",
      "soft-spoken and gentle, with the manner of someone who chose this life and loves it",
      "wry-humored, mildly mischievous, and clearly the heart of the village",
      "fussily proud of every detail of the place, and rightfully so",
      "young, eager, and surprisingly good at this for their age",
      "ancient, beloved, and absolutely in charge of everything",
      "warm and quick to laugh, with eyes that crinkle in genuine welcome",
    ],
    keeperSecrets: [
      "quietly funds the village orphans out of the inn's earnings every year, and tells no one",
      "writes letters every week to a soldier away at war — their grandchild, or so they say",
      "secretly keeps a room reserved at all times for any pilgrim who arrives with no coin",
      "is a retired adventurer who chose this peaceful life and has never once regretted it",
      "knows every recipe of their late spouse by hand, and refuses to write them down for fear of forgetting the shape of those hands",
      "has been teaching the stable hand to read in the evenings, very patiently, for nearly two years",
      "secretly braids small charms into the laundry sheets of guests they like, for good luck on the road",
      "is the one who has been leaving anonymous baskets at the door of the widow down the road since her husband passed",
      "keeps a small ledger of every guest's preferences — not to spy, but to remember if they ever return",
      "has been quietly hiding a stray cat from their disapproving spouse for nine months. Everyone else knows.",
      "is in unrequited love with one specific regular, and is perfectly content simply to be near them",
      "saves the best cuts of meat for an old beggar who comes by the back door every third evening",
    ],
    keeperWants: [
      "to see their granddaughter's wedding next spring",
      "to finally finish the cookbook they've been compiling for years",
      "to buy the neighboring building and expand the kitchen",
      "to teach the stable hand to read before winter",
      "to host a proper festival in the courtyard this midsummer",
      "to have the roof properly mended before the rains",
      "to make peace with an estranged sibling, two days' ride away",
      "to learn the recipe for their late mother's apple cake",
      "to retire somewhere with a view of the sea, but not yet",
      "to see their old hunting dog comfortable through one more winter",
      "to be remembered fondly by their regulars long after they're gone",
      "to find a worthy successor for the inn, and trust them with it",
    ],
    quirks: [
      "An ancient hunting dog sleeps by the hearth. It rises only to greet new arrivals, then returns to sleep.",
      "Letters from the keeper's grown children are pinned to the wall behind the bar. Guests are encouraged to read them.",
      "Every loaf is baked fresh each morning. The smell hits you at the door.",
      "A fat tabby cat has claimed one specific chair by the fire as her own. The chair is roped off in her honor.",
      "The walls are covered in small framed thank-you notes from past guests, going back generations.",
      "There is a jar of sweets behind the bar. Any child who comes in is given one — no exception, no charge.",
      "The keeper's spouse plays a small fiddle most evenings. Not for coin. Just for the room.",
      "Every guest is sent off with bread, cheese, and a small written blessing for the road.",
      "The fire is never allowed to go out. The keeper says it has been burning for forty years.",
      "A pot of stew is always simmering. The recipe never repeats exactly, but it is always good.",
      "There is a windowsill jar where travelers leave small tokens for luck. No one ever takes from it.",
      "A book of recipes sits by the kitchen door. Any guest is welcome to add one before they leave.",
    ],
    troubles: [
      "The hearth-dog has decided it is in love with one specific guest and follows them everywhere with mournful eyes.",
      "Someone keeps stealing the spoons. Whoever it is leaves them clean in the dish-rack a few hours later.",
      "The keeper's youngest has been writing terrible love poetry on bar napkins and leaving them where guests can find them.",
      "A regular has been losing at dice for a month straight and is starting to look genuinely puzzled about it.",
      "The chickens have stopped laying, and no one can figure out why. The cook is taking it personally.",
      "Someone is sneaking into the kitchen at night and washing all the dishes. The cook is suspicious but grateful.",
      "Two regulars are quietly competing to fix small things around the inn before the keeper notices.",
      "A goose has wandered in from somewhere and refused to leave. It has become the inn's unofficial greeter.",
      "A guest left their walking stick behind a month ago. It has been propped by the door ever since, in case they return.",
      "The bard's apprentice has been practicing in the loft. Everyone is being very polite about how it sounds.",
    ],
    patronActivities: [
      "is showing portraits of their grandchildren to anyone who'll look",
      "is teaching a younger patron a card game with great patience",
      "is reading a letter, smiling quietly to themselves",
      "is helping the serving lad carry a heavy tray, just to be useful",
      "is singing a folk song softly to themselves while they eat",
      "is asleep against their partner's shoulder, perfectly content",
      "is hand-feeding the inn's cat scraps of cheese, against the cook's wishes",
      "is mending a friend's torn cloak by the fire",
      "is celebrating something — a child born, a long road ended, a happy anniversary",
      "is sharing food from their plate with the stranger next to them",
      "is telling an old story everyone has heard before, but no one minds",
      "is writing in a small journal with great concentration",
    ],
  },

  grim: {
    keeperDemeanors: [
      "scarred, sparing of words, and watches the door with the wariness of someone who has reasons",
      "weary to the bone, going through the motions, with eyes that never settle",
      "blunt to the point of cruelty, and well aware that no one comes here for kindness",
      "watchful and hard-faced, sizing up every guest for what they might cost",
      "perfectly polite in a way that promises nothing, and reveals less",
      "quiet and hollow-eyed, carrying something they will never set down",
      "broken in some way that's hard to name, but functional enough to run the place",
      "drunk most evenings, and yet still somehow the sharpest mind in the room",
      "all business, no warmth, with a counting-house manner and no patience for stories",
      "watchful in a way that suggests they once did something more dangerous for a living",
      "weighed down by debt, by grief, or by both — and not pretending otherwise",
      "as cold and exact as a tax collector, and about as welcome",
    ],
    keeperSecrets: [
      "owes a serious debt to a violent gang, and the deadline is days away",
      "is sheltering a fugitive in the cellar, and that fugitive is dangerous",
      "is a deserter from a distant army, traveling under a false name, and the army has not forgotten",
      "killed their predecessor for the inn, and lives in daily fear of being found out",
      "has been fencing stolen goods through the back door for years, and has finally been noticed",
      "is informing on guests to a local crime lord, and not by choice",
      "watched their only child die under this roof, and has never recovered or moved on",
      "is being slowly poisoned, knows it, and cannot prove who is responsible",
      "has been writing a confession for months and has not yet decided whether to send it",
      "knows the location of a grave that no one is supposed to know about — perhaps because they dug it",
      "is paying protection money to a name they cannot speak aloud",
      "buried the previous innkeeper under the cellar floor and has been hearing things at night ever since",
    ],
    keeperWants: [
      "to pay off the debt before they come collecting",
      "to get out of this town before the snow seals the passes",
      "to find the one who killed their brother, three years ago now",
      "to keep their name out of the next ledger that comes through the watch",
      "to make enough this season to bury their father properly",
      "to forget. Permanently, if the price is right.",
      "to outlive the man who put the scar on their face",
      "to keep their secret one more season, then one more, then one more",
      "to send their daughter somewhere safe, anywhere that isn't here",
      "to be left alone by everyone, forever, all of them",
      "to find proof of what they already know",
      "to die in their own bed, which is more than most around here will manage",
    ],
    quirks: [
      "There are no mirrors anywhere in the inn. The keeper does not explain.",
      "A heavy oaken cudgel is kept openly behind the bar, and the keeper's hand is never far from it.",
      "Three of the upstairs doors have new locks, fitted from the outside. The keeper does not say why.",
      "The serving lad has bruises that come and go in a pattern that suggests someone is being careful where to put them.",
      "There is a dark stain on the floor near the long table that has resisted years of scrubbing.",
      "The dog sleeps by the door, not by the fire, and growls at anyone who lingers too long entering.",
      "An old wanted notice — name scraped off the parchment — hangs near the hearth, oddly preserved.",
      "The cellar is locked. The keeper has been fetching ale from the storeroom for as long as anyone can remember.",
      "There is a small graveyard behind the inn, and it is more recent than the inn itself.",
      "Every window has new iron bars, fitted with care. The keeper says they are for keeping things out.",
      "A hooded figure sits in the corner most evenings, untouched by anyone. No one will say who they are.",
      "The wood-axe by the back door is darker at the head than it ought to be.",
    ],
    troubles: [
      "Two guests arrived last night. Only one was seen at breakfast. Their belongings are still upstairs.",
      "There's a fresh patch of plaster on the wall behind the long table. It's the wrong color.",
      "A scream was heard from the cellar around midnight. By morning, no one would admit to having heard anything.",
      "The serving girl has been crying quietly in the kitchen all evening, and won't say what is wrong.",
      "Someone is bleeding from a wound under their cloak, and is trying very hard not to be noticed.",
      "A man with a city watchman's belt — but no other watchman's clothing — has been asking quiet questions all night.",
      "Whatever was nailed to the back door has been removed, but the nails are still there, and so is some of what it was made of.",
      "The keeper checks the road every quarter hour, and tries to pretend they aren't.",
      "Three of the upstairs guests have been here for weeks. None of them will leave. The keeper isn't sure if they can.",
      "Blood was washed from the front step this morning. There has been no rain to explain it.",
    ],
    patronActivities: [
      "is staring at the door as if expecting someone they would rather not see",
      "is drinking with a single-minded grim purpose, not for pleasure",
      "is cleaning blood from a knife under the table, slowly and methodically",
      "is making notes on the other patrons in a small black book",
      "is haggling, in low tones, over what sounds like a very specific kind of work",
      "has a hand that never leaves the hilt of a hidden weapon",
      "is drinking alone in a way that warns others not to approach",
      "is silently sharpening a blade against the underside of their bench",
      "is asking the keeper, very quietly, whether anyone has been by asking about them",
      "is staring at a wedding ring on their own finger as if they have only just noticed it",
      "is paying for everyone's drinks with old, foreign coin, and watching closely who accepts",
      "wears the colors of a faction whose members are supposed to be all dead",
    ],
  },

  mysterious: {
    keeperDemeanors: [
      "soft-spoken, with a way of finishing your sentences just before you do",
      "kind and unhurried, in a manner that suggests they have all the time in the world",
      "watchful and attentive, and entirely too aware of things they should not yet know",
      "warm and gentle, and never seems to age between visits",
      "polite to the point of formality, with the manner of someone keeping house rules you have not yet been told",
      "calm in the face of every interruption, as if nothing here has ever truly surprised them",
      "smiles at the right moments — and a few moments too early",
      "speaks to the cat as though it answers, and sometimes pauses for its reply",
      "ageless, gracious, and entirely too well-informed about your business",
      "absent-minded in the company of guests, attentive in the company of empty rooms",
      "seems to remember you from somewhere, and is too kind to say from where",
      "always knows the weather you traveled through, even before you mention it",
    ],
    keeperSecrets: [
      "knows the name of every guest who has ever slept under this roof, and will not say how",
      "is bound by an old oath to provide shelter to any who ask, no matter the cost or season",
      "set this inn here for a reason none of the locals understand — and the locals do not ask",
      "speaks a language in their sleep that no living traveler has identified",
      "has, in the cellar, a door that opens onto somewhere it should not",
      "writes letters at night to a recipient who has been dead for sixty years",
      "ages a little more on some days than others, and not always in the right direction",
      "has been the innkeeper here longer than any record verifies, and the records are oddly missing",
      "is the figure in a portrait in the upstairs hallway, which is dated fifty years before they should have been born",
      "knows the cat at the hearth was here when they arrived, and when the keeper before them arrived",
      "knows which of their guests will not be leaving in the morning, and lays out one less plate at breakfast",
      "has a room that does not appear on any floor plan, and a key for it that they never lend",
    ],
    keeperWants: [
      "to learn the name of the guest in room seven, who has not given it yet",
      "to find the next page of the book they have been writing for sixty years",
      "to complete the work that was started here long before their time",
      "to remember what they have lately begun to forget",
      "to greet a particular traveler whose arrival they have been expecting",
      "to find out whether the road behind the inn still leads where it used to",
      "to pay back a debt to someone they have never met, on a date they have not yet been told",
      "to know what the cat sees in the empty corner by the stairs",
      "to discover whether the keeper before them was real or imagined",
      "to identify the song that has been humming itself through the floorboards",
      "to deliver a sealed letter, when the correct person finally arrives",
      "to find the door that the cellar key was made for",
    ],
    quirks: [
      "There is no clock, and the keeper grows visibly upset if anyone asks the hour.",
      "A bell in the rafters rings, just once, sometime in the small hours. No one explains it.",
      "There is a chair by the window that is never occupied. A full meal is set there each evening, untouched by morning.",
      "Mirrors in the upstairs hallway show the room behind you slightly later than it ought to be.",
      "A small white cat is allowed to walk on the tables. No one shoos it. No one is permitted to touch it.",
      "The walls are covered in carved initials, going back generations. New guests are encouraged to add theirs — in a specific corner only.",
      "Music boxes line one wall, all playing at slightly different tempos that occasionally, all at once, align.",
      "Drinks are served in mismatched cups, assigned by the keeper according to a system no guest has ever decoded.",
      "Every guest is offered a key on arrival. Most rooms are unlocked. The key is for something else, and the keeper does not say what.",
      "The road outside seems shorter on the way in than on the way out.",
      "A particular candle in the common room burns for exactly the length of the conversations held near it.",
      "The keeper's dog appears to recognize certain new guests, and greets them by name.",
    ],
    troubles: [
      "A faint, sweet smell rises from one of the floorboards near the hearth when the fire is low. The keeper has stopped trying to remove it.",
      "One of the upstairs doors has not been opened in years. The keeper says the guest within is sleeping, and pays for the room in advance, somehow.",
      "Someone has been stealing small items from the guests — buttons, a comb, a single boot — and leaving copper coins in their place. The coins are older than they should be.",
      "The dog won't go near the back hall, and growls if pushed. The cat sleeps there willingly.",
      "There is a sealed letter behind the bar, addressed to no one, that the keeper has been told to give to 'whoever asks for it correctly.'",
      "A guest from years ago left a coat behind. It has not been touched. The keeper says they will return for it. The dust on it is fresh.",
      "The lantern by the door cannot be extinguished, no matter what is tried. It is lit at sunset whether or not anyone has lit it.",
      "A small voice has been heard in the cellar — calm, conversational, not at all in distress. The keeper goes down each evening, and comes up looking the same.",
      "There is a knock at the door each night at a different hour. The keeper does not answer it, and the knocking eventually stops.",
      "A guest at the long table is eating a meal that is not on tonight's menu. No one will admit to having served it to them.",
    ],
    patronActivities: [
      "keeps glancing at you in a way that suggests they know things you have not told them",
      "is reading a book whose title is not visible from any angle",
      "asks the keeper for 'the usual' — and is brought something different every time, which always seems correct",
      "is having a conversation with someone who is not, by any reasonable measure, sitting at their table",
      "is writing a letter, with great concentration, in a language you cannot identify",
      "drinks from a cup that does not appear to empty",
      "is waiting, has been waiting all evening, and gives no indication of how much longer they intend to wait",
      "occasionally answers questions you have not asked aloud",
      "wears clothing of a style that has been out of fashion for a hundred years, but does not appear old",
      "asked the keeper a question on arrival, in a low voice, and was given a key to a room that is not on the rota",
      "sits at the table you sat at last time you were here. You have never been here before.",
      "is drinking a toast — to no one, slowly, repeatedly, and entirely sincerely",
    ],
  },
};

const TONE_LIST = ["any", "cozy", "grim", "mysterious"];
const TONE_LABELS = {
  any: "Any",
  cozy: "Cozy",
  grim: "Grim",
  mysterious: "Mysterious",
};

// Pulls a tone-specific pool, falling back to the original defaults if tone is "any"
function getTonePool(tone, poolName) {
  if (tone && tone !== "any" && TONES[tone]?.[poolName]) {
    return TONES[tone][poolName];
  }
  const defaults = {
    keeperDemeanors: KEEPER_DEMEANORS,
    keeperSecrets: KEEPER_SECRETS,
    keeperWants: KEEPER_WANTS,
    quirks: QUIRKS,
    troubles: TROUBLES,
    patronActivities: PATRON_ACTIVITIES,
  };
  return defaults[poolName];
}

// ============================================================
// HELPERS
// ============================================================

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  const copy = [...arr];
  const out = [];
  for (let i = 0; i < n && copy.length; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return out;
}

function generateName(region) {
  const a = getPool(region, "nameAdj");
  const b = getPool(region, "nameBeast");
  const o = getPool(region, "nameObject");
  const p = getPool(region, "namePerson");
  const pl = getPool(region, "namePlace");
  const patterns = [
    () => `The ${pick(a)} ${pick(b)}`,
    () => `The ${pick(b)} & ${pick(o)}`,
    () => `The ${pick(a)} ${pick(o)}`,
    () => `${pick(p)}'s ${pick(pl)}`,
    () => `The ${pick(b)}'s ${pick(o)}`,
  ];
  return pick(patterns)();
}

function generateInnkeeper(region, tone) {
  return {
    name: pick(getPool(region, "keeperNames")),
    race: pick(RACES),
    demeanor: pick(getTonePool(tone, "keeperDemeanors")),
    wants: pick(getTonePool(tone, "keeperWants")),
    secret: pick(getTonePool(tone, "keeperSecrets")),
  };
}

function generateStaff() {
  const count = Math.random() < 0.4 ? 1 : 2;
  return pickN(STAFF_ROLES, count).map(([role, traits]) => ({
    role,
    trait: pick(traits),
  }));
}

function generatePatrons(region, tone) {
  const count = 2 + (Math.random() < 0.5 ? 1 : 0);
  const names = pickN(getPool(region, "patronNames"), count);
  const activities = pickN(getTonePool(tone, "patronActivities"), count);
  return names.map((name, i) => ({
    name,
    activity: activities[i],
  }));
}

function generateMenu(region) {
  return {
    food: pickN(getPool(region, "foods"), 3 + (Math.random() < 0.5 ? 1 : 0)),
    drink: pickN(getPool(region, "drinks"), 3),
  };
}

function generateRooms() {
  return pickN(ROOM_OPTIONS, 2 + (Math.random() < 0.5 ? 1 : 0));
}

function generateAll(locks = {}, current = {}, region = "any", tone = "any") {
  return {
    name: locks.name ? current.name : generateName(region),
    type: locks.type ? current.type : pick(getPool(region, "types")),
    exterior: locks.exterior ? current.exterior : pick(getPool(region, "exteriors")),
    openingLine: locks.exterior ? current.openingLine : pick(OPENING_LINES),
    keeper: locks.keeper ? current.keeper : generateInnkeeper(region, tone),
    staff: locks.staff ? current.staff : generateStaff(),
    patrons: locks.patrons ? current.patrons : generatePatrons(region, tone),
    menu: locks.menu ? current.menu : generateMenu(region),
    rooms: locks.rooms ? current.rooms : generateRooms(),
    rumors: locks.rumors ? current.rumors : pickN(getPool(region, "rumors"), 3),
    quirk: locks.quirk ? current.quirk : pick(getTonePool(tone, "quirks")),
    trouble: locks.trouble ? current.trouble : pick(getTonePool(tone, "troubles")),
    floorPlan: locks.floorPlan ? current.floorPlan : pick(FLOORPLAN_VARIANTS),
  };
}

// ============================================================
// UI
// ============================================================

function SectionHeader({ label, locked, onLock, onReroll }) {
  return (
    <div className="flex items-baseline justify-between mb-3 pb-2 border-b border-[#1a1410]/15">
      <h2 className="text-[14px] tracking-[0.25em] uppercase text-[#6B1F2D] font-semibold" style={{ fontFamily: '"IM Fell English SC", "EB Garamond", serif' }}>
        {label}
      </h2>
      <div className="flex gap-1">
        <button
          onClick={onLock}
          className={`p-1.5 rounded transition-colors ${locked ? "bg-[#1a1410]/5" : "hover:bg-[#1a1410]/5"}`}
          title={locked ? "Unlock — will reroll" : "Lock — keep on reroll"}
          aria-label={locked ? "Unlock section" : "Lock section"}
        >
          {locked
            ? <Lock size={17} className="text-[#6B1F2D]" />
            : <LockOpen size={17} className="text-[#6B1F2D]" />}
        </button>
        <button
          onClick={onReroll}
          className="p-1.5 hover:bg-[#1a1410]/5 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={locked}
          title="Reroll just this section"
          aria-label="Reroll section"
        >
          <Dice5 size={17} className="text-[#6B1F2D]" />
        </button>
      </div>
    </div>
  );
}

function formatCoin(n, denom) {
  return `${n} ${denom}`;
}

function toMarkdown(inn) {
  const lines = [];
  lines.push(`# ${inn.name}`);
  lines.push(`*${inn.type}*`);
  lines.push("");
  if (inn.openingLine) lines.push(`*${inn.openingLine}*`);
  lines.push(`> ${inn.exterior}`);
  lines.push("");
  lines.push(`**The Keeper** — ${inn.keeper.name} (${inn.keeper.race}), ${inn.keeper.demeanor}.`);
  if (inn.keeper.wants) lines.push(`*Wants:* ${inn.keeper.wants}.`);
  lines.push(`*Secret:* ${inn.keeper.secret}.`);
  lines.push("");
  if (inn.staff.length) {
    lines.push(`**Staff**`);
    inn.staff.forEach(s => lines.push(`- ${s.role}, ${s.trait}`));
    lines.push("");
  }
  lines.push(`**In the common room tonight**`);
  inn.patrons.forEach(p => lines.push(`- ${p.name}, who ${p.activity}`));
  lines.push("");
  lines.push(`**Bill of fare**`);
  inn.menu.food.forEach(([n, p, d]) => lines.push(`- ${n} — ${p} ${d}`));
  inn.menu.drink.forEach(([n, p, d]) => lines.push(`- ${n} — ${p} ${d}`));
  lines.push("");
  lines.push(`**Lodging**`);
  inn.rooms.forEach(([n, p, d]) => lines.push(`- ${n} — ${p} ${d} per night`));
  lines.push("");
  lines.push(`**Rumors overheard**`);
  inn.rumors.forEach(r => lines.push(`- ${r}`));
  lines.push("");
  lines.push(`**A peculiarity:** ${inn.quirk}`);
  lines.push("");
  lines.push(`**Something's off:** ${inn.trouble}`);
  return lines.join("\n");
}

function HeraldicMark({ seed }) {
  // Picks one of 6 simple SVG marks based on name length, for a touch of variety
  const i = (seed?.length || 0) % 6;
  const marks = [
    // tankard
    <path key="t" d="M8 6h12v18a4 4 0 01-4 4h-4a4 4 0 01-4-4V6zm12 4h3a2 2 0 012 2v6a2 2 0 01-2 2h-3" fill="none" strokeWidth="1.5" />,
    // key
    <g key="k"><circle cx="10" cy="14" r="5" fill="none" strokeWidth="1.5" /><path d="M15 14h12M22 14v4M27 14v3" fill="none" strokeWidth="1.5" /></g>,
    // antlers
    <path key="a" d="M16 28V14m0 0c-2-3-5-3-7-1m7 1c2-3 5-3 7-1m-12 0c-1-2-3-2-4-1m9-1c-1-3-3-4-5-3m11 4c1-2 3-2 4-1m-9-1c1-3 3-4 5-3" fill="none" strokeWidth="1.5" />,
    // bell
    <path key="b" d="M16 6c-5 0-8 4-8 9v8H8l-2 3h20l-2-3h0v-8c0-5-3-9-8-9zm-1 22a1 1 0 002 0" fill="none" strokeWidth="1.5" />,
    // lantern
    <path key="l" d="M16 4v3m-5 0h10m-9 0v3a3 3 0 003 3h4a3 3 0 003-3v-3m-11 6v12a2 2 0 002 2h8a2 2 0 002-2V13" fill="none" strokeWidth="1.5" />,
    // anchor / sickle hybrid for variety
    <path key="s" d="M8 10c4-6 12-6 16 0M16 8v18m-6-4a6 6 0 0012 0" fill="none" strokeWidth="1.5" />,
  ];
  return (
    <svg viewBox="0 0 32 32" className="w-10 h-10 stroke-[#6B1F2D]">
      {marks[i]}
    </svg>
  );
}

// ============================================================
// FLOOR PLAN
// ============================================================

const INK = "#1a1410";
const ACCENT = "#6B1F2D";

function CompassRose({ x, y }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="0" cy="0" r="4.5" stroke={ACCENT} strokeWidth="0.5" fill="none" />
      <line x1="0" y1="-4.5" x2="0" y2="4.5" stroke={ACCENT} strokeWidth="0.4" />
      <line x1="-4.5" y1="0" x2="4.5" y2="0" stroke={ACCENT} strokeWidth="0.4" />
      <path d="M 0 -4.5 L -1.3 -1.5 L 0 -2.5 L 1.3 -1.5 Z" fill={ACCENT} />
      <text x="0" y="-6" fontSize="3" textAnchor="middle" fill={ACCENT}
            style={{ fontFamily: '"IM Fell English SC", serif' }}>N</text>
    </g>
  );
}

function ScaleBar({ x, y }) {
  return (
    <g transform={`translate(${x}, ${y})`} opacity="0.55">
      <line x1="0" y1="0" x2="24" y2="0" stroke={INK} strokeWidth="0.5" />
      <line x1="0" y1="-1.4" x2="0" y2="1.4" stroke={INK} strokeWidth="0.5" />
      <line x1="12" y1="-1" x2="12" y2="1" stroke={INK} strokeWidth="0.4" />
      <line x1="24" y1="-1.4" x2="24" y2="1.4" stroke={INK} strokeWidth="0.5" />
      <text x="27" y="1.2" fontSize="2.5" fill={INK}
            style={{ fontFamily: '"IM Fell English", serif' }}>10 paces</text>
    </g>
  );
}

function Table({ cx, cy, r = 4 }) {
  return (
    <g stroke={INK} strokeWidth="0.7" fill="none">
      <circle cx={cx} cy={cy} r={r} />
      <circle cx={cx - r - 1.8} cy={cy} r="1.1" />
      <circle cx={cx + r + 1.8} cy={cy} r="1.1" />
      <circle cx={cx} cy={cy - r - 1.8} r="1.1" />
      <circle cx={cx} cy={cy + r + 1.8} r="1.1" />
    </g>
  );
}

function Hearth({ x, y, w = 12, h = 18 }) {
  return (
    <g stroke={INK} fill="none">
      <rect x={x} y={y} width={w} height={h} strokeWidth="1" />
      <line x1={x} y1={y} x2={x+w} y2={y+h} strokeWidth="0.4" />
      <line x1={x+w} y1={y} x2={x} y2={y+h} strokeWidth="0.4" />
      <path d={`M ${x + w/2} ${y + h - 3} q -2 -4 0 -6 q 2 -2 0 -5`}
            stroke={ACCENT} strokeWidth="0.5" fill="none" />
    </g>
  );
}

function BarPiece({ x, y, w, h, stoolSide = "right" }) {
  const stoolPositions = [0.2, 0.4, 0.6, 0.8];
  const stoolX = stoolSide === "right" ? x + w + 4 : x - 4;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h}
            fill={INK} fillOpacity="0.18"
            stroke={INK} strokeWidth="0.9" />
      {stoolPositions.map((p, i) => (
        <circle key={i} cx={stoolX} cy={y + h * p} r="1.4"
                stroke={INK} strokeWidth="0.7" fill="none" />
      ))}
    </g>
  );
}

function StairsUp({ x, y, w, h }) {
  const steps = 7;
  const stepH = h / steps;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h}
            stroke={INK} strokeWidth="0.5" fill="none" />
      {Array.from({ length: steps - 1 }).map((_, i) => (
        <line key={i}
          x1={x} y1={y + stepH * (i + 1)}
          x2={x + w} y2={y + stepH * (i + 1)}
          stroke={INK} strokeWidth="0.4" />
      ))}
      <g stroke={ACCENT} strokeWidth="0.7" fill="none">
        <line x1={x + w/2} y1={y + h - 2} x2={x + w/2} y2={y + 4} />
        <path d={`M ${x + w/2 - 2} ${y + 6} L ${x + w/2} ${y + 3} L ${x + w/2 + 2} ${y + 6}`} />
      </g>
    </g>
  );
}

function FloorPlan({ variant, innName }) {
  // `variant` is a path to an image in /public.
  // Defensive: if a legacy saved inn has the old object shape, fall back to the first drawing.
  const src = typeof variant === "string" ? variant : FLOORPLAN_VARIANTS[0];
  return (
    <img
      src={src}
      alt={`Floor plan of ${innName}`}
      className="w-full h-auto block mix-blend-multiply"
    />
  );
}

export default function InnGenerator() {
  useEffect(() => {
    document.title = "Tavern Tales Creator — Nightcloak Games";
  }, []);

  const [region, setRegion] = useState("any");
  const [tone, setTone] = useState("any");
  const [inn, setInn] = useState(() => generateAll({}, {}, "any", "any"));
  const [locks, setLocks] = useState({});
  const [copied, setCopied] = useState(false);
  const [rolling, setRolling] = useState(false);

  // Saved inns ("the stable") — kept in React state.
  // To persist saves on the deployed site, replace this with localStorage:
  //   on mount: const saved = localStorage.getItem("wayfarers-stable"); if (saved) setSavedInns(JSON.parse(saved));
  //   on change: useEffect(() => localStorage.setItem("wayfarers-stable", JSON.stringify(savedInns)), [savedInns]);
  const [savedInns, setSavedInns] = useState(() => {
    try {
      const saved = localStorage.getItem("wayfarers-stable");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist saves to the browser whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("wayfarers-stable", JSON.stringify(savedInns));
    } catch {
      // localStorage full or disabled — saves will be in-session only
    }
  }, [savedInns]);
  const [stableOpen, setStableOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [pendingNote, setPendingNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const fileInputRef = useRef(null);

  const toggleLock = (key) => {
    setLocks(prev => {
      const next = { ...prev, [key]: !prev[key] };
      // The description (exterior) is now visually tied to the inn name —
      // keep their lock states in sync.
      if (key === "name") next.exterior = next.name;
      return next;
    });
  };

  const rerollSection = (key) => {
    const partial = { [key]: false };
    const fresh = generateAll(partial, {}, region, tone);
    if (key === "name") {
      // The description (exterior) is tied to the inn name — reroll it together.
      setInn(prev => ({
        ...prev,
        name: fresh.name,
        exterior: fresh.exterior,
        openingLine: fresh.openingLine,
      }));
    } else {
      setInn(prev => ({ ...prev, [key]: fresh[key] }));
    }
  };

  const rerollAll = (overrideRegion = region, overrideTone = tone) => {
    setRolling(true);
    setTimeout(() => {
      setInn(prev => generateAll(locks, prev, overrideRegion, overrideTone));
      setRolling(false);
    }, 220);
  };

  const lockAll = () => {
    const allLocked = ["name","type","exterior","keeper","staff","patrons","menu","rooms","rumors","quirk","trouble","floorPlan"]
      .every(k => locks[k]);
    if (allLocked) setLocks({});
    else {
      setLocks({
        name: true, type: true, exterior: true, keeper: true,
        staff: true, patrons: true, menu: true, rooms: true,
        rumors: true, quirk: true, trouble: true, floorPlan: true,
      });
    }
  };

  const copyEntry = async () => {
    try {
      await navigator.clipboard.writeText(toMarkdown(inn));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  // ---- Stable handlers ----

  const openSaveDialog = () => {
    setPendingNote("");
    setSaveDialogOpen(true);
  };

  const confirmSave = () => {
    const entry = {
      id: makeId(),
      savedAt: new Date().toISOString(),
      note: pendingNote.trim(),
      inn,
      region,
      tone,
    };
    setSavedInns(prev => [entry, ...prev]);
    setSaveDialogOpen(false);
    setPendingNote("");
  };

  const loadFromStable = (entry) => {
    setInn(entry.inn);
    setRegion(entry.region || "any");
    setTone(entry.tone || "any");
    // Lock all sections so the loaded inn is protected from accidental rerolls
    setLocks({
      name: true, type: true, exterior: true, keeper: true,
      staff: true, patrons: true, menu: true, rooms: true,
      rumors: true, quirk: true, trouble: true, floorPlan: true,
    });
    setStableOpen(false);
  };

  const deleteFromStable = (id) => {
    setSavedInns(prev => prev.filter(e => e.id !== id));
  };

  const updateStableNote = (id, newNote) => {
    setSavedInns(prev => prev.map(e =>
      e.id === id ? { ...e, note: newNote } : e
    ));
  };

  const exportStable = () => {
    if (savedInns.length === 0) return;
    const data = JSON.stringify(savedInns, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wayfarers-codex-saved-inns-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const imported = JSON.parse(evt.target.result);
        if (Array.isArray(imported)) {
          // Regenerate IDs so imported items don't conflict with existing
          const fresh = imported
            .filter(item => item && item.inn) // basic shape check
            .map(item => ({ ...item, id: makeId() }));
          setSavedInns(prev => [...fresh, ...prev]);
        }
      } catch (err) {
        console.error("Import failed:", err);
      }
      e.target.value = ""; // reset input so the same file can be re-imported
    };
    reader.readAsText(file);
  };

  // Check if the currently-displayed inn matches a saved entry (by full content)
  const isPinned = useMemo(() => {
    return savedInns.some(e =>
      e.inn?.name === inn.name &&
      e.inn?.keeper?.name === inn.keeper?.name &&
      e.inn?.exterior === inn.exterior
    );
  }, [savedInns, inn]);

  const lockedCount = Object.values(locks).filter(Boolean).length;
  const allLocked = lockedCount === 12;

  return (
    <div className="min-h-screen w-full bg-[#F3F0E8] text-[#1a1410] py-8 px-4 md:px-8" style={{ fontFamily: '"EB Garamond", Georgia, serif' }}>
      <div className="max-w-6xl mx-auto">

        {/* Top bar — title and explainer on the left, Nightcloak Games credit on the right */}
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-xl text-[#1a1410]/70">
            <div
              className="text-[20px] tracking-wide"
              style={{ fontFamily: '"IM Fell English", "EB Garamond", serif' }}
            >
              Tavern Tales Creator
            </div>
            <p
              className="mt-2 text-[16px] leading-relaxed italic text-[#1a1410]/65"
              style={{ fontFamily: '"IM Fell English", "EB Garamond", serif' }}
            >
              Click Roll New Entry for a complete tavern — keeper, staff, patrons, menu, rumors, and floor plan. Region and Tone shape the flavor. Lock any section to keep it, then roll again for the rest.
            </p>
          </div>

          {/* Powered by Nightcloak Games — top-right credit, links to studio site */}
          <a
            href="https://nightcloakgames.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex flex-col items-center group"
            aria-label="Powered by Nightcloak Games"
          >
            <span
              className="text-[10px] tracking-[0.25em] uppercase text-[#1a1410]/40 mb-2 group-hover:text-[#1a1410]/70 transition-colors"
              style={{ fontFamily: '"IM Fell English SC", "EB Garamond", serif' }}
            >
              Powered by
            </span>
            <img
              src="/nightcloak-logo.png"
              alt="Nightcloak Games"
              className="h-20 w-auto opacity-90 group-hover:opacity-100 transition-opacity mix-blend-multiply"
            />
          </a>
        </div>

        {/* Hairline divider between branding and controls */}
        <div className="border-t border-[#1a1410]/15 my-10" />

        {/* Controls zone — Region / Tone / Roll button, centered */}
        <div className="flex flex-col items-center gap-2 mb-6">

          {/* Region selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#1a1410] mr-2 w-14 text-right">Region</span>
            {REGION_LIST.map(r => (
              <button
                key={r}
                onClick={() => { setRegion(r); rerollAll(r, tone); }}
                className={`px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase border transition-all duration-150 ${
                  region === r
                    ? "bg-[#6B1F2D] border-[#3d1219] text-[#F3F0E8]"
                    : "bg-[#1a1410]/[0.04] border-[#1a1410]/20 text-[#1a1410]/70 hover:bg-[#1a1410]/10 hover:border-[#1a1410]/40 hover:text-[#1a1410]"
                }`}
                style={{
                  fontFamily: '"IM Fell English SC", serif',
                  boxShadow: region === r
                    ? "inset 0 2px 5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(107, 31, 45, 0.4)"
                    : "0 1px 0 rgba(0, 0, 0, 0.08)",
                }}
                aria-pressed={region === r}
              >
                {REGION_LABELS[r]}
              </button>
            ))}
          </div>

          {/* Tone selector */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#1a1410] mr-2 w-14 text-right">Tone</span>
            {TONE_LIST.map(t => (
              <button
                key={t}
                onClick={() => { setTone(t); rerollAll(region, t); }}
                className={`px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase border transition-all duration-150 ${
                  tone === t
                    ? "bg-[#6B1F2D] border-[#3d1219] text-[#F3F0E8]"
                    : "bg-[#1a1410]/[0.04] border-[#1a1410]/20 text-[#1a1410]/70 hover:bg-[#1a1410]/10 hover:border-[#1a1410]/40 hover:text-[#1a1410]"
                }`}
                style={{
                  fontFamily: '"IM Fell English SC", serif',
                  boxShadow: tone === t
                    ? "inset 0 2px 5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(107, 31, 45, 0.4)"
                    : "0 1px 0 rgba(0, 0, 0, 0.08)",
                }}
                aria-pressed={tone === t}
              >
                {TONE_LABELS[t]}
              </button>
            ))}
          </div>

          {/* Primary roll button — applies current Region + Tone */}
          <button
            onClick={rerollAll}
            className="mt-2 px-10 py-4 bg-[#6B1F2D] text-[#F3F0E8] hover:bg-[#5a1825] transition-colors flex items-center gap-3 text-[13px] tracking-[0.3em] uppercase shadow-md shadow-[#6B1F2D]/30"
            style={{ fontFamily: '"IM Fell English SC", serif' }}
          >
            <Dice5 size={18} />
            Roll New Entry
          </button>
        </div>

        {/* The codex content */}
        <div
          className={`relative text-[#1a1410] transition-opacity duration-200 ${rolling ? "opacity-40" : "opacity-100"}`}
        >
          <div className="relative py-4 md:py-6">

            {/* Hero — name */}
            <div className="flex items-start gap-5 mb-6">
              <div className="flex-1 min-w-0">
                <h1
                  className="text-3xl md:text-5xl leading-tight text-[#1a1410]"
                  style={{ fontFamily: '"IM Fell English SC", "EB Garamond", serif', fontWeight: 400 }}
                >
                  {inn.name}
                </h1>
                <p
                  className="text-base md:text-lg leading-relaxed italic text-[#1a1410]/75 mt-2"
                  style={{ fontFamily: '"IM Fell English", "EB Garamond", serif' }}
                >
                  {inn.exterior}
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => toggleLock("name")}
                  className={`p-1.5 rounded transition-colors ${locks.name ? "bg-[#1a1410]/5" : "hover:bg-[#1a1410]/5"}`}
                  aria-label="Lock name"
                >
                  {locks.name
                    ? <Lock size={14} className="text-[#6B1F2D]" />
                    : <LockOpen size={14} className="text-[#6B1F2D]" />}
                </button>
                <button
                  onClick={() => rerollSection("name")}
                  className="p-1.5 hover:bg-[#1a1410]/5 rounded transition-colors disabled:opacity-30"
                  disabled={locks.name}
                  aria-label="Reroll name"
                >
                  <Dice5 size={14} className="text-[#6B1F2D]" />
                </button>
              </div>
            </div>

            {/* Two-column body */}
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">

              {/* The keeper */}
              <div>
                <SectionHeader
                  label="The Keeper"
                  locked={locks.keeper}
                  onLock={() => toggleLock("keeper")}
                  onReroll={() => rerollSection("keeper")}
                />
                <p className="text-lg leading-relaxed">
                  <span className="font-semibold">{inn.keeper.name}</span>
                  <span className="text-[#1a1410]/60"> · {inn.keeper.race}</span>
                </p>
                <p className="text-lg leading-relaxed mt-1">
                  {capitalize(inn.keeper.demeanor)}.
                </p>
                <p className="text-lg leading-relaxed mt-3 text-[#1a1410]/80">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#6B1F2D]">Wants · </span>
                  {capitalize(inn.keeper.wants)}.
                </p>
                <p className="text-lg leading-relaxed mt-2 text-[#1a1410]/75 italic">
                  <span className="text-[10px] tracking-[0.2em] uppercase not-italic text-[#6B1F2D]">Secret · </span>
                  {capitalize(inn.keeper.secret)}.
                </p>
              </div>

              {/* Floor plan */}
              <div>
                <SectionHeader
                  label="Plan of the House"
                  locked={locks.floorPlan}
                  onLock={() => toggleLock("floorPlan")}
                  onReroll={() => rerollSection("floorPlan")}
                />
                <div className="bg-[#1a1410]/[0.015] border border-[#1a1410]/10 px-3 py-4 md:px-4 md:py-4">
                  <FloorPlan variant={inn.floorPlan} innName={inn.name} />
                </div>
                <p className="text-[11px] text-[#1a1410]/45 mt-2 italic"
                   style={{ fontFamily: '"IM Fell English", serif' }}>
                  From the wayfarer's sketchbook.
                </p>
              </div>

              {/* Staff */}
              <div>
                <SectionHeader
                  label="The House &amp; Staff"
                  locked={locks.staff}
                  onLock={() => toggleLock("staff")}
                  onReroll={() => rerollSection("staff")}
                />
                <ul className="space-y-2 text-lg leading-relaxed">
                  {inn.staff.map((s, i) => (
                    <li key={i}>
                      <span className="font-medium">{capitalize(s.role)}</span>, {s.trait}.
                    </li>
                  ))}
                </ul>
              </div>

              {/* Patrons */}
              <div>
                <SectionHeader
                  label="In the Common Room Tonight"
                  locked={locks.patrons}
                  onLock={() => toggleLock("patrons")}
                  onReroll={() => rerollSection("patrons")}
                />
                <ul className="space-y-2 text-lg leading-relaxed">
                  {inn.patrons.map((p, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-[#6B1F2D] mt-0.5">·</span>
                      <span><span className="font-medium">{capitalize(p.name)}</span>, who {p.activity}.</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bill of fare */}
              <div>
                <SectionHeader
                  label="Bill of Fare"
                  locked={locks.menu}
                  onLock={() => toggleLock("menu")}
                  onReroll={() => rerollSection("menu")}
                />
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#1a1410] mb-1.5">Board</div>
                <ul className="text-lg leading-relaxed mb-3">
                  {inn.menu.food.map(([name, p, d], i) => (
                    <li key={i} className="flex justify-between gap-3 py-0.5">
                      <span>{name}</span>
                      <span className="text-[#1a1410]/60 whitespace-nowrap" style={{ fontFamily: '"EB Garamond", serif' }}>{formatCoin(p, d)}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#1a1410] mb-1.5">Cellar</div>
                <ul className="text-lg leading-relaxed">
                  {inn.menu.drink.map(([name, p, d], i) => (
                    <li key={i} className="flex justify-between gap-3 py-0.5">
                      <span>{name}</span>
                      <span className="text-[#1a1410]/60 whitespace-nowrap" style={{ fontFamily: '"EB Garamond", serif' }}>{formatCoin(p, d)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lodging */}
              <div>
                <SectionHeader
                  label="Rooms for the Night"
                  locked={locks.rooms}
                  onLock={() => toggleLock("rooms")}
                  onReroll={() => rerollSection("rooms")}
                />
                <ul className="text-lg leading-relaxed">
                  {inn.rooms.map(([name, p, d], i) => (
                    <li key={i} className="flex justify-between gap-3 py-1 border-b border-[#1a1410]/8 last:border-0">
                      <span>{name}</span>
                      <span className="text-[#1a1410]/60 whitespace-nowrap" style={{ fontFamily: '"EB Garamond", serif' }}>{formatCoin(p, d)}<span className="text-[#1a1410]/40 text-[12px]"> /night</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rumors */}
            <div className="mt-10">
              <SectionHeader
                label="Rumors Overheard"
                locked={locks.rumors}
                onLock={() => toggleLock("rumors")}
                onReroll={() => rerollSection("rumors")}
              />
              <ol className="space-y-3 text-lg leading-relaxed">
                {inn.rumors.map((r, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="text-[#6B1F2D] shrink-0 w-6 text-right"
                      style={{ fontFamily: '"IM Fell English SC", serif' }}
                    >
                      {toRoman(i + 1)}.
                    </span>
                    <span className="italic" style={{ fontFamily: '"IM Fell English", "EB Garamond", serif' }}>
                      "{r}"
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Quirk & trouble */}
            <div className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-8">
              <div>
                <SectionHeader
                  label="A Peculiarity"
                  locked={locks.quirk}
                  onLock={() => toggleLock("quirk")}
                  onReroll={() => rerollSection("quirk")}
                />
                <p className="text-lg leading-relaxed">{inn.quirk}</p>
              </div>
              <div>
                <SectionHeader
                  label="Something's Off"
                  locked={locks.trouble}
                  onLock={() => toggleLock("trouble")}
                  onReroll={() => rerollSection("trouble")}
                />
                <p className="text-lg leading-relaxed">{inn.trouble}</p>
              </div>
            </div>

            {/* Page footer */}
            <div className="mt-12 pt-4 border-t border-[#1a1410]/15 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#1a1410]/40">
              <span>Entry · {hashId(inn.name)}</span>
              <span>{lockedCount > 0 ? `${lockedCount} locked` : "—"}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={rerollAll}
            className="px-5 py-3 bg-[#6B1F2D] text-[#F3F0E8] hover:bg-[#5a1825] transition-colors flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase"
            style={{ fontFamily: '"IM Fell English SC", serif' }}
          >
            <Dice5 size={15} />
            New Entry
          </button>
          <button
            onClick={lockAll}
            className="px-4 py-3 border border-[#1a1410]/25 text-[#1a1410]/80 hover:bg-[#1a1410]/5 hover:border-[#1a1410]/45 transition-colors flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase"
            style={{ fontFamily: '"IM Fell English SC", serif' }}
          >
            {allLocked ? <LockOpen size={13} /> : <Lock size={13} />}
            {allLocked ? "Unlock all" : "Lock all"}
          </button>
          <button
            onClick={openSaveDialog}
            disabled={isPinned}
            className={`px-4 py-3 border flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase transition-colors ${
              isPinned
                ? "border-[#1a1410]/12 text-[#1a1410]/35 cursor-default"
                : "border-[#1a1410]/25 text-[#1a1410]/80 hover:bg-[#1a1410]/5 hover:border-[#1a1410]/45"
            }`}
            style={{ fontFamily: '"IM Fell English SC", serif' }}
            title={isPinned ? "Already saved" : "Save this inn"}
          >
            {isPinned ? <Check size={13} /> : <BookmarkPlus size={13} />}
            {isPinned ? "Saved" : "Save Inn"}
          </button>
          <button
            onClick={() => setStableOpen(true)}
            className="px-4 py-3 border border-[#1a1410]/25 text-[#1a1410]/80 hover:bg-[#1a1410]/5 hover:border-[#1a1410]/45 transition-colors flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase"
            style={{ fontFamily: '"IM Fell English SC", serif' }}
            title="Browse and load saved inns"
          >
            <Bookmark size={13} />
            Load Inn ({savedInns.length})
          </button>
          <button
            onClick={copyEntry}
            className="px-4 py-3 border border-[#1a1410]/25 text-[#1a1410]/80 hover:bg-[#1a1410]/5 hover:border-[#1a1410]/45 transition-colors flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase"
            style={{ fontFamily: '"IM Fell English SC", serif' }}
            title="Copy this inn to paste into Notion, Obsidian, or any notes app"
          >
            {copied ? <Check size={13} /> : <ClipboardCopy size={13} />}
            {copied ? "Copied" : "Copy for Notes"}
          </button>
        </div>

        <p className="mt-8 text-center text-[10px] tracking-[0.25em] uppercase text-[#1a1410]/35">
          Lock a section to keep it · Roll again for the rest
        </p>

        {/* Hidden file input for import */}
        <input
          type="file"
          accept=".json,application/json"
          ref={fileInputRef}
          onChange={handleImport}
          style={{ display: "none" }}
        />

        {/* Save Dialog */}
        {saveDialogOpen && (
          <div
            className="fixed inset-0 bg-[#1a1410]/85 z-50 flex items-center justify-center p-4"
            onClick={() => setSaveDialogOpen(false)}
          >
            <div
              className="bg-[#F3F0E8] text-[#1a1410] max-w-md w-full p-6 md:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundImage: "radial-gradient(ellipse at top, rgba(184,146,74,0.08), transparent 60%)",
              }}
            >
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#6B1F2D] mb-2"
                   style={{ fontFamily: '"IM Fell English SC", serif' }}>
                Save this inn
              </div>
              <div className="text-2xl mb-1 leading-tight"
                   style={{ fontFamily: '"IM Fell English SC", serif' }}>
                {inn.name}
              </div>
              <div className="text-[12px] text-[#1a1410]/55 mb-5">
                {inn.type} · {region !== "any" ? REGION_LABELS[region] : "Any region"} · {tone !== "any" ? TONE_LABELS[tone] : "Any tone"}
              </div>

              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#1a1410]/60 mb-2"
                     style={{ fontFamily: '"IM Fell English SC", serif' }}>
                Add a note (optional)
              </label>
              <input
                type="text"
                value={pendingNote}
                onChange={(e) => setPendingNote(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") confirmSave(); }}
                placeholder="for session 4 — the cult inn"
                autoFocus
                maxLength={120}
                className="w-full bg-transparent border border-[#1a1410]/25 px-3 py-2 text-[14px] focus:outline-none focus:border-[#6B1F2D] mb-6"
                style={{ fontFamily: '"EB Garamond", serif' }}
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setSaveDialogOpen(false)}
                  className="px-4 py-2 text-[11px] tracking-[0.2em] uppercase text-[#1a1410]/60 hover:text-[#1a1410] transition-colors"
                  style={{ fontFamily: '"IM Fell English SC", serif' }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSave}
                  className="px-5 py-2 bg-[#6B1F2D] text-[#F3F0E8] hover:bg-[#5a1825] transition-colors text-[11px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: '"IM Fell English SC", serif' }}
                >
                  Save Inn
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stable Panel */}
        {stableOpen && (
          <div
            className="fixed inset-0 bg-[#1a1410]/85 z-40 flex items-start justify-center p-4 overflow-y-auto"
            onClick={() => setStableOpen(false)}
          >
            <div
              className="bg-[#F3F0E8] text-[#1a1410] max-w-3xl w-full my-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundImage: "radial-gradient(ellipse at top, rgba(184,146,74,0.08), transparent 60%)",
              }}
            >
              {/* Header */}
              <div className="flex items-baseline justify-between p-6 md:p-8 pb-4 border-b border-[#1a1410]/15">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#6B1F2D]"
                       style={{ fontFamily: '"IM Fell English SC", serif' }}>
                    Saved Inns
                  </div>
                  <div className="text-[12px] text-[#1a1410]/55 mt-1">
                    {savedInns.length === 0
                      ? "Empty"
                      : `${savedInns.length} inn${savedInns.length === 1 ? "" : "s"} kept`}
                  </div>
                </div>
                <button
                  onClick={() => setStableOpen(false)}
                  className="p-2 hover:bg-[#1a1410]/5 rounded transition-colors"
                  aria-label="Close saved inns"
                >
                  <X size={18} className="text-[#1a1410]/60" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 pt-5">
                {savedInns.length === 0 ? (
                  <div className="text-center py-8 text-[#1a1410]/55 text-[14px] italic"
                       style={{ fontFamily: '"IM Fell English", serif' }}>
                    No inns saved yet. Save the ones you'd like to keep for later.
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {savedInns.map((entry) => (
                      <li key={entry.id}
                          className="border border-[#1a1410]/12 hover:border-[#1a1410]/25 transition-colors p-4 md:p-5">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="text-xl leading-tight mb-1"
                                 style={{ fontFamily: '"IM Fell English SC", serif' }}>
                              {entry.inn.name}
                            </div>
                            <div className="text-[11px] text-[#1a1410]/55 tracking-wide">
                              {entry.inn.type}
                              {entry.region && entry.region !== "any" && ` · ${REGION_LABELS[entry.region]}`}
                              {entry.tone && entry.tone !== "any" && ` · ${TONE_LABELS[entry.tone]}`}
                              {" · "}
                              {formatSaveDate(entry.savedAt)}
                            </div>
                          </div>
                          <button
                            onClick={() => deleteFromStable(entry.id)}
                            className="p-1.5 text-[#1a1410]/40 hover:text-[#6B1F2D] hover:bg-[#1a1410]/5 rounded transition-colors shrink-0"
                            aria-label="Delete saved inn"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {/* Editable note */}
                        <div className="mt-2 mb-3">
                          {editingNoteId === entry.id ? (
                            <input
                              type="text"
                              defaultValue={entry.note}
                              autoFocus
                              maxLength={120}
                              onBlur={(e) => {
                                updateStableNote(entry.id, e.target.value.trim());
                                setEditingNoteId(null);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") e.currentTarget.blur();
                                if (e.key === "Escape") setEditingNoteId(null);
                              }}
                              className="w-full bg-transparent border-b border-[#6B1F2D]/40 px-1 py-0.5 text-[13px] focus:outline-none italic"
                              style={{ fontFamily: '"IM Fell English", serif' }}
                            />
                          ) : (
                            <button
                              onClick={() => setEditingNoteId(entry.id)}
                              className="text-[13px] italic text-[#1a1410]/70 hover:text-[#1a1410] flex items-center gap-1.5 group text-left"
                              style={{ fontFamily: '"IM Fell English", serif' }}
                            >
                              <span>{entry.note || "Add a note…"}</span>
                              <Pencil size={10} className="text-[#1a1410]/30 group-hover:text-[#1a1410]/60 shrink-0" />
                            </button>
                          )}
                        </div>

                        {/* Action */}
                        <div className="flex justify-end">
                          <button
                            onClick={() => loadFromStable(entry)}
                            className="px-3 py-1.5 border border-[#6B1F2D]/40 text-[#6B1F2D] hover:bg-[#6B1F2D] hover:text-[#F3F0E8] transition-colors text-[10px] tracking-[0.2em] uppercase"
                            style={{ fontFamily: '"IM Fell English SC", serif' }}
                          >
                            Load this inn
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer: import / export */}
              <div className="flex flex-wrap justify-between items-center gap-3 p-6 md:p-8 pt-4 border-t border-[#1a1410]/15">
                <p className="text-[10px] text-[#1a1410]/45 italic"
                   style={{ fontFamily: '"IM Fell English", serif' }}>
                  Stored in your browser only. Export to keep a backup.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 border border-[#1a1410]/25 text-[#1a1410]/70 hover:bg-[#1a1410]/5 transition-colors flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase"
                    style={{ fontFamily: '"IM Fell English SC", serif' }}
                  >
                    <Upload size={11} />
                    Import
                  </button>
                  <button
                    onClick={exportStable}
                    disabled={savedInns.length === 0}
                    className="px-3 py-2 border border-[#1a1410]/25 text-[#1a1410]/70 hover:bg-[#1a1410]/5 transition-colors flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ fontFamily: '"IM Fell English SC", serif' }}
                  >
                    <Download size={11} />
                    Export all
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function toRoman(n) {
  const numerals = ["I","II","III","IV","V","VI","VII","VIII","IX","X"];
  return numerals[n - 1] || String(n);
}

function hashId(s) {
  if (!s) return "—";
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return "№ " + (h % 9999).toString().padStart(4, "0");
}

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatSaveDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}
