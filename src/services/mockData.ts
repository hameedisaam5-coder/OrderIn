import { Kitchen, Meal, User, Order, SubscriptionPlan } from '../models/types';

// Mock User
export const MOCK_USER: User = {
    id: 'u1',
    name: 'Hameed Isaam',
    email: 'hameed@example.com',
    phone: '+91 9876543210',
    role: 'user',
    addresses: [
        {
            id: 'a1',
            label: 'Home',
            fullAddress: 'No 42, Silicon Valley, Koramangala, Bangalore',
            coordinates: { latitude: 12.9352, longitude: 77.6245 }
        },
        {
            id: 'a2',
            label: 'Office',
            fullAddress: 'Tech Park, Whitefield, Bangalore',
            coordinates: { latitude: 12.9698, longitude: 77.7499 }
        }
    ]
};

// ─── Mock Meals (3–5 per restaurant) ───────────────────────────────────────────
const meals: Meal[] = [
    // k1: Golden Spoon Residency
    { id: 'm1', kitchenId: 'k1', name: 'Home-style Thali', description: 'Dal, Rice, 2 Rotis, Seasonal Veg, Salad', price: 150, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: true },
    { id: 'm1b', kitchenId: 'k1', name: 'Aloo Paratha Combo', description: '2 Parathas, Curd, Pickle', price: 120, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&fit=crop&q=60', type: 'Breakfast', isVegetarian: true },
    { id: 'm1c', kitchenId: 'k1', name: 'Paneer Butter Masala', description: 'Cottage cheese in rich tomato-cream gravy', price: 220, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: true },
    { id: 'm1d', kitchenId: 'k1', name: 'Dal Makhani', description: 'Slow-cooked black lentils in buttery gravy', price: 180, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: true },

    // k2: Mom's Magic
    { id: 'm2', kitchenId: 'k2', name: 'Chicken Curry Meal', description: 'Chicken Curry, Rice, Roti', price: 200, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: false },
    { id: 'm2b', kitchenId: 'k2', name: 'Mutton Biryani', description: 'Slow-cooked spiced rice with tender mutton', price: 280, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: false },
    { id: 'm2c', kitchenId: 'k2', name: 'Egg Curry', description: 'Boiled eggs in spicy tomato gravy, served with rice', price: 140, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: false },
    { id: 'm2d', kitchenId: 'k2', name: 'Masala Chai & Biscuits', description: 'Freshly brewed masala chai with assorted biscuits', price: 50, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },

    // k3: Green Bowl
    { id: 'm3', kitchenId: 'k3', name: 'Healthy Salad Bowl', description: 'Mixed greens, quinoa, tofu, light dressing', price: 180, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: true },
    { id: 'm3b', kitchenId: 'k3', name: 'Avocado Toast', description: 'Smashed avocado on multigrain toast with microgreens', price: 150, image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=500&fit=crop&q=60', type: 'Breakfast', isVegetarian: true },
    { id: 'm3c', kitchenId: 'k3', name: 'Detox Smoothie Bowl', description: 'Acai, banana, granola, mixed berries', price: 200, image: 'https://images.unsplash.com/photo-1546039907-7fa24a6b3cce?w=500&fit=crop&q=60', type: 'Breakfast', isVegetarian: true },
    { id: 'm3d', kitchenId: 'k3', name: 'Buddha Bowl', description: 'Quinoa, avocado, roasted chickpeas, tahini dressing', price: 240, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: true },

    // k4: South Spice Route
    { id: 'm4', kitchenId: 'k4', name: 'Masala Dosa', description: 'Crispy rice crepe with potato filling and chutneys', price: 100, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&fit=crop&q=60', type: 'Breakfast', isVegetarian: true },
    { id: 'm4b', kitchenId: 'k4', name: 'Idli Sambar', description: '4 soft idlis with hot sambar and coconut chutney', price: 80, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&fit=crop&q=60', type: 'Breakfast', isVegetarian: true },
    { id: 'm4c', kitchenId: 'k4', name: 'Chettinad Chicken', description: 'Spicy south Indian chicken with aromatic spices', price: 220, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: false },
    { id: 'm4d', kitchenId: 'k4', name: 'Uttapam', description: 'Thick soft pancake topped with onions and tomatoes', price: 90, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&fit=crop&q=60', type: 'Breakfast', isVegetarian: true },

    // k5: Pizza Paradiso
    { id: 'm5', kitchenId: 'k5', name: 'Margherita Pizza', description: 'Classic tomato, mozzarella, and fresh basil', price: 350, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: true },
    { id: 'm5b', kitchenId: 'k5', name: 'Pepperoni Feast', description: 'Loaded with spicy pepperoni and mozzarella', price: 420, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: false },
    { id: 'm5c', kitchenId: 'k5', name: 'Creamy Alfredo Pasta', description: 'Penne pasta in rich white sauce with garlic', price: 320, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: true },
    { id: 'm5d', kitchenId: 'k5', name: 'Garlic Focaccia', description: 'Herb-infused Italian flat bread with dipping oil', price: 120, image: 'https://images.unsplash.com/photo-1568600891280-b1d7379e6f1b?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },

    // k6: Sushi Zen
    { id: 'm6', kitchenId: 'k6', name: 'Sushi Platter', description: 'Assorted fresh sushi rolls with wasabi and pickled ginger', price: 450, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: false },
    { id: 'm6b', kitchenId: 'k6', name: 'Dragon Roll', description: 'Shrimp tempura, avocado, topped with tuna', price: 380, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: false },
    { id: 'm6c', kitchenId: 'k6', name: 'Edamame', description: 'Steamed salted young soybeans', price: 120, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },
    { id: 'm6d', kitchenId: 'k6', name: 'Miso Soup', description: 'Traditional Japanese broth with tofu and seaweed', price: 90, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },

    // k7: Burger Bistro
    { id: 'm7', kitchenId: 'k7', name: 'Gourmet Burger', description: 'Juicy patty, cheddar, caramelized onions, fries', price: 250, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: false },
    { id: 'm7b', kitchenId: 'k7', name: 'BBQ Bacon Double', description: 'Double beef patty with crispy bacon and BBQ sauce', price: 320, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: false },
    { id: 'm7c', kitchenId: 'k7', name: 'Veggie Burger', description: 'Black bean patty with jalapeños and guacamole', price: 200, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: true },
    { id: 'm7d', kitchenId: 'k7', name: 'Loaded Fries', description: 'Crispy fries with cheese sauce, jalapeños, sour cream', price: 150, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },
    { id: 'm7e', kitchenId: 'k7', name: 'Onion Rings', description: 'Golden crispy battered onion rings', price: 110, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },

    // k8: Sweet Tooth Haven
    { id: 'm8', kitchenId: 'k8', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten center, vanilla ice cream', price: 180, image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: true },
    { id: 'm8b', kitchenId: 'k8', name: 'Blueberry Cheesecake', description: 'Creamy NY-style cheesecake with blueberry compote', price: 220, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },
    { id: 'm8c', kitchenId: 'k8', name: 'Cinnamon Waffles', description: 'Crispy waffles with maple syrup and whipped cream', price: 160, image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500&fit=crop&q=60', type: 'Breakfast', isVegetarian: true },
    { id: 'm8d', kitchenId: 'k8', name: 'Chocolate Brownie', description: 'Fudgey brownie served warm with ice cream', price: 130, image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },

    // k9: The Wok House
    { id: 'm9', kitchenId: 'k9', name: 'Steamed Dumplings', description: 'Chicken or veg dumplings (8 pcs) with spicy dip', price: 220, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: false },
    { id: 'm9b', kitchenId: 'k9', name: 'Kung Pao Chicken', description: 'Stir-fried chicken with peanuts, chili, and vegetables', price: 280, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: false },
    { id: 'm9c', kitchenId: 'k9', name: 'Veg Fried Rice', description: 'Wok-tossed rice with mixed vegetables and soy sauce', price: 160, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: true },
    { id: 'm9d', kitchenId: 'k9', name: 'Spring Rolls', description: '4 crispy vegetable spring rolls with sweet chili sauce', price: 130, image: 'https://images.unsplash.com/photo-1625398407796-82650a8c9dd5?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },

    // k10: Biryani Blues
    { id: 'm10', kitchenId: 'k10', name: 'Hyderabadi Dum Biryani', description: 'Aromatic basmati rice with spices and tender chicken', price: 350, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: false },
    { id: 'm10b', kitchenId: 'k10', name: 'Veg Biryani', description: 'Fragrant rice with mixed vegetables and saffron', price: 250, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: true },
    { id: 'm10c', kitchenId: 'k10', name: 'Seekh Kebab', description: 'Minced lamb kebabs on skewers with mint chutney', price: 280, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: false },
    { id: 'm10d', kitchenId: 'k10', name: 'Shahi Paneer', description: 'Cottage cheese in creamy royal cashew gravy', price: 230, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: true },

    // k11: Taco Fiesta
    { id: 'm11', kitchenId: 'k11', name: 'Crispy Tacos', description: '3 hard-shell tacos with salsa and guacamole', price: 280, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: false },
    { id: 'm11b', kitchenId: 'k11', name: 'Burrito Bowl', description: 'Rice, black beans, grilled chicken, salsa, sour cream', price: 320, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: false },
    { id: 'm11c', kitchenId: 'k11', name: 'Nachos Grande', description: 'Tortilla chips with cheese, jalapeños, and guacamole', price: 200, image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },
    { id: 'm11d', kitchenId: 'k11', name: 'Quesadilla', description: 'Grilled tortilla with melted cheese and veggies', price: 180, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },

    // k14: Tokyo Ramen
    { id: 'm14', kitchenId: 'k14', name: 'Spicy Miso Ramen', description: 'Rich miso broth with chashu pork, egg and noodles', price: 450, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: false },
    { id: 'm14b', kitchenId: 'k14', name: 'Shoyu Ramen', description: 'Soy-based clear broth with chicken and bamboo shoots', price: 400, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: false },
    { id: 'm14c', kitchenId: 'k14', name: 'Gyoza (6 pcs)', description: 'Pan-fried pork and cabbage dumplings', price: 180, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: false },

    // k15: Gelato Bliss
    { id: 'm15', kitchenId: 'k15', name: 'Fruit & Nut Gelato', description: '3 scoops of premium Italian ice cream', price: 250, image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },
    { id: 'm15b', kitchenId: 'k15', name: 'Mango Sorbet', description: '2 scoops of tangy fresh mango sorbet', price: 180, image: 'https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },
    { id: 'm15c', kitchenId: 'k15', name: 'Gelato Waffle Cone', description: '2 scoops of gelato in a crispy Belgian waffle cone', price: 200, image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },

    // k17: Desi Chaat House
    { id: 'm17', kitchenId: 'k17', name: 'Samosa Chaat', description: 'Crushed samosas with chutneys and yogurt', price: 120, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },
    { id: 'm17b', kitchenId: 'k17', name: 'Pani Puri', description: 'Crispy puris filled with spiced water and chickpeas', price: 80, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },
    { id: 'm17c', kitchenId: 'k17', name: 'Bhel Puri', description: 'Puffed rice mixed with vegetables and tamarind chutney', price: 90, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },
    { id: 'm17d', kitchenId: 'k17', name: 'Dahi Vada', description: 'Lentil dumplings soaked in yogurt with chutneys', price: 110, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },

    // k19: Ocean Catch
    { id: 'm19', kitchenId: 'k19', name: 'Grilled Salmon', description: 'Fresh salmon fillet with asparagus and lemon butter', price: 550, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: false },
    { id: 'm19b', kitchenId: 'k19', name: 'Prawn Masala', description: 'Juicy prawns in a spicy coastal masala gravy', price: 420, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: false },
    { id: 'm19c', kitchenId: 'k19', name: 'Fish & Chips', description: 'Golden beer-battered fish fillet with fries and coleslaw', price: 340, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: false },

    // k20: Smokehouse BBQ
    { id: 'm20', kitchenId: 'k20', name: 'BBQ Pork Ribs', description: 'Slow-smoked half rack ribs with BBQ sauce and coleslaw', price: 480, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&fit=crop&q=60', type: 'Dinner', isVegetarian: false },
    { id: 'm20b', kitchenId: 'k20', name: 'Pulled Pork Sandwich', description: 'Slow-cooked BBQ pork with crispy slaw on brioche', price: 280, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: false },
    { id: 'm20c', kitchenId: 'k20', name: 'Corn on the Cob', description: 'Grilled sweet corn with butter and seasoning', price: 90, image: 'https://images.unsplash.com/photo-1568600891280-b1d7379e6f1b?w=500&fit=crop&q=60', type: 'Snack', isVegetarian: true },

    // k22: Morning Glory
    { id: 'm22', kitchenId: 'k22', name: 'Blueberry Pancakes', description: 'Stack of 4 fluffy pancakes with syrup and fresh berries', price: 190, image: 'https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?w=500&fit=crop&q=60', type: 'Breakfast', isVegetarian: true },
    { id: 'm22b', kitchenId: 'k22', name: 'Eggs Benedict', description: 'Poached eggs on English muffin with hollandaise sauce', price: 220, image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=500&fit=crop&q=60', type: 'Breakfast', isVegetarian: true },
    { id: 'm22c', kitchenId: 'k22', name: 'French Toast', description: 'Thick brioche slices with maple syrup and strawberries', price: 160, image: 'https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?w=500&fit=crop&q=60', type: 'Breakfast', isVegetarian: true },
    { id: 'm22d', kitchenId: 'k22', name: 'Granola Parfait', description: 'Greek yogurt, house granola, seasonal berries', price: 140, image: 'https://images.unsplash.com/photo-1546039907-7fa24a6b3cce?w=500&fit=crop&q=60', type: 'Breakfast', isVegetarian: true },

    // Subscription kitchens
    {
        id: 'm_sub1', kitchenId: 's1', name: 'North Indian Tiffin', description: 'Dal, Rice, 2 Rotis, Seasonal Sabzi – daily fresh', price: 120, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: true, isSubscription: true,
        customizationOptions: {
            bases: ['White Rice', 'Brown Rice', 'Roti', 'Chapati'],
            portions: ['Regular', 'Large', 'Slim'],
            addons: [{ id: 'a1', name: 'Extra Paneer', price: 40 }, { id: 'a2', name: 'Curd', price: 20 }, { id: 'a3', name: 'Salad', price: 15 }]
        }
    },
    {
        id: 'm_sub2', kitchenId: 's2', name: 'Pure Veg Thali', description: 'Wholesome vegetarian thali – subscription only', price: 99, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: true, isSubscription: true,
        customizationOptions: {
            bases: ['White Rice', 'Brown Rice', 'Puri'],
            portions: ['Regular', 'Large'],
            addons: [{ id: 'a1', name: 'Extra Sweet', price: 30 }, { id: 'a2', name: 'Papad', price: 5 }]
        }
    },
    {
        id: 'm_sub3', kitchenId: 's3', name: 'Fit Salad Bowl', description: 'Calorie-counted salad with protein boost', price: 149, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: true, isSubscription: true,
        customizationOptions: {
            bases: ['Quinoa', 'Mixed Greens', 'Couscous'],
            portions: ['Regular', 'Large'],
            addons: [{ id: 'a4', name: 'Grilled Tofu', price: 50 }, { id: 'a5', name: 'Extra Dressing', price: 10 }]
        }
    },
    {
        id: 'm_sub4', kitchenId: 's4', name: 'South Indian Tiffin', description: 'Idli/Dosa rotation with sambar and chutney', price: 99, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&fit=crop&q=60', type: 'Breakfast', isVegetarian: true, isSubscription: true,
        customizationOptions: {
            bases: ['Idli focus', 'Dosa focus'],
            portions: ['Regular', 'Large'],
            addons: [{ id: 'a6', name: 'Extra Podi', price: 15 }, { id: 'a7', name: 'Filter Coffee', price: 40 }]
        }
    },
    {
        id: 'm_sub5', kitchenId: 's5', name: 'Daily Bakery Box', description: 'Freshly baked pastries delivered every morning', price: 179, image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&fit=crop&q=60', type: 'Breakfast', isVegetarian: true, isSubscription: true,
        customizationOptions: {
            bases: ['Croissant', 'Muffin', 'Bagel'],
            portions: ['Regular', 'Large (2 items)'],
            addons: [{ id: 'a8', name: 'Cream Cheese', price: 25 }, { id: 'a9', name: 'Orange Juice', price: 60 }]
        }
    },
    {
        id: 'm_sub7', kitchenId: 's7', name: 'Protein Power Meal', description: 'High-protein balanced meal for fitness goals', price: 249, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&fit=crop&q=60', type: 'Lunch', isVegetarian: false, isSubscription: true,
        customizationOptions: {
            bases: ['Cauliflower Rice', 'Brown Rice', 'Sweet Potato'],
            portions: ['Regular', 'Large (+20g Protein)'],
            addons: [{ id: 'a10', name: 'Extra Chicken Breast', price: 80 }, { id: 'a11', name: 'Boiled Eggs (2)', price: 30 }]
        }
    },
];

// ─── Helper: get all meals for a given kitchen ─────────────────────────────────
const kitchenMeals = (id: string): Meal[] => meals.filter(m => m.kitchenId === id);

// ─── Mock Kitchens ─────────────────────────────────────────────────────────────
export const MOCK_KITCHENS: Kitchen[] = [
    { id: 'k8', name: 'Sweet Tooth Haven', rating: 4.8, cuisine: ['Desserts', 'Bakery'], imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&fit=crop&q=60', deliveryTime: '15-25 min', verified: true, menu: kitchenMeals('k8') },
    { id: 'k1', name: 'Golden Spoon Residency', rating: 4.6, cuisine: ['North Indian', 'Mughlai'], imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&fit=crop&q=60', deliveryTime: '35-50 min', verified: true, menu: kitchenMeals('k1') },
    { id: 'k2', name: "Mom's Magic", rating: 4.5, cuisine: ['Indian', 'Home-style'], imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&fit=crop&q=60', deliveryTime: '25-40 min', verified: true, menu: kitchenMeals('k2') },
    { id: 'k3', name: 'Green Bowl', rating: 4.9, cuisine: ['Salads', 'Healthy'], imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&fit=crop&q=60', deliveryTime: '20-30 min', verified: true, menu: kitchenMeals('k3') },
    { id: 'k4', name: 'South Spice Route', rating: 4.7, cuisine: ['South Indian', 'Dosa'], imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&fit=crop&q=60', deliveryTime: '25-35 min', verified: true, menu: kitchenMeals('k4') },
    { id: 'k5', name: 'Pizza Paradiso', rating: 4.6, cuisine: ['Italian', 'Pizza'], imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&fit=crop&q=60', deliveryTime: '35-50 min', verified: true, menu: kitchenMeals('k5') },
    { id: 'k6', name: 'Sushi Zen', rating: 4.9, cuisine: ['Japanese', 'Sushi'], imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&fit=crop&q=60', deliveryTime: '40-60 min', verified: false, menu: kitchenMeals('k6') },
    { id: 'k7', name: 'Burger Bistro', rating: 4.4, cuisine: ['American', 'Fast Food'], imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&fit=crop&q=60', deliveryTime: '20-30 min', verified: true, menu: kitchenMeals('k7') },
    { id: 'k9', name: 'The Wok House', rating: 4.7, cuisine: ['Chinese', 'Asian'], imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&fit=crop&q=60', deliveryTime: '30-45 min', verified: true, menu: kitchenMeals('k9') },
    { id: 'k10', name: 'Biryani Blues', rating: 4.5, cuisine: ['Biryani', 'Mughlai'], imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&fit=crop&q=60', deliveryTime: '40-55 min', verified: true, menu: kitchenMeals('k10') },
    { id: 'k11', name: 'Taco Fiesta', rating: 4.6, cuisine: ['Mexican', 'Tacos'], imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&fit=crop&q=60', deliveryTime: '25-40 min', verified: false, menu: kitchenMeals('k11') },
    { id: 'k14', name: 'Tokyo Ramen', rating: 4.8, cuisine: ['Japanese', 'Ramen'], imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&fit=crop&q=60', deliveryTime: '35-50 min', verified: true, menu: kitchenMeals('k14') },
    { id: 'k15', name: 'Gelato Bliss', rating: 4.9, cuisine: ['Ice Cream', 'Dessert'], imageUrl: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=500&fit=crop&q=60', deliveryTime: '15-25 min', verified: true, menu: kitchenMeals('k15') },
    { id: 'k17', name: 'Desi Chaat House', rating: 4.7, cuisine: ['Street Food', 'Indian'], imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&fit=crop&q=60', deliveryTime: '25-35 min', verified: true, menu: kitchenMeals('k17') },
    { id: 'k19', name: 'Ocean Catch', rating: 4.8, cuisine: ['Seafood', 'Grill'], imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&fit=crop&q=60', deliveryTime: '40-55 min', verified: true, menu: kitchenMeals('k19') },
    { id: 'k20', name: 'Smokehouse BBQ', rating: 4.7, cuisine: ['American', 'BBQ'], imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&fit=crop&q=60', deliveryTime: '45-60 min', verified: true, menu: kitchenMeals('k20') },
    { id: 'k22', name: 'Morning Glory', rating: 4.9, cuisine: ['Breakfast', 'Pancakes'], imageUrl: 'https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?w=500&fit=crop&q=60', deliveryTime: '20-30 min', verified: true, menu: kitchenMeals('k22') },
    // Subscription kitchens
    { id: 's1', name: "Aunty's Tiffin Service", rating: 4.8, cuisine: ['Home Food', 'North Indian'], imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&fit=crop&q=60', deliveryTime: 'Pre-scheduled', verified: true, isSubscription: true, menu: kitchenMeals('s1') },
    { id: 's2', name: 'Sharma Ji Home Kitchen', rating: 4.6, cuisine: ['Pure Veg', 'Thali'], imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&fit=crop&q=60', deliveryTime: 'Pre-scheduled', verified: true, isSubscription: true, menu: kitchenMeals('s2') },
    { id: 's3', name: 'FitBite Home Meals', rating: 4.9, cuisine: ['Healthy', 'Salads'], imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&fit=crop&q=60', deliveryTime: 'Pre-scheduled', verified: true, isSubscription: true, menu: kitchenMeals('s3') },
    { id: 's4', name: 'South Taste Tiffins', rating: 4.7, cuisine: ['South Indian', 'Home Food'], imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&fit=crop&q=60', deliveryTime: 'Pre-scheduled', verified: true, isSubscription: true, menu: kitchenMeals('s4') },
    { id: 's5', name: 'Bake My Day Subscriptions', rating: 4.9, cuisine: ['Bakery', 'Desserts'], imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&fit=crop&q=60', deliveryTime: 'Daily Morning', verified: true, isSubscription: true, menu: kitchenMeals('s5') },
    { id: 's7', name: 'Protein Power Meals', rating: 4.7, cuisine: ['High Protein', 'Keto'], imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&fit=crop&q=60', deliveryTime: 'Pre-scheduled', verified: true, isSubscription: true, menu: kitchenMeals('s7') },
];

// ─── Subscription Plans ────────────────────────────────────────────────────────
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
    { id: 'weekly', name: 'Weekly Plan', durationDays: 7, price: 750, description: 'Perfect for trial. 7 days of delicious meals.' },
    { id: 'monthly', name: 'Monthly Plan', durationDays: 30, price: 3000, description: 'Best value. Hassle-free food for the whole month.' },
];

// ─── Mock Orders ───────────────────────────────────────────────────────────────
export const MOCK_ORDERS: Order[] = [
    {
        id: 'o1',
        userId: 'u1',
        kitchenId: 'k1',
        items: [{ mealId: 'm1', quantity: 1 }],
        totalAmount: 150,
        status: 'Delivered',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        deliveryAddressId: 'a1',
    },
    {
        id: 'o2',
        userId: 'u1',
        kitchenId: 'k1',
        items: [{ mealId: 'm1b', quantity: 2 }],
        totalAmount: 240,
        status: 'Preparing',
        createdAt: new Date().toISOString(),
        deliveryAddressId: 'a2',
    },
];

// ─── Mock Subscriptions ────────────────────────────────────────────────────────
export const MOCK_SUBSCRIPTIONS: import('../models/types').Subscription[] = [
    {
        id: 'sub1',
        userId: 'u1',
        planId: 'weekly',
        startDate: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
        endDate: new Date(Date.now() + 86400000 * 4).toISOString(), // 4 days from now
        status: 'active',
        preferences: {
            spiceLevel: 'Medium',
            oilLevel: 'Standard',
            dietType: 'Veg',
        },
        customization: {
            base: 'Brown Rice',
            portion: 'Regular',
            addons: [],
            instructions: '',
        },
        schedule: {
            afternoon: 'a2', // Office
        }
    }
];
