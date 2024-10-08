/*
const DUMMY_RECIPES = [
    {
        "_id": '1',
        "recipeName": "Chicken Peri-peri",
        "recipeDescription": "A tasty savoury dish with a little kick. Works well as is or with rice.",
        "imageSrc": "/images/chicken-peri-peri.jpg",
        "prepDurationMinutes": 40,
        "cookDurationMinutes": 50,
        "recipeServings": 6,
        "ingredients": [
          {
            "amount": "8",
            "measurement": "item",
            "item": "medium-sized chicken thighs, any remaining bone removed"
          },
          { 
            "amount": "8", 
            "measurement": "tbsp", 
            "item": "olive oil" },
          { 
            "amount": "4", 
            "measurement": "tbsp", 
            "item": "apple-cider vinegar" },
          {
            "amount": "12",
            "measurement": "item",
            "item": "garlic cloves, finely chopped"
          },
          { 
            "amount": "4", 
            "measurement": "tsp", 
            "item": "sweet paprika" 
          },
          { 
            "amount": "4", 
            "measurement": "tsp", 
            "item": "oregano" 
          },
          {
            "amount": "6",
            "measurement": "tsp",
            "item": "chili flakes (optional, can replace with extra oregano and paprika instead)"
          },
          {
            "amount": "4",
            "measurement": "item",
            "item": "red capsicums, deseeded and sliced (can replace capsicum with carrots if preferred)"
          },
          { 
            "amount": "400", 
            "measurement": "g", 
            "item": "chopped tomatoes" },
          {
            "amount": "2",
            "measurement": "item",
            "item": "medium fennel bulbs, diced into large chunks"
          },
          {
            "amount": "4",
            "measurement": "item",
            "item": "lemons, cut into quarters"
          }
        ],
        "cookingSteps": [
          "Make the marinade by stirring together the olive oil, vinegar, garlic, paprika, oregano and chili flakes all together in a bowl",
          "Add chicken into a large roasting pan or cast-iron pot",
          "pour the marinade over the chicken and stir around until all of the chicken is covered by it",
          "Leave the pot to marinate for 1 hour (or 4 hours in the fridge)",
          "Preheat oven to 180C, fan-forced",
          "Add the capsicum, tomatoes, fennel and lemons to the chicken-marinade and stir through",
          "Add some salt and a generous amount of black pepper",
          "Cook in the oven for 40-50 minutes, pulling out once to stir the pot/pan",
          "Serve as is, or with servings of rice"
        ]
    },
    {
    "_id": '2',
    "recipeName": "Jungle Curry",
    "recipeDescription": "A spicy soup. Makes for a nice dinner if your nose is feeling a little blocked.",
    "imageSrc": "/images/jungle-curry.jpg",
    "prepDurationMinutes": 45,
    "cookDurationMinutes": 15,
    "recipeServings": 4,
    "ingredients": [
        { 
        "amount": "5", 
        "measurement": "cup", 
        "item": "water" 
        },
        { 
        "amount": "1000", 
        "measurement": "g", 
        "item": "chicken, diced" 
        },
        { 
        "amount": "2", 
        "measurement": "item", 
        "item": "chicken stock cubes" 
        },
        {
        "amount": "500",
        "measurement": "g",
        "item": "button-cap mushrooms, cut into quarters"
        },
        {
        "amount": "2",
        "measurement": "item",
        "item": "bok choy, greens and whites separated, both cut into small chunks"
        },
        {
        "amount": "30",
        "measurement": "g",
        "item": "ginger root, peeled and sliced"
        },
        {
        "amount": "2",
        "measurement": "item",
        "item": "heads of garlic, peeled and diced into fine bits"
        },
        {
        "amount": "2",
        "measurement": "item",
        "item": "onions, cut into eighths and layers peeled apart"
        },
        { 
        "amount": "70", 
        "measurement": "g", 
        "item": "garlic paste" 
        },
        { 
        "amount": "70", 
        "measurement": "g", 
        "item": "ginger paste" 
        },
        { 
        "amount": "80", 
        "measurement": "g", 
        "item": "red curry paste" 
        }
    ],
    "cookingSteps": [
        "Prepare ingredients as described above",
        "Add water into a large pot, bring to a boil and maintain high temp",
        "Add chicken to pot, stir around until partially cooked",
        "Add ginger root, garlic and chicken stock, stir through",
        "Add onion",
        "Add red curry, garlic and ginger pastes, stir through",
        "If there is a large excess of water, let some water evaporate (optional)",
        "Add the bok choy whites, stir for a minute or two",
        "Add the mushrooms, stir and let simmer for a few minutes to let the mushrooms cook and soak up the water a bit",
        "Add the bok choy greens, stir for no more than 1 minute",
        "Serve hot!"
    ]
    },
    {
    "_id": '3',
    "recipeName": "Chili Con Carne",
    "recipeDescription": "Delicious, filling meal. Can eat with tortillas or rice",
    "imageSrc": "/images/chili-con-carne.jpg",
    "prepDurationMinutes": 20,
    "cookDurationMinutes": 60,
    "recipeServings": 5,
    "ingredients": [
        {
        "amount": "2",
        "measurement": "tsp",
        "item": "cayenne pepper (can add less for a milder spice mix)"
        },
        { 
        "amount": "4", 
        "measurement": "tsp", 
        "item": "sweet paprika" 
        },
        { 
        "amount": "5", 
        "measurement": "tsp", 
        "item": "cumin" 
        },
        { 
        "amount": "2", 
        "measurement": "tsp", 
        "item": "onion powder" 
        },
        {
        "amount": "2",
        "measurement": "tsp",
        "item": "garlic powder (or additional onion powder)"
        },
        { 
        "amount": "2", 
        "measurement": "tsp", 
        "item": "oregano" 
        },
        { 
        "amount": "1", 
        "measurement": "tbsp", 
        "item": "olive oil" 
        },
        {
        "amount": "3",
        "measurement": "item",
        "item": "garlic cloves, minced or finely chopped"
        },
        { 
        "amount": "1", 
        "measurement": "item", 
        "item": "large onion, diced" 
        },
        { 
        "amount": "1", 
        "measurement": "item", 
        "item": "red capsicum, diced" 
        },
        { 
        "amount": "700", 
        "measurement": "g", 
        "item": "beef mince" 
        },
        { 
        "amount": "800", 
        "measurement": "g", 
        "item": "diced tomatoes" 
        },
        { 
        "amount": "400", 
        "measurement": "g", 
        "item": "red kidney beans" 
        },
        { 
        "amount": "2", 
        "measurement": "item", 
        "item": "beef stock cubes" 
        },
        { 
        "amount": "1.5", 
        "measurement": "tsp", 
        "item": "sugar" 
        },
        { 
        "amount": "0.5", 
        "measurement": "cup", 
        "item": "water" 
        }
    ],
    "cookingSteps": [
        "Prepare the spice mix by mixing together the cayenne, paprika, cumin, oregano and the onion and garlic powders into a bowl",
        "Heat oil in a large pan at medium heat",
        "Add garlic and onion to the pan and cook for one minute",
        "Add capsicum and cook until onions look translucent",
        "Turn heat to high and add the beef mince, breaking it into nibble-sized chunks as you go, until mince is mostly browned",
        "Add the spice mix and cook until beef is fully browned and covered with the spice mix",
        "Add the tomatoes and kidney beans and stir through.",
        "Add the stock cubes, water and sugar and stir through, bring heat down to a medium-low",
        "Let it simmer and reduce for around 40 minutes, it should be gently bubbling at the medium-low heat",
        "Serve with rice, tortillas or corn chips"
    ]
    },
    {
    "_id": '4',
    "recipeName": "Crumbed spicy chicken",
    "recipeDescription": "Tasty and savoury crumbed chicken with a satisfying bite. Served with salad or steamed vegies.",
    "imageSrc": "/images/spicy-crumbed-chicken.jpg",
    "prepDurationMinutes": 50,
    "cookDurationMinutes": 40,
    "recipeServings": 5,
    "ingredients": [
        { 
        "amount": "0.66", 
        "measurement": "tbsp", 
        "item": "salt" 
        },
        { 
        "amount": "0.5", 
        "measurement": "tbsp", 
        "item": "thyme" 
        },
        { 
        "amount": "0.5", 
        "measurement": "tbsp", 
        "item": "basil" 
        },
        { 
        "amount": "0.33", 
        "measurement": "tbsp", 
        "item": "oregano" 
        },
        { 
        "amount": "1", 
        "measurement": "tbsp", 
        "item": "celery salt" 
        },
        { 
        "amount": "1", 
        "measurement": "tbsp", 
        "item": "black pepper" 
        },
        { 
        "amount": "1", 
        "measurement": "tbsp", 
        "item": "dried mustard" 
        },
        {
        "amount": "4",
        "measurement": "tbsp",
        "item": "sweet paprika (can replace some with hot paprika for an extra kick)"
        },
        { 
        "amount": "2", 
        "measurement": "tbsp", 
        "item": "garlic salt" 
        },
        { 
        "amount": "1", 
        "measurement": "tbsp", 
        "item": "ground ginger" 
        },
        { 
        "amount": "3", 
        "measurement": "tbsp", 
        "item": "white pepper" 
        },
        {
        "amount": "350",
        "measurement": "g",
        "item": "breadcrumbs (or crushed corn flakes)"
        },
        {
        "amount": "1000",
        "measurement": "g",
        "item": "chicken breast (chicken thigh with excess fat trimmed also works and easier to not dry out)"
        },
        { "amount": "4", "measurement": "item", "item": "eggs, beaten" },
        {
        "amount": "100",
        "measurement": "g",
        "item": "flour (can use tapioca or corn flour if wanting to avoid gluten)"
        }
    ],
    "cookingSteps": [
        "Prepare the spice mix by mixing all the salts and peppers, thyme, basil, oregano, mustard, paprika and ginger",
        "Mix the spice mix with the breadcrumbs thoroughly into a container",
        "Prepare 3 separate bowls, one with the eggs, one with the flour, and one with about half of the prepared spiced crumbs",
        "Prepare a large baking tray with a layer of baking paper",
        "Perform the following 3 steps below with each piece of chicken",
        "Put the chicken in the flour bowl and cover with the flour",
        "Dunk the chicken into the beaten eggs until covered, let the excess drip off a bit",
        "Put the chicken into the breadcrumb bowl and cover thoroughly. Place the crumbed chicken onto the baking tray",
        "If any of the bowls run out before all the chicken is crumbed, add some more as necessary",
        "Any remaining breadcrumbs left in the container (and not in the bowl that had chicken and egg touch it!) can be stored for future use",
        "Bake the crumbed chicken in an oven at 180C fan-forced for around 40-50 minutes, turning once",
        "Serve with salad or steamed vegies"
    ]
    },
    {
        "_id": '5',
        "recipeName": "Macaroni box",
        "recipeDescription": "A classic Finnish dish. Quick and easy! Typically served with ketchup.",
        "imageSrc": "/images/macaroni-box.jpg",
        "prepDurationMinutes": 30,
        "cookDurationMinutes": 60,
        "recipeServings": 4,
        "ingredients": [
          { 
            "amount": "2", 
            "measurement": "cup", 
            "item": "elbow macaroni" 
          },
          { 
            "amount": "1", 
            "measurement": "item", 
            "item": "onion, finely diced" 
          },
          { 
            "amount": "500", 
            "measurement": "g", 
            "item": "beef mince" 
          },
          { 
            "amount": "2", 
            "measurement": "cup", 
            "item": "milk" 
          },
          {
            "amount": "4",
            "measurement": "item",
            "item": "eggs, lightly whisked"
          },
          { 
            "amount": "1", 
            "measurement": "tsp", 
            "item": "salt" 
          },
          { 
            "amount": "1", 
            "measurement": "tsp", 
            "item": "lemon pepper" 
          },
          { 
            "amount": "150", 
            "measurement": "g", 
            "item": "grated cheese" 
          },
          { 
            "amount": "1", 
            "measurement": "tsp", 
            "item": "olive oil" 
          }
        ],
        "cookingSteps": [
          "Prepare a pot of water, bring to a boil",
          "Add macaroni and a pinch of salt to the water and cook for 8-10 minutes. Drain the water",
          "Heat oil in a pan, add the onion and fry until translucent",
          "Add the mince and fry until mostly browned",
          "Add the salt lemon pepper, mix and fry until the mince is fully browned",
          "In a separate bowl, prepare the whisked eggs and add the milk and mix through",
          "Prepare a baking dish and lightly oil it, add the macaroni and the mince to the dish and toss together",
          "Add the egg and milk mixture to the dish until it is almost submerging the macaroni and mince",
          "Add grated cheese on top",
          "Bake in an oven 225C for about 30 minutes, then lower temperature to 200 for another 30 minutes. The egg-milk mixture should be mostly solidified after baking",
          "If there is still a lot of liquid, keep baking at 5-10 minute intervals until mostly solidified",
          "Serve with ketchup or sprinkles of salt and pepper."
        ]
    }
];
*/