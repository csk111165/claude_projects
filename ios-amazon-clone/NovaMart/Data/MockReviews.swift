import Foundation

let mockReviews: [Review] = [
    Review(
        id: "rev-1",
        productId: "prod-1",
        userName: "TechEnthusiast42",
        rating: 5,
        title: "Best iPhone Yet",
        comment: "The titanium design feels premium and the A17 Pro chip is blazing fast. Camera quality is outstanding.",
        date: "2024-01-15T10:30:00Z",
        helpful: 234
    ),

    Review(
        id: "rev-2",
        productId: "prod-1",
        userName: "CasualUser99",
        rating: 4,
        title: "Great but Expensive",
        comment: "Amazing phone with top-notch features. The only downside is the premium price tag.",
        date: "2024-01-20T14:15:00Z",
        helpful: 156
    ),

    Review(
        id: "rev-3",
        productId: "prod-1",
        userName: "PhotoPro",
        rating: 5,
        title: "Camera is Incredible",
        comment: "As a professional photographer, the 48MP camera system blows me away. Best phone camera ever.",
        date: "2024-02-01T09:45:00Z",
        helpful: 312
    ),

    Review(
        id: "rev-4",
        productId: "prod-2",
        userName: "AndroidFan2024",
        rating: 5,
        title: "Galaxy AI Changes Everything",
        comment: "The AI features are game-changing. Circle to Search and Live Translate are incredibly useful.",
        date: "2024-02-10T11:00:00Z",
        helpful: 189
    ),

    Review(
        id: "rev-5",
        productId: "prod-2",
        userName: "PowerUser",
        rating: 4,
        title: "Almost Perfect",
        comment: "Incredible display and performance. S Pen is fantastic. Battery could be slightly better.",
        date: "2024-02-15T16:30:00Z",
        helpful: 145
    ),

    Review(
        id: "rev-6",
        productId: "prod-3",
        userName: "VideoEditor_Pro",
        rating: 5,
        title: "Beast of a Machine",
        comment: "Renders 4K video like butter. M3 Max chip handles everything I throw at it. Worth every penny.",
        date: "2024-01-25T13:00:00Z",
        helpful: 445
    ),

    Review(
        id: "rev-7",
        productId: "prod-3",
        userName: "DevOps_Sarah",
        rating: 5,
        title: "Perfect Dev Machine",
        comment: "Compiles large projects in seconds. Battery lasts all day. The display is stunning for coding.",
        date: "2024-02-05T08:30:00Z",
        helpful: 367
    ),

    Review(
        id: "rev-8",
        productId: "prod-4",
        userName: "MusicLover88",
        rating: 5,
        title: "Best Headphones Period",
        comment: "The noise canceling is unreal. Sound quality is warm and detailed. So comfortable for long sessions.",
        date: "2024-01-10T15:45:00Z",
        helpful: 523
    ),

    Review(
        id: "rev-9",
        productId: "prod-4",
        userName: "FrequentFlyer",
        rating: 5,
        title: "Travel Essential",
        comment: "These headphones make long flights bearable. NC blocks out engine noise completely. 30 hour battery is real.",
        date: "2024-01-18T20:00:00Z",
        helpful: 412
    ),

    Review(
        id: "rev-10",
        productId: "prod-4",
        userName: "AudioCritic",
        rating: 4,
        title: "Excellent with Minor Gripes",
        comment: "Sound signature is excellent for most genres. I wish the ear cups folded flat like the XM4.",
        date: "2024-02-08T12:15:00Z",
        helpful: 234
    ),

    Review(
        id: "rev-11",
        productId: "prod-5",
        userName: "HomeTheaterBuff",
        rating: 5,
        title: "OLED is the Way",
        comment: "Once you go OLED, you never go back. Perfect blacks, infinite contrast. Gaming at 120Hz is smooth.",
        date: "2024-01-22T19:00:00Z",
        helpful: 567
    ),

    Review(
        id: "rev-12",
        productId: "prod-5",
        userName: "MovieNight",
        rating: 5,
        title: "Cinema Quality at Home",
        comment: "Dolby Vision content looks absolutely stunning. The a9 processor upscales everything beautifully.",
        date: "2024-02-12T21:30:00Z",
        helpful: 389
    ),

    Review(
        id: "rev-13",
        productId: "prod-6",
        userName: "StudentLife",
        rating: 5,
        title: "Perfect for College",
        comment: "Takes notes beautifully with Apple Pencil. M2 chip handles all my apps. Great for studying.",
        date: "2024-02-01T10:00:00Z",
        helpful: 234
    ),

    Review(
        id: "rev-14",
        productId: "prod-7",
        userName: "WeddingPhotog",
        rating: 5,
        title: "Wedding Photography Dream",
        comment: "The autofocus tracking is phenomenal. Eye AF never misses. 40fps burst catches every moment.",
        date: "2024-01-28T14:30:00Z",
        helpful: 178
    ),

    Review(
        id: "rev-15",
        productId: "prod-7",
        userName: "WildlifeShooter",
        rating: 5,
        title: "Best for Action Shots",
        comment: "Animal detection AF is incredible. The IBIS lets me shoot handheld in low light. Game changer.",
        date: "2024-02-18T07:45:00Z",
        helpful: 156
    ),

    Review(
        id: "rev-16",
        productId: "prod-8",
        userName: "NintendoFam",
        rating: 5,
        title: "Family Fun Machine",
        comment: "The OLED screen is gorgeous. Kids love it, parents love it. Mario Kart nights are the best.",
        date: "2024-01-05T18:00:00Z",
        helpful: 678
    ),

    Review(
        id: "rev-17",
        productId: "prod-8",
        userName: "PortableGamer",
        rating: 4,
        title: "Great Handheld, Aging Hardware",
        comment: "OLED screen is beautiful but the hardware is starting to show its age. Still tons of great games.",
        date: "2024-02-20T09:30:00Z",
        helpful: 234
    ),

    Review(
        id: "rev-18",
        productId: "prod-10",
        userName: "ClassicStyle",
        rating: 5,
        title: "Wardrobe Staple",
        comment: "Fits perfectly and the quality is outstanding. The cotton is soft yet durable. Bought 4 colors.",
        date: "2024-01-12T11:00:00Z",
        helpful: 345
    ),

    Review(
        id: "rev-19",
        productId: "prod-10",
        userName: "BusinessCasual",
        rating: 4,
        title: "Great Everyday Shirt",
        comment: "Perfect for the office. Holds up well after many washes. Slightly long in the torso for me.",
        date: "2024-02-03T08:15:00Z",
        helpful: 198
    ),

    Review(
        id: "rev-20",
        productId: "prod-11",
        userName: "MarathonRunner",
        rating: 5,
        title: "Lightest Ultraboost Ever",
        comment: "Noticeably lighter than previous versions. Energy return is amazing. Perfect for long runs.",
        date: "2024-01-30T06:00:00Z",
        helpful: 267
    ),

    Review(
        id: "rev-21",
        productId: "prod-11",
        userName: "GymRat2024",
        rating: 4,
        title: "Comfortable but Pricey",
        comment: "Super comfortable for all-day wear. The PRIMEKNIT upper is breathable. Just wish they were cheaper.",
        date: "2024-02-14T17:30:00Z",
        helpful: 145
    ),

    Review(
        id: "rev-22",
        productId: "prod-12",
        userName: "DenimHead",
        rating: 5,
        title: "The Original for a Reason",
        comment: "Nothing beats the classic 501 fit. These are the real deal. Break-in period is worth it.",
        date: "2024-01-08T13:45:00Z",
        helpful: 456
    ),

    Review(
        id: "rev-23",
        productId: "prod-12",
        userName: "VintageStyle",
        rating: 5,
        title: "Timeless Classic",
        comment: "Been wearing 501s for 20 years. Quality is still excellent. The button fly is iconic.",
        date: "2024-02-22T10:00:00Z",
        helpful: 389
    ),

    Review(
        id: "rev-24",
        productId: "prod-13",
        userName: "LuxuryLover",
        rating: 5,
        title: "Incredibly Soft",
        comment: "The cashmere quality is exceptional. So soft against the skin. Feels much more expensive than it is.",
        date: "2024-01-25T15:00:00Z",
        helpful: 234
    ),

    Review(
        id: "rev-25",
        productId: "prod-14",
        userName: "FashionForward",
        rating: 5,
        title: "Flattering on Everyone",
        comment: "The wrap silhouette is universally flattering. Silk fabric drapes beautifully. Got so many compliments.",
        date: "2024-02-06T12:30:00Z",
        helpful: 312
    ),

    Review(
        id: "rev-26",
        productId: "prod-15",
        userName: "WinterHiker",
        rating: 5,
        title: "Warmest Jacket I Own",
        comment: "Survived -20F camping trip. The 800-fill down is incredibly warm yet lightweight. Packs down small.",
        date: "2024-01-15T07:00:00Z",
        helpful: 445
    ),

    Review(
        id: "rev-27",
        productId: "prod-15",
        userName: "CityDweller",
        rating: 4,
        title: "Great for City Winters",
        comment: "Keeps me toasty during NYC winters. The DWR coating handles light snow well. Slightly puffy looking.",
        date: "2024-02-10T18:45:00Z",
        helpful: 198
    ),

    Review(
        id: "rev-28",
        productId: "prod-16",
        userName: "SneakerHead",
        rating: 5,
        title: "Icon Status",
        comment: "The leather quality on these is superb. Nothing beats the original Jordan 1. A must-have for any collection.",
        date: "2024-01-20T16:00:00Z",
        helpful: 678
    ),

    Review(
        id: "rev-29",
        productId: "prod-16",
        userName: "StreetStyle",
        rating: 5,
        title: "Goes With Everything",
        comment: "Most versatile sneaker ever made. Dress up or down. The colorway is fire. True to size.",
        date: "2024-02-25T14:00:00Z",
        helpful: 523
    ),

    Review(
        id: "rev-30",
        productId: "prod-20",
        userName: "BakerExtraordinaire",
        rating: 5,
        title: "Worth Every Penny",
        comment: "Makes baking so much easier. Powerful motor handles thick dough with ease. The attachments are game-changing.",
        date: "2024-01-18T09:00:00Z",
        helpful: 789
    ),

    Review(
        id: "rev-31",
        productId: "prod-20",
        userName: "HomeCook2024",
        rating: 5,
        title: "Kitchen Centerpiece",
        comment: "Not just functional but beautiful on the counter. The 10 speeds give perfect control. Love the tilt-head.",
        date: "2024-02-08T14:30:00Z",
        helpful: 567
    ),

    Review(
        id: "rev-32",
        productId: "prod-21",
        userName: "CleanFreak",
        rating: 5,
        title: "Laser Reveals Hidden Dirt",
        comment: "The laser feature is mind-blowing. You can see every speck of dust. Suction power is incredible.",
        date: "2024-01-22T11:15:00Z",
        helpful: 456
    ),

    Review(
        id: "rev-33",
        productId: "prod-21",
        userName: "PetOwnerLife",
        rating: 4,
        title: "Great for Pet Hair",
        comment: "Picks up pet hair like nothing else. The particle counter is satisfying. Battery could last longer.",
        date: "2024-02-15T16:00:00Z",
        helpful: 345
    ),

    Review(
        id: "rev-34",
        productId: "prod-22",
        userName: "CoffeSnob",
        rating: 4,
        title: "Quick and Convenient",
        comment: "Makes great coffee in under a minute. The crema on espresso is impressive. Pod variety could be better.",
        date: "2024-01-28T07:30:00Z",
        helpful: 234
    ),

    Review(
        id: "rev-35",
        productId: "prod-22",
        userName: "MorningPerson",
        rating: 5,
        title: "Morning Game Changer",
        comment: "30-second heat up means coffee is ready when I am. The different cup sizes are perfect. So convenient.",
        date: "2024-02-20T06:45:00Z",
        helpful: 312
    ),

    Review(
        id: "rev-36",
        productId: "prod-23",
        userName: "ChefAtHome",
        rating: 5,
        title: "Professional Quality",
        comment: "Even heat distribution is remarkable. Food releases easily from the stainless surface. Built to last forever.",
        date: "2024-01-10T13:00:00Z",
        helpful: 345
    ),

    Review(
        id: "rev-37",
        productId: "prod-24",
        userName: "SleepDeprived",
        rating: 5,
        title: "Best Sleep of My Life",
        comment: "Replaced my spring mattress and the difference is night and day. Wake up with zero back pain now.",
        date: "2024-02-01T22:00:00Z",
        helpful: 567
    ),

    Review(
        id: "rev-38",
        productId: "prod-24",
        userName: "CouplesSleeper",
        rating: 4,
        title: "Great for Couples",
        comment: "Minimal motion transfer. My partner tosses all night and I barely notice. Medium firmness is just right.",
        date: "2024-02-18T08:30:00Z",
        helpful: 389
    ),

    Review(
        id: "rev-39",
        productId: "prod-25",
        userName: "SmartHomeGuru",
        rating: 5,
        title: "Smart Home Essential",
        comment: "Sets the mood perfectly. Automation with sunrise alarm changed my mornings. Works flawlessly with HomeKit.",
        date: "2024-01-15T19:30:00Z",
        helpful: 445
    ),

    Review(
        id: "rev-40",
        productId: "prod-26",
        userName: "BusyParent",
        rating: 5,
        title: "Lifesaver for Busy Families",
        comment: "Runs while we are at work. Self-emptying base means weeks without thinking about it. Avoids kids toys.",
        date: "2024-02-05T17:00:00Z",
        helpful: 456
    ),

    Review(
        id: "rev-41",
        productId: "prod-26",
        userName: "DogDad",
        rating: 4,
        title: "Almost Perfect Robot Vacuum",
        comment: "Obstacle avoidance is impressive - no more running over dog toys. Gets stuck under low furniture occasionally.",
        date: "2024-02-22T12:00:00Z",
        helpful: 234
    ),

    Review(
        id: "rev-42",
        productId: "prod-30",
        userName: "SelfImprover",
        rating: 5,
        title: "Life Changing Book",
        comment: "The 1% better every day concept is so simple yet powerful. Completely transformed my daily routines.",
        date: "2024-01-05T10:00:00Z",
        helpful: 892
    ),

    Review(
        id: "rev-43",
        productId: "prod-30",
        userName: "BookwormPro",
        rating: 5,
        title: "Practical and Actionable",
        comment: "Unlike most self-help books, this one gives you actual tools you can use immediately. Highly recommend.",
        date: "2024-02-10T13:15:00Z",
        helpful: 678
    ),

    Review(
        id: "rev-44",
        productId: "prod-31",
        userName: "FictionFanatic",
        rating: 5,
        title: "Beautiful and Moving",
        comment: "Made me appreciate the life I have. The concept is brilliant and the writing is beautiful. Cried at the end.",
        date: "2024-01-18T21:00:00Z",
        helpful: 567
    ),

    Review(
        id: "rev-45",
        productId: "prod-31",
        userName: "BookClubPick",
        rating: 4,
        title: "Great Discussion Book",
        comment: "Our book club had the best discussion ever with this one. Thought-provoking premise. Slightly predictable ending.",
        date: "2024-02-25T15:30:00Z",
        helpful: 345
    ),

    Review(
        id: "rev-46",
        productId: "prod-32",
        userName: "MemoirReader",
        rating: 5,
        title: "Unbelievable True Story",
        comment: "If this were fiction, you would not believe it. Tara Westovers journey is incredible and inspiring.",
        date: "2024-01-22T12:00:00Z",
        helpful: 678
    ),

    Review(
        id: "rev-47",
        productId: "prod-33",
        userName: "SciFiNerd",
        rating: 5,
        title: "Better Than The Martian",
        comment: "Andy Weir outdid himself. Rocky is the best alien character ever written. Could not put it down.",
        date: "2024-01-30T22:30:00Z",
        helpful: 789
    ),

    Review(
        id: "rev-48",
        productId: "prod-33",
        userName: "SpaceGeek",
        rating: 5,
        title: "Science Done Right",
        comment: "The science feels real and accessible. The friendship at the heart of the story is wonderful. A masterpiece.",
        date: "2024-02-14T19:00:00Z",
        helpful: 567
    ),

    Review(
        id: "rev-49",
        productId: "prod-34",
        userName: "HistoryBuff",
        rating: 5,
        title: "Mind-Expanding Read",
        comment: "Changed how I think about human civilization. Every chapter has revelations. Should be required reading.",
        date: "2024-01-08T10:30:00Z",
        helpful: 789
    ),

    Review(
        id: "rev-50",
        productId: "prod-35",
        userName: "NatureLover",
        rating: 5,
        title: "Atmospheric and Beautiful",
        comment: "The marsh descriptions are so vivid you can smell the salt air. Mystery keeps you guessing until the end.",
        date: "2024-02-03T14:00:00Z",
        helpful: 567
    ),

    Review(
        id: "rev-51",
        productId: "prod-36",
        userName: "FinanceBro",
        rating: 5,
        title: "Best Finance Book Ever",
        comment: "Not about spreadsheets or formulas. Its about how we think about money. Every story teaches something valuable.",
        date: "2024-01-25T08:00:00Z",
        helpful: 456
    ),

    Review(
        id: "rev-52",
        productId: "prod-40",
        userName: "FitnessJunkie",
        rating: 5,
        title: "Best Investment in My Health",
        comment: "Lost 30 pounds in 6 months. The instructors are motivating and the auto-follow resistance is genius.",
        date: "2024-01-12T06:30:00Z",
        helpful: 678
    ),

    Review(
        id: "rev-53",
        productId: "prod-40",
        userName: "BusyExec",
        rating: 4,
        title: "Convenient Home Workout",
        comment: "No more commuting to the gym. Classes are engaging. The rotating screen is great for floor exercises.",
        date: "2024-02-08T07:00:00Z",
        helpful: 456
    ),

    Review(
        id: "rev-54",
        productId: "prod-41",
        userName: "HikerDude",
        rating: 5,
        title: "Keeps Water Ice Cold",
        comment: "24 hours later and there is still ice in my bottle. Perfect for long hikes. Durable and no condensation.",
        date: "2024-01-20T15:00:00Z",
        helpful: 345
    ),

    Review(
        id: "rev-55",
        productId: "prod-42",
        userName: "CampingKing",
        rating: 5,
        title: "Built Like a Tank",
        comment: "Kept ice for 5 days in 90 degree heat. This cooler is indestructible. Worth every penny.",
        date: "2024-02-01T11:30:00Z",
        helpful: 567
    ),

    Review(
        id: "rev-56",
        productId: "prod-43",
        userName: "UltraRunner",
        rating: 5,
        title: "Ultimate Adventure Watch",
        comment: "Solar charging means I never worry about battery. GPS accuracy is spot-on. Survived a 100-mile race.",
        date: "2024-01-28T05:00:00Z",
        helpful: 456
    ),

    Review(
        id: "rev-57",
        productId: "prod-43",
        userName: "DataDrivenAthlete",
        rating: 5,
        title: "Data Paradise",
        comment: "The training metrics are incredibly detailed. Training readiness score helps me optimize recovery. Love the maps.",
        date: "2024-02-15T18:30:00Z",
        helpful: 345
    ),

    Review(
        id: "rev-58",
        productId: "prod-44",
        userName: "BackpackerMag",
        rating: 4,
        title: "Solid Budget Tent",
        comment: "Great value for a quality tent. Setup is intuitive. Weathered a rainstorm with no leaks. Slightly heavy for ultralight.",
        date: "2024-02-10T09:00:00Z",
        helpful: 234
    ),

    Review(
        id: "rev-59",
        productId: "prod-45",
        userName: "WeekendGolfer",
        rating: 5,
        title: "Added 20 Yards",
        comment: "The carbon face is a game changer. More distance and forgiveness than my old driver. Sweet spot is huge.",
        date: "2024-01-15T14:00:00Z",
        helpful: 312
    ),

    Review(
        id: "rev-60",
        productId: "prod-50",
        userName: "HairGoals",
        rating: 5,
        title: "Salon Results at Home",
        comment: "My blowouts look professional every time. No heat damage and my hair is actually healthier. Revolutionary.",
        date: "2024-01-10T10:30:00Z",
        helpful: 678
    ),

    Review(
        id: "rev-61",
        productId: "prod-50",
        userName: "CurlyGirl",
        rating: 4,
        title: "Great for Most Hair Types",
        comment: "Works beautifully on my curly hair. Takes some practice to master the technique. Worth the learning curve.",
        date: "2024-02-18T13:00:00Z",
        helpful: 456
    ),

    Review(
        id: "rev-62",
        productId: "prod-51",
        userName: "SkincareAddict",
        rating: 5,
        title: "Luxury That Works",
        comment: "My skin has never looked better. The Miracle Broth is real - fine lines diminished in weeks. Worth the splurge.",
        date: "2024-01-25T20:00:00Z",
        helpful: 567
    ),

    Review(
        id: "rev-63",
        productId: "prod-52",
        userName: "MakeupArtist",
        rating: 5,
        title: "Perfect Everyday Lip",
        comment: "The most universally flattering nude pink. Goes with every look. Matte formula is comfortable all day.",
        date: "2024-02-05T11:00:00Z",
        helpful: 456
    ),

    Review(
        id: "rev-64",
        productId: "prod-53",
        userName: "BleachedBlonde",
        rating: 5,
        title: "Saved My Damaged Hair",
        comment: "After years of bleaching, my hair was straw. After 3 uses, it feels like virgin hair again. Miracle product.",
        date: "2024-01-18T16:30:00Z",
        helpful: 789
    ),

    Review(
        id: "rev-65",
        productId: "prod-54",
        userName: "CleanBeautyFan",
        rating: 4,
        title: "Lightweight Yet Effective",
        comment: "Absorbs quickly without greasiness. Noticed firmer skin within a month. Clean ingredients I can trust.",
        date: "2024-02-12T09:15:00Z",
        helpful: 234
    ),

    Review(
        id: "rev-66",
        productId: "prod-55",
        userName: "FragranceCollector",
        rating: 5,
        title: "Signature Scent Material",
        comment: "Dark, mysterious, and unforgettable. Gets compliments every time I wear it. Lasts 8+ hours easily.",
        date: "2024-01-30T19:00:00Z",
        helpful: 456
    ),

    Review(
        id: "rev-67",
        productId: "prod-60",
        userName: "LegoMaster",
        rating: 5,
        title: "Ultimate LEGO Experience",
        comment: "Took 3 weekends to build and loved every minute. The detail is incredible. Proudly displayed in my living room.",
        date: "2024-02-01T20:00:00Z",
        helpful: 567
    ),

    Review(
        id: "rev-68",
        productId: "prod-61",
        userName: "PS5Gamer",
        rating: 5,
        title: "Best Controller Ever Made",
        comment: "The haptic feedback adds so much immersion. Adaptive triggers in shooters feel amazing. Battery lasts long enough.",
        date: "2024-01-08T22:00:00Z",
        helpful: 678
    ),

    Review(
        id: "rev-69",
        productId: "prod-62",
        userName: "FamilyGameNight",
        rating: 4,
        title: "Fun Disney Twist",
        comment: "Kids love playing as the villains. The special abilities add a fun twist to classic Monopoly. Great family time.",
        date: "2024-02-14T19:30:00Z",
        helpful: 345
    ),

    Review(
        id: "rev-70",
        productId: "prod-65",
        userName: "ProudGrandma",
        rating: 5,
        title: "Granddaughter Loves It",
        comment: "The look on her face was priceless. The elevator and pool slide are her favorites. Assembly took 2 hours.",
        date: "2024-01-25T17:00:00Z",
        helpful: 456
    ),

    Review(
        id: "rev-71",
        productId: "prod-70",
        userName: "RoadTripper",
        rating: 5,
        title: "Better Than Phone GPS",
        comment: "Dedicated GPS is so much better than phone navigation. Large screen, no battery drain, real-time traffic works great.",
        date: "2024-01-15T12:00:00Z",
        helpful: 345
    ),

    Review(
        id: "rev-72",
        productId: "prod-71",
        userName: "DetailingNewbie",
        rating: 5,
        title: "Everything You Need",
        comment: "Perfect starter kit. Has everything from wash to wax. My car has never looked this good. Great value.",
        date: "2024-02-03T14:30:00Z",
        helpful: 456
    ),

    Review(
        id: "rev-73",
        productId: "prod-72",
        userName: "PreparedDriver",
        rating: 5,
        title: "Saved Me Twice",
        comment: "Dead battery in a parking garage - this little device started my V8 in seconds. Also charges my phone. Essential.",
        date: "2024-01-20T08:00:00Z",
        helpful: 678
    ),

    Review(
        id: "rev-74",
        productId: "prod-73",
        userName: "TruckOwner",
        rating: 5,
        title: "Quietest Tires Ever",
        comment: "Dramatic reduction in road noise. Grip in rain is confident. At 20k miles, tread shows minimal wear.",
        date: "2024-02-10T10:00:00Z",
        helpful: 456
    ),

    Review(
        id: "rev-75",
        productId: "prod-74",
        userName: "SafetyFirst",
        rating: 5,
        title: "Peace of Mind",
        comment: "4K footage caught a hit-and-run clearly. Cloud feature lets me check on my parked car. Insurance discount too.",
        date: "2024-01-28T16:00:00Z",
        helpful: 567
    ),

    Review(
        id: "rev-76",
        productId: "prod-75",
        userName: "NeatFreak",
        rating: 5,
        title: "Perfect Fit Protection",
        comment: "Laser measured fit is exact. Caught coffee spill that would have ruined carpet. Easy to remove and clean.",
        date: "2024-02-15T09:30:00Z",
        helpful: 345
    ),

    Review(
        id: "rev-77",
        productId: "prod-76",
        userName: "SkiFamily",
        rating: 5,
        title: "Road Trip Essential",
        comment: "Fits all our ski gear easily. Dual-side opening is genius. Aerodynamic design - barely notice it on the highway.",
        date: "2024-01-22T07:30:00Z",
        helpful: 234
    ),

    Review(
        id: "rev-78",
        productId: "prod-76",
        userName: "CampingFamily",
        rating: 4,
        title: "Huge Storage Space",
        comment: "18 cubic feet swallows our camping gear. SlideLock mounting is easy. Slight wind noise at highway speeds.",
        date: "2024-02-20T11:00:00Z",
        helpful: 198
    )
]
