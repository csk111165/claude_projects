import { Review } from "@/lib/types";

export const reviews: Review[] = [
  // -- prod-1 (popular product, many reviews) --------------------------
  {
    id: "rev-001",
    productId: "prod-1",
    userName: "Sarah M.",
    rating: 5,
    title: "Absolutely love it!",
    comment:
      "This exceeded all my expectations. The build quality is outstanding and it works exactly as described. I've been using it daily for three months now and it still feels brand new. Highly recommend to anyone on the fence.",
    date: "2025-04-18T14:23:00Z",
    helpful: 42,
  },
  {
    id: "rev-002",
    productId: "prod-1",
    userName: "TechGuru99",
    rating: 4,
    title: "Great product, minor nitpick",
    comment:
      "Performance is excellent across the board. My only complaint is that the packaging could have been better — arrived with a small dent on the box, though the product itself was fine. Four stars because of that shipping experience.",
    date: "2025-03-02T09:15:00Z",
    helpful: 18,
  },
  {
    id: "rev-003",
    productId: "prod-1",
    userName: "Mike",
    rating: 5,
    title: "Worth every penny",
    comment: "Best purchase I've made this year. Period.",
    date: "2025-01-27T20:45:00Z",
    helpful: 31,
  },
  {
    id: "rev-004",
    productId: "prod-1",
    userName: "User4821",
    rating: 2,
    title: "Disappointed",
    comment:
      "Maybe I got a defective unit, but mine started having issues after just two weeks. The power button sometimes doesn't respond and the finish is already showing scratches. Contacted support and waiting to hear back.",
    date: "2024-12-10T11:30:00Z",
    helpful: 9,
  },

  // -- prod-2 ----------------------------------------------------------
  {
    id: "rev-005",
    productId: "prod-2",
    userName: "Jennifer L.",
    rating: 4,
    title: "Solid choice",
    comment:
      "Does exactly what it says on the tin. Setup took about ten minutes and everything has been smooth sailing since. The companion app is surprisingly well-designed too.",
    date: "2025-02-14T16:00:00Z",
    helpful: 12,
  },
  {
    id: "rev-006",
    productId: "prod-2",
    userName: "DealHunter",
    rating: 3,
    title: "Decent but overpriced",
    comment:
      "It's a fine product but you can find comparable alternatives for half the price. If budget isn't a concern, go for it.",
    date: "2024-11-05T08:20:00Z",
    helpful: 27,
  },

  // -- prod-3 ----------------------------------------------------------
  {
    id: "rev-007",
    productId: "prod-3",
    userName: "Amanda",
    rating: 5,
    title: "Game changer for my workflow",
    comment:
      "I'm a freelance designer and this has cut my render times in half. The color accuracy is phenomenal and the ergonomics are just right. My neck and back thank me every day.",
    date: "2025-04-01T13:10:00Z",
    helpful: 38,
  },
  {
    id: "rev-008",
    productId: "prod-3",
    userName: "Chris P.",
    rating: 4,
    title: "Very good but runs warm",
    comment:
      "Love the performance. Only giving four stars because it runs noticeably warm under heavy load. Not a dealbreaker but worth mentioning.",
    date: "2025-01-15T19:50:00Z",
    helpful: 15,
  },

  // -- prod-4 ----------------------------------------------------------
  {
    id: "rev-009",
    productId: "prod-4",
    userName: "Priya K.",
    rating: 5,
    title: "Perfect gift",
    comment:
      "Bought this as a birthday gift for my partner and they absolutely loved it. The premium packaging made the unboxing experience feel special.",
    date: "2024-08-22T10:00:00Z",
    helpful: 7,
  },
  {
    id: "rev-010",
    productId: "prod-4",
    userName: "User7733",
    rating: 1,
    title: "Broke after one week",
    comment:
      "Complete waste of money. Stopped working after seven days and the return process has been a nightmare. Would give zero stars if I could. Avoid.",
    date: "2024-06-30T22:15:00Z",
    helpful: 44,
  },

  // -- prod-5 (popular) ------------------------------------------------
  {
    id: "rev-011",
    productId: "prod-5",
    userName: "Daniel R.",
    rating: 5,
    title: "Exceeded expectations",
    comment:
      "I was skeptical based on some other reviews but decided to take the plunge. So glad I did. The quality is superb and the customer service team was incredibly helpful when I had a question about setup.",
    date: "2025-03-28T07:45:00Z",
    helpful: 22,
  },
  {
    id: "rev-012",
    productId: "prod-5",
    userName: "Olivia",
    rating: 4,
    title: "Really nice design",
    comment: "Sleek, modern, and functional. Fits perfectly on my desk. Minor scuff on arrival but nothing major.",
    date: "2025-02-09T15:30:00Z",
    helpful: 6,
  },
  {
    id: "rev-013",
    productId: "prod-5",
    userName: "GadgetFan2024",
    rating: 3,
    title: "Middle of the road",
    comment:
      "It works. Nothing extraordinary, nothing terrible. If you need something reliable and don't care about bells and whistles, it'll do the job.",
    date: "2024-10-17T12:00:00Z",
    helpful: 14,
  },

  // -- prod-6 ----------------------------------------------------------
  {
    id: "rev-014",
    productId: "prod-6",
    userName: "Marcus",
    rating: 4,
    title: "Happy with the purchase",
    comment: "Good value for money. Delivery was fast and everything was well-packaged.",
    date: "2025-01-03T18:20:00Z",
    helpful: 3,
  },

  // -- prod-7 ----------------------------------------------------------
  {
    id: "rev-015",
    productId: "prod-7",
    userName: "Elena V.",
    rating: 5,
    title: "Five stars, no hesitation",
    comment:
      "I've tried several competitors and nothing comes close. The attention to detail is remarkable — from the stitching to the hardware, everything screams quality.",
    date: "2024-09-14T09:00:00Z",
    helpful: 50,
  },
  {
    id: "rev-016",
    productId: "prod-7",
    userName: "Jake",
    rating: 3,
    title: "Good not great",
    comment: "Looks fantastic but the functionality could be better. Some features feel half-baked.",
    date: "2024-07-21T14:10:00Z",
    helpful: 11,
  },

  // -- prod-8 ----------------------------------------------------------
  {
    id: "rev-017",
    productId: "prod-8",
    userName: "Rachel",
    rating: 4,
    title: "Surprisingly good",
    comment:
      "Wasn't expecting much at this price point but it really delivers. The materials feel premium and the fit is excellent.",
    date: "2025-04-10T11:45:00Z",
    helpful: 19,
  },

  // -- prod-9 ----------------------------------------------------------
  {
    id: "rev-018",
    productId: "prod-9",
    userName: "Kevin T.",
    rating: 2,
    title: "Not as advertised",
    comment:
      "The photos on the listing are misleading. The actual color is much duller and the size is smaller than I expected. Check the dimensions carefully before ordering.",
    date: "2024-11-28T17:30:00Z",
    helpful: 35,
  },

  // -- prod-10 (popular) -----------------------------------------------
  {
    id: "rev-019",
    productId: "prod-10",
    userName: "User1156",
    rating: 5,
    title: "My go-to recommendation",
    comment:
      "I've bought three of these now — one for myself and two as gifts. Every single person has loved it. The battery life is insane and it charges ridiculously fast.",
    date: "2025-03-15T08:00:00Z",
    helpful: 29,
  },
  {
    id: "rev-020",
    productId: "prod-10",
    userName: "Natalie",
    rating: 5,
    title: "Simply the best",
    comment: "No complaints whatsoever. This is the gold standard in its category.",
    date: "2025-02-20T21:10:00Z",
    helpful: 16,
  },
  {
    id: "rev-021",
    productId: "prod-10",
    userName: "Omar",
    rating: 4,
    title: "Almost perfect",
    comment:
      "Fantastic product with one small issue: the included cable is way too short. Had to buy a longer one separately. Everything else is top-notch.",
    date: "2024-12-05T13:25:00Z",
    helpful: 8,
  },

  // -- prod-11 ---------------------------------------------------------
  {
    id: "rev-022",
    productId: "prod-11",
    userName: "Hannah",
    rating: 3,
    title: "It's okay",
    comment:
      "Does the job but I've seen better at this price range. The instruction manual is practically useless — had to watch YouTube videos to figure out setup.",
    date: "2024-10-01T10:40:00Z",
    helpful: 13,
  },

  // -- prod-12 ---------------------------------------------------------
  {
    id: "rev-023",
    productId: "prod-12",
    userName: "Ben W.",
    rating: 5,
    title: "Incredible quality",
    comment:
      "The craftsmanship is second to none. You can tell a lot of thought went into the design. I use it every single day and it still looks and feels brand new after six months.",
    date: "2025-04-25T16:55:00Z",
    helpful: 21,
  },

  // -- prod-13 ---------------------------------------------------------
  {
    id: "rev-024",
    productId: "prod-13",
    userName: "Sophia",
    rating: 4,
    title: "Reliable and well-made",
    comment: "Nothing flashy but it gets the job done consistently. Exactly what I needed.",
    date: "2024-05-18T12:30:00Z",
    helpful: 5,
  },

  // -- prod-14 ---------------------------------------------------------
  {
    id: "rev-025",
    productId: "prod-14",
    userName: "Alex J.",
    rating: 1,
    title: "Total letdown",
    comment:
      "Arrived damaged, customer service was unhelpful, and the replacement took three weeks. The product itself is mediocre at best. Returning this and going with a competitor.",
    date: "2024-04-09T08:15:00Z",
    helpful: 47,
  },
  {
    id: "rev-026",
    productId: "prod-14",
    userName: "Taylor",
    rating: 4,
    title: "Pleasant surprise",
    comment:
      "Read some bad reviews and was hesitant, but my experience has been great. Maybe they fixed earlier issues? Works perfectly out of the box.",
    date: "2025-01-22T19:00:00Z",
    helpful: 10,
  },

  // -- prod-15 ---------------------------------------------------------
  {
    id: "rev-027",
    productId: "prod-15",
    userName: "User9042",
    rating: 5,
    title: "A must-have",
    comment: "If you're debating whether to buy this — just do it. You won't regret it.",
    date: "2025-03-07T14:50:00Z",
    helpful: 24,
  },

  // -- prod-16 ---------------------------------------------------------
  {
    id: "rev-028",
    productId: "prod-16",
    userName: "Liam",
    rating: 3,
    title: "Mixed feelings",
    comment:
      "Some aspects are really well done — the display is gorgeous and the speakers are decent. But the software is buggy and updates seem slow to roll out. Hoping it improves over time.",
    date: "2024-08-15T06:30:00Z",
    helpful: 17,
  },

  // -- prod-17 ---------------------------------------------------------
  {
    id: "rev-029",
    productId: "prod-17",
    userName: "Isabella",
    rating: 5,
    title: "Beautiful and functional",
    comment:
      "It looks even better in person than in the photos. My friends keep asking where I got it. Functional too — not just a pretty face.",
    date: "2025-02-01T11:20:00Z",
    helpful: 33,
  },

  // -- prod-18 ---------------------------------------------------------
  {
    id: "rev-030",
    productId: "prod-18",
    userName: "Ryan C.",
    rating: 4,
    title: "Solid performer",
    comment: "Handles everything I throw at it without breaking a sweat. Good thermals and quiet operation.",
    date: "2024-12-20T15:40:00Z",
    helpful: 4,
  },

  // -- prod-19 ---------------------------------------------------------
  {
    id: "rev-031",
    productId: "prod-19",
    userName: "Megan",
    rating: 2,
    title: "Overrated",
    comment:
      "Everyone online seems to love this but I just don't see the appeal. Build quality feels cheap for the price and the features are nothing special compared to alternatives.",
    date: "2024-09-30T20:00:00Z",
    helpful: 26,
  },

  // -- prod-20 ---------------------------------------------------------
  {
    id: "rev-032",
    productId: "prod-20",
    userName: "James",
    rating: 5,
    title: "Outstanding!",
    comment:
      "This is my third one because I keep giving them away as gifts. Everyone loves them. Durable, stylish, and practical. What more could you ask for?",
    date: "2025-04-05T09:30:00Z",
    helpful: 20,
  },
  {
    id: "rev-033",
    productId: "prod-20",
    userName: "User2287",
    rating: 4,
    title: "Great value",
    comment: "Punches well above its weight for the price. Very impressed.",
    date: "2024-07-12T17:15:00Z",
    helpful: 2,
  },

  // -- prod-21 through prod-25 -----------------------------------------
  {
    id: "rev-034",
    productId: "prod-21",
    userName: "Carlos",
    rating: 3,
    title: "Average experience",
    comment:
      "Nothing wrong with it per se, but nothing that wowed me either. It does what it's supposed to do and that's about it.",
    date: "2024-06-18T10:10:00Z",
    helpful: 1,
  },
  {
    id: "rev-035",
    productId: "prod-22",
    userName: "Emily H.",
    rating: 5,
    title: "Love the color options",
    comment:
      "Finally a brand that offers more than just black and white. The sage green is absolutely stunning. Quality is great too.",
    date: "2025-01-10T13:00:00Z",
    helpful: 28,
  },
  {
    id: "rev-036",
    productId: "prod-23",
    userName: "David",
    rating: 4,
    title: "Fast shipping, good product",
    comment: "Arrived two days early and works great. The only downside is the slightly confusing app interface.",
    date: "2024-11-14T08:45:00Z",
    helpful: 6,
  },
  {
    id: "rev-037",
    productId: "prod-24",
    userName: "Grace",
    rating: 5,
    title: "Exceeded every expectation",
    comment:
      "I did weeks of research before buying this and I'm so glad I went with it. The noise cancellation is unreal and the comfort level is outstanding even during long sessions.",
    date: "2025-03-20T22:00:00Z",
    helpful: 36,
  },
  {
    id: "rev-038",
    productId: "prod-25",
    userName: "User6150",
    rating: 2,
    title: "Flimsy construction",
    comment:
      "Feels like it could break if you look at it wrong. The hinges are particularly weak. Not confident this will last more than a few months.",
    date: "2024-08-03T14:30:00Z",
    helpful: 23,
  },

  // -- prod-26 through prod-30 -----------------------------------------
  {
    id: "rev-039",
    productId: "prod-26",
    userName: "Aisha",
    rating: 4,
    title: "Pleasantly surprised",
    comment: "Took a chance on a lesser-known brand and it paid off. Quality rivals the big names at half the cost.",
    date: "2025-02-28T07:20:00Z",
    helpful: 15,
  },
  {
    id: "rev-040",
    productId: "prod-27",
    userName: "Noah B.",
    rating: 5,
    title: "Perfect for daily use",
    comment:
      "I use this literally every day and it hasn't let me down once. Durable, easy to clean, and looks great on the counter.",
    date: "2024-10-25T16:10:00Z",
    helpful: 11,
  },
  {
    id: "rev-041",
    productId: "prod-28",
    userName: "Chloe",
    rating: 3,
    title: "Fine for the price",
    comment: "You get what you pay for. It's not premium, but it works. Would upgrade when the budget allows.",
    date: "2024-05-07T12:55:00Z",
    helpful: 8,
  },
  {
    id: "rev-042",
    productId: "prod-29",
    userName: "Ethan",
    rating: 4,
    title: "Impressed with the upgrade",
    comment:
      "Upgraded from last year's model and the improvements are noticeable. Faster, quieter, and the new display is much sharper.",
    date: "2025-04-12T10:35:00Z",
    helpful: 19,
  },
  {
    id: "rev-043",
    productId: "prod-30",
    userName: "User3478",
    rating: 1,
    title: "DOA - Dead on arrival",
    comment:
      "Product was dead on arrival. Wouldn't turn on no matter what I tried. Had to go through the hassle of returning it. Very frustrating experience.",
    date: "2024-03-15T09:00:00Z",
    helpful: 40,
  },

  // -- prod-31 through prod-35 -----------------------------------------
  {
    id: "rev-044",
    productId: "prod-31",
    userName: "Lily",
    rating: 5,
    title: "Bought it twice",
    comment: "Loved the first one so much I bought another for the office. Can't recommend it enough.",
    date: "2025-01-30T18:45:00Z",
    helpful: 14,
  },
  {
    id: "rev-045",
    productId: "prod-32",
    userName: "Jordan",
    rating: 3,
    title: "Decent but noisy",
    comment:
      "Works well enough but it's louder than expected. If you're in a quiet environment, this might bother you.",
    date: "2024-09-08T11:20:00Z",
    helpful: 9,
  },
  {
    id: "rev-046",
    productId: "prod-33",
    userName: "Sophie T.",
    rating: 5,
    title: "Stunning quality",
    comment:
      "The materials are luxurious and the attention to detail is impeccable. Worth saving up for — you can feel the difference immediately.",
    date: "2025-03-10T14:00:00Z",
    helpful: 25,
  },
  {
    id: "rev-047",
    productId: "prod-34",
    userName: "Will",
    rating: 4,
    title: "Does what it should",
    comment: "No frills, no fuss. It works well and the price is fair. Happy with it.",
    date: "2024-12-15T20:30:00Z",
    helpful: 3,
  },
  {
    id: "rev-048",
    productId: "prod-35",
    userName: "ZoeReviews",
    rating: 4,
    title: "Great for beginners",
    comment:
      "If you're just getting started, this is the perfect entry point. Intuitive to use and the learning curve is gentle. More advanced users might want something with more features though.",
    date: "2024-07-29T08:10:00Z",
    helpful: 30,
  },

  // -- prod-36 through prod-40 -----------------------------------------
  {
    id: "rev-049",
    productId: "prod-36",
    userName: "Lucas",
    rating: 5,
    title: "Top tier",
    comment: "Premium product at a reasonable price. The competition should be worried.",
    date: "2025-04-22T15:15:00Z",
    helpful: 12,
  },
  {
    id: "rev-050",
    productId: "prod-37",
    userName: "Ava M.",
    rating: 2,
    title: "Returned it",
    comment:
      "The quality didn't match the marketing photos at all. Seams were coming undone right out of the box. Had to return. Disappointing.",
    date: "2024-10-03T19:40:00Z",
    helpful: 32,
  },
  {
    id: "rev-051",
    productId: "prod-38",
    userName: "MaxPower42",
    rating: 4,
    title: "Reliable workhorse",
    comment:
      "Not the flashiest option out there but it's dependable. Six months in and zero issues. Sometimes boring is good.",
    date: "2025-02-17T12:25:00Z",
    helpful: 7,
  },
  {
    id: "rev-052",
    productId: "prod-39",
    userName: "Aria",
    rating: 5,
    title: "Obsessed!",
    comment:
      "I cannot stop telling everyone about this. It's changed my daily routine for the better. The quality is insane for the price and it looks so sleek.",
    date: "2025-01-05T08:50:00Z",
    helpful: 37,
  },
  {
    id: "rev-053",
    productId: "prod-40",
    userName: "User8890",
    rating: 3,
    title: "Meh",
    comment: "It's fine. Nothing special. Does the job but I expected more based on the reviews.",
    date: "2024-06-11T16:00:00Z",
    helpful: 0,
  },

  // -- prod-41 through prod-45 -----------------------------------------
  {
    id: "rev-054",
    productId: "prod-41",
    userName: "Henry D.",
    rating: 4,
    title: "Smooth experience",
    comment:
      "From ordering to unboxing to first use — everything was seamless. The product lives up to its claims and the build feels solid in hand.",
    date: "2024-11-20T13:35:00Z",
    helpful: 10,
  },
  {
    id: "rev-055",
    productId: "prod-42",
    userName: "Samantha",
    rating: 5,
    title: "Best in class",
    comment:
      "I've tried at least five alternatives and this blows them all out of the water. The difference in quality is immediately apparent.",
    date: "2025-03-30T21:00:00Z",
    helpful: 41,
  },
  {
    id: "rev-056",
    productId: "prod-43",
    userName: "Oscar",
    rating: 3,
    title: "Adequate",
    comment:
      "Gets the job done but the instructions are terrible and setup took way longer than it should have. Once it's up and running though, no complaints.",
    date: "2024-04-25T10:45:00Z",
    helpful: 13,
  },
  {
    id: "rev-057",
    productId: "prod-44",
    userName: "Maya R.",
    rating: 4,
    title: "Would buy again",
    comment: "Good product, fast delivery, well-packaged. The only improvement I'd suggest is a longer warranty period.",
    date: "2025-02-08T07:15:00Z",
    helpful: 5,
  },
  {
    id: "rev-058",
    productId: "prod-45",
    userName: "Leo",
    rating: 5,
    title: "Brilliant engineering",
    comment:
      "You can tell real engineers designed this. Every detail serves a purpose. The way the components fit together is almost artistic. Bravo.",
    date: "2024-08-30T17:20:00Z",
    helpful: 34,
  },

  // -- prod-46 through prod-50 -----------------------------------------
  {
    id: "rev-059",
    productId: "prod-46",
    userName: "User5523",
    rating: 2,
    title: "Not worth the hype",
    comment:
      "Bought this based on influencer recommendations and wish I hadn't. The quality is mediocre and it feels like you're paying for the brand name more than anything.",
    date: "2024-07-05T14:50:00Z",
    helpful: 39,
  },
  {
    id: "rev-060",
    productId: "prod-47",
    userName: "Charlotte",
    rating: 4,
    title: "Nice upgrade",
    comment:
      "Coming from a budget option, this feels like a massive step up. The difference in materials and performance is night and day.",
    date: "2025-04-15T11:00:00Z",
    helpful: 8,
  },
  {
    id: "rev-061",
    productId: "prod-48",
    userName: "Patrick",
    rating: 5,
    title: "Chef's kiss",
    comment:
      "Absolutely nailed it. From the unboxing experience to daily use, every interaction with this product puts a smile on my face. This is how products should be designed.",
    date: "2025-01-18T20:30:00Z",
    helpful: 26,
  },
  {
    id: "rev-062",
    productId: "prod-49",
    userName: "Diana",
    rating: 3,
    title: "Good bones, rough edges",
    comment:
      "The core product is great but the software needs work. Frequent crashes and the UI is unintuitive. With a few updates this could be a five-star product.",
    date: "2024-12-01T09:40:00Z",
    helpful: 18,
  },
  {
    id: "rev-063",
    productId: "prod-50",
    userName: "BuyerBeware101",
    rating: 1,
    title: "Save your money",
    comment:
      "Broke within a month. Customer support ghosted me after the initial ticket. The product photos are clearly enhanced because what I received looked nothing like the listing. Hard pass.",
    date: "2024-05-22T15:00:00Z",
    helpful: 48,
  },

  // -- prod-51 through prod-54 -----------------------------------------
  {
    id: "rev-064",
    productId: "prod-51",
    userName: "Kai",
    rating: 4,
    title: "Stylish and practical",
    comment:
      "Finally something that looks good AND works well. Usually you have to pick one or the other. Very satisfied with this purchase.",
    date: "2025-03-05T12:10:00Z",
    helpful: 16,
  },
  {
    id: "rev-065",
    productId: "prod-52",
    userName: "Rebecca",
    rating: 5,
    title: "Converted me to the brand",
    comment:
      "I was loyal to a competitor for years but decided to try this on a whim. Never going back. The difference in quality is immediately obvious.",
    date: "2024-09-20T18:55:00Z",
    helpful: 22,
  },
  {
    id: "rev-066",
    productId: "prod-53",
    userName: "Travis",
    rating: 3,
    title: "Serviceable",
    comment: "Nothing to write home about. It works, it doesn't break, and the price is fair. Three solid stars.",
    date: "2024-04-14T07:30:00Z",
    helpful: 4,
  },
  {
    id: "rev-067",
    productId: "prod-54",
    userName: "Nina S.",
    rating: 5,
    title: "Worth the wait",
    comment:
      "Was on the waitlist for two months and it was absolutely worth it. The hype is real. Build quality, performance, and aesthetics are all top-notch.",
    date: "2025-04-28T10:20:00Z",
    helpful: 43,
  },
  {
    id: "rev-068",
    productId: "prod-54",
    userName: "User1290",
    rating: 4,
    title: "Nearly flawless",
    comment:
      "Just one tiny gripe: the included accessories feel cheap compared to the main product. Everything else is stellar. Would still recommend without hesitation.",
    date: "2025-02-25T16:40:00Z",
    helpful: 11,
  },
];
