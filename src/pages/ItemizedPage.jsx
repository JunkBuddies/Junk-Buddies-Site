// Updated itemData with categories - Full Clean Version (Rule ALPHA)
// File: src/pages/Itemizeded page
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const itemData = [
  {
    category: 'Furniture - Bedroom',
    items: [
      { name: 'Adjustable Bed Base', price: 120 },
      { name: 'Adjustable Bed Base - Full', price: 130 },
      { name: 'Adjustable Bed Base - King/Cal King', price: 160 },
      { name: 'Adjustable Bed Base - Queen', price: 150 },
      { name: 'Adjustable Bed Base - Twin', price: 120 },
      { name: 'Bed Base/Foundation - Full', price: 70 },
      { name: 'Bed Base/Foundation - King/Cal King', price: 100 },
      { name: 'Bed Base/Foundation - Queen', price: 85 },
      { name: 'Bed Base/Foundation - Twin', price: 65 },
      { name: 'Bed Foundation', price: 75 },
      { name: 'Bed Frame', price: 75 },
      { name: 'Bed Frame - Full/Queen', price: 80 },
      { name: 'Bed Frame - King/Cal King', price: 90 },
      { name: 'Bed Frame - Twin', price: 70 },
      { name: 'Bedframe with Drawers', price: 100 },
      { name: 'Bedroom Cleanout - Large', price: 0 },
      { name: 'Bedroom Cleanout - Small', price: 0 },
      { name: 'Bed Side Rails', price: 40 },
      { name: 'Bench', price: 60 },
      { name: 'Bunkbed', price: 100 },
      { name: 'Bunky Boards', price: 40 },
      { name: 'Chest', price: 75 },
      { name: 'Combo Dresser', price: 80 },
      { name: 'Daybed', price: 85 },
      { name: 'Dresser', price: 80 },
      { name: 'Double Dresser', price: 90 },
      { name: 'Gentleman’s Chest', price: 85 },
      { name: 'Horizontal Chest of Drawers', price: 80 },
      { name: 'Horizontal Dresser', price: 80 },
      { name: 'Lingerie Chest', price: 60 },
      { name: 'Mattress', price: 80 },
      { name: 'Mattress Coil Set', price: 85 },
      { name: 'Mattress - Crib', price: 50 },
      { name: 'Mattress - Full', price: 75 },
      { name: 'Mattress - King/Cal King', price: 95 },
      { name: 'Mattress - Queen', price: 85 },
      { name: 'Mattress Topper', price: 45 },
      { name: 'Mattress - Twin', price: 65 },
      { name: 'Mirror - Dresser', price: 50 },
      { name: 'Murphy Bed', price: 150 },
      { name: 'Nightstand', price: 40 },
      { name: 'Pillow', price: 15 },
      { name: 'Trundle Bed', price: 70 },
      { name: 'Vanity - Large', price: 100 },
      { name: 'Vanity - Medium', price: 80 },
      { name: 'Vanity - Small', price: 60 },
      { name: 'Vertical Chest of Drawers', price: 75 },
      { name: 'Vertical Dresser', price: 75 },
    ],
  },
  {
    category: 'Furniture - Living Room',
    items: [
      { name: 'Beanbag - Large', price: 55 },
      { name: 'Beanbag - Standard Size', price: 45 },
      { name: 'Bookshelf', price: 50 },
      { name: 'China Cabinet', price: 100 },
      { name: 'Club Chair', price: 65 },
      { name: 'Couch / Loveseat', price: 110 },
      { name: 'Entertainment Center - 3 Piece', price: 130 },
      { name: 'Entertainment Center - Large', price: 120 },
      { name: 'Entertainment Center - Small', price: 85 },
      { name: 'Living Room Cleanout', price: 0 },
      { name: 'Loveseat - Reclining', price: 110 },
      { name: 'Ottoman', price: 40 },
      { name: 'Recliner', price: 80 },
      { name: 'Reclining Sofa', price: 130 },
      { name: 'Sectional Sofa - 2 pieces', price: 150 },
      { name: 'Sectional Sofa - 3 pieces', price: 180 },
      { name: 'Sectional Sofa - 4 pieces', price: 200 },
      { name: 'Sectional Sofa - 5 pieces', price: 210 },
      { name: 'Sectional Sofa - 6+ pieces', price: 240 },
      { name: 'Sectional - with built-in Recliner', price: 170 },
      { name: 'Sectional - with built-in Sleeper', price: 180 },
      { name: 'Sleeper Sofa', price: 110 },
      { name: 'Sofa', price: 110 }, // combined name reference
      { name: 'Stool', price: 25 },
      { name: 'TV Stand', price: 50 },
    ],
  },
  {
    category: 'Furniture - Office/Other',
    items: [
      { name: 'Cabinet', price: 70 },
      { name: 'Cabinet - Large', price: 100 },
      { name: 'Chair', price: 45 },
      { name: 'Combo Dresser', price: 80 },
      { name: 'Cubicle', price: 100 },
      { name: 'Desk', price: 70 },
      { name: 'Desk - Executive', price: 100 },
      { name: 'Desk - L-Shaped', price: 110 },
      { name: 'Desk - Motorized Sit/Stand', price: 120 },
      { name: 'Desk - U Shaped', price: 130 },
      { name: 'Dining / China Hutch', price: 100 },
      { name: 'Filing Cabinet', price: 60 },
      { name: 'File Cabinet - 2 or 3 Drawer', price: 55 },
      { name: 'File Cabinet - 4 or 5 Drawer', price: 70 },
      { name: 'Podium', price: 50 },
    ],
  },
  // ✅ Next batch of categories: Appliances & Fixtures, Outdoor/Yard, Construction/Demo, Sports/Fitness, Automotive & Equipment, Seasonal & Decor, Baby & Kids, Miscellaneous, Cleanouts
];

// (continued in next message)...
// ...continuing from above

  {
    category: 'Appliances & Fixtures',
    items: [
      { name: '30" Range', price: 95 },
      { name: '48" Range', price: 120 },
      { name: '60" Range', price: 150 },
      { name: 'Air Conditioner', price: 85 },
      { name: 'Air Conditioner - Window Unit', price: 75 },
      { name: 'Bathtub - Cast Iron', price: 160 },
      { name: 'Bathtub - Fiberglass', price: 120 },
      { name: 'Bathtub - Porcelain', price: 130 },
      { name: 'Carpet Steamer', price: 55 },
      { name: 'Ceiling Fan', price: 50 },
      { name: 'Chandelier - Large', price: 100 },
      { name: 'Chandelier - Small', price: 70 },
      { name: 'Cooktop', price: 85 },
      { name: 'Countertop - Laminates', price: 80 },
      { name: 'Countertop - Stone', price: 120 },
      { name: 'Dishwasher', price: 85 },
      { name: 'Dryer', price: 95 },
      { name: 'Electric Fireplace', price: 100 },
      { name: 'Electric Heater - Large', price: 60 },
      { name: 'Electric Heater - Small', price: 40 },
      { name: 'Freezer', price: 100 },
      { name: 'Freezer Chest', price: 110 },
      { name: 'Freezer - Commercial Size', price: 180 },
      { name: 'Freezer - Residential Upright', price: 120 },
      { name: 'Hood', price: 60 },
      { name: 'Ice Machine', price: 120 },
      { name: 'Ice Maker', price: 65 },
      { name: 'Microwave', price: 45 },
      { name: 'Oven - Double Wall Oven', price: 140 },
      { name: 'Oven - Kitchen', price: 110 },
      { name: 'Range', price: 100 },
      { name: 'Range - Commercial Size', price: 160 },
      { name: 'Range / Oven', price: 120 },
      { name: 'Refrigerator', price: 120 },
      { name: 'Refrigerator - Commercial Size', price: 200 },
      { name: 'Refrigerator - Mini', price: 70 },
      { name: 'Refrigerator - Residential Built-In', price: 150 },
      { name: 'Refrigerator - Residential Standard', price: 130 },
      { name: 'Stove', price: 90 },
      { name: 'Toaster Oven', price: 25 },
      { name: 'Washer', price: 100 },
      { name: 'Stackable Washer and Dryer', price: 150 },
      { name: 'Water Heater', price: 80 },
    ],
  },
  {
    category: 'Outdoor & Yard',
    items: [
      { name: 'Above Ground Pool', price: 300 },
      { name: 'Basketball Goal', price: 120 },
      { name: 'Brush Pile - Large 10ft x 10ft x 10ft', price: 250 },
      { name: 'Brush Pile - Small 5ft x 5ft x 5ft', price: 150 },
      { name: 'Hot Tub', price: 250 },
      { name: 'Hot Tub Cover', price: 80 },
      { name: 'Junk Pile - Large (10x10x5 ft)', price: 220 },
      { name: 'Junk Pile - Small (5x5x5 ft)', price: 140 },
      { name: 'Ladder', price: 45 },
      { name: 'Lawnmower - Push', price: 70 },
      { name: 'Lawnmower - Riding', price: 120 },
      { name: 'Leafblower', price: 40 },
      { name: 'Outdoor Chair', price: 45 },
      { name: 'Outdoor Fire Pit', price: 85 },
      { name: 'Outdoor Furniture', price: 100 },
      { name: 'Outdoor Furniture - Sectional', price: 150 },
      { name: 'Outdoor Lounge Chair', price: 70 },
      { name: 'Playground', price: 250 },
      { name: 'Sandbox - Plastic', price: 50 },
      { name: 'Sandbox - Wooden', price: 90 },
      { name: 'Slide', price: 50 },
      { name: 'Storage Shed', price: 250 },
      { name: 'Swing(s)', price: 50 },
      { name: 'Swingset - Medium', price: 150 },
      { name: 'Trampoline', price: 120 },
      { name: 'Wheelbarrow', price: 40 },
    ],
  },
  // ✅ (continued in next message again to keep it super clear and full)
];
    // ...continuing from above

  {
    category: 'Construction & Demo',
    items: [
      { name: 'Bathroom Cleanout', price: 0 },
      { name: 'Den Cleanout', price: 0 },
      { name: 'Kitchen Cleanout', price: 0 },
      { name: 'Living Room Cleanout', price: 0 },
      { name: 'Concrete Table', price: 150 },
      { name: 'Jackhammer', price: 80 },
      { name: 'Wood Pallet', price: 30 },
      { name: 'Cardboard - Large Bale', price: 70 },
      { name: 'Cardboard - Medium Bale', price: 50 },
      { name: 'Cardboard - Small Bale', price: 40 },
      { name: 'Cardboard Box Not Broken Down', price: 30 },
      { name: 'Custom Job - L', price: 300 },
      { name: 'Custom Job - M', price: 200 },
      { name: 'Custom Job - S', price: 120 },
      { name: 'Custom Job - XS', price: 80 },
      { name: 'Debris', price: 200 }, // if any additional catch-alls
    ],
  },
  {
    category: 'Sports & Fitness',
    items: [
      { name: 'E-Bike', price: 80 },
      { name: 'Exercise Bike', price: 100 },
      { name: 'Elliptical', price: 120 },
      { name: 'Foosball or Residential Game Room Table', price: 140 },
      { name: 'Golf Clubs', price: 40 },
      { name: 'Home Gym', price: 200 },
      { name: 'Massage Chair', price: 160 },
      { name: 'Peloton Exercise Bike', price: 150 },
      { name: 'Piano - Baby Grand', price: 250 },
      { name: 'Piano - Grand', price: 300 },
      { name: 'Piano - Upright', price: 200 },
      { name: 'Pilates Machine', price: 130 },
      { name: 'Pool Table or Commercial Game Room Table', price: 200 },
      { name: 'Recumbent Exercise Cycle', price: 120 },
      { name: 'Rowing Exercise Machine', price: 110 },
      { name: 'Stair Climbing Machine', price: 120 },
      { name: 'Tanning Bed', price: 200 },
      { name: 'Treadmill', price: 100 },
      { name: 'Treadmill - Commercial', price: 140 },
      { name: 'Treadmill - Residential', price: 110 },
      { name: 'Weight Bench', price: 60 },
      { name: 'Weight Bench Set', price: 80 },
      { name: 'Weight Machine', price: 100 },
    ],
  },
  {
    category: 'Automotive & Equipment',
    items: [
      { name: 'ATV', price: 250 },
      { name: 'Automotive Rim', price: 35 },
      { name: 'Automotive Rim and Tire', price: 50 },
      { name: 'Motorcycle', price: 180 },
      { name: 'Power Ride On Toy', price: 90 },
      { name: 'Propane Tank - 120 Gallon', price: 100 },
      { name: 'Propane Tank - 20lb Grill Size', price: 30 },
      { name: 'Propane Tank - 250+ Gallon Tank', price: 150 },
      { name: 'Tire - Automotive', price: 30 },
      { name: 'Toolbox - Freestanding', price: 60 },
      { name: 'Toolbox - Large Rolling', price: 80 },
      { name: 'Toolbox - Small', price: 40 },
    ],
  },
  {
    category: 'Seasonal & Decor',
    items: [
      { name: 'Artificial Christmas Tree 10ft or Less', price: 60 },
      { name: 'Christmas Tree Live 10ft or Less', price: 60 },
      { name: 'Chandelier - Large', price: 100 },
      { name: 'Chandelier - Small', price: 70 },
      { name: 'Large Wall Decor', price: 60 },
      { name: 'Mirror', price: 35 },
      { name: 'Miscellaneous Home Decor', price: 30 },
    ],
  },
  {
    category: 'Baby & Kids',
    items: [
      { name: 'Baby Car Seat', price: 40 },
      { name: 'Baby Changing Table', price: 45 },
      { name: 'Baby Swing', price: 40 },
      { name: 'Baby Walker', price: 35 },
      { name: 'Beanbag - Large', price: 55 },
      { name: 'Beanbag - Standard Size', price: 45 },
      { name: 'Books, CD, DVD', price: 30 },
      { name: 'Bookshelf', price: 50 },
      { name: 'Highchair', price: 35 },
      { name: 'Kids Bike', price: 40 },
      { name: 'Play Pen', price: 40 },
      { name: 'Playset - Indoor', price: 120 },
      { name: 'Sandbox - Plastic', price: 50 },
      { name: 'Sandbox - Wooden', price: 90 },
      { name: 'Slide', price: 50 },
      { name: 'Swing(s)', price: 50 },
      { name: 'Toy Box', price: 35 },
    ],
  },
  {
    category: 'Miscellaneous',
    items: [
      { name: 'Misc. Large Unlisted Item', price: 100 },
      { name: 'Misc. Medium Unlisted Item', price: 70 },
      { name: 'Misc. Small Unlisted Item', price: 50 },
      { name: 'Proof of Disposal', price: 20 },
      { name: 'Proof of Recycling - Appliances Only', price: 25 },
      { name: 'Mileage', price: 20 },
      { name: 'Shoes and Clothing', price: 30 },
      { name: 'Linens', price: 30 },
    ],
  },
  {
    category: 'Cleanouts & Services',
    items: [
      { name: '1 Car Garage Cleanout', price: 0 },
      { name: '2 Car Garage Cleanout', price: 0 },
      { name: '3 Car Garage Cleanout', price: 0 },
      { name: 'Bathroom Cleanout', price: 0 },
      { name: 'Bedroom Cleanout - Large', price: 0 },
      { name: 'Bedroom Cleanout - Small', price: 0 },
      { name: 'Den Cleanout', price: 0 },
      { name: 'Kitchen Cleanout', price: 0 },
      { name: 'Living Room Cleanout', price: 0 },
      { name: 'Moving Fee (within 15 miles)', price: 75 },
    ],
  },
];

export default itemData;
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gold p-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setCartVisible(!cartVisible)}
        >
          <p className="font-bold text-lg">View Cart ({cart.length})</p>
          <span className={`transform transition-transform ${cartVisible ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>

        {cartVisible && (
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-1 max-h-40 overflow-y-auto pr-2 w-full">
              {cart.length === 0 ? (
                <p className="italic text-gray-400">Your cart is empty.</p>
              ) : (
                <ul>
                  {cart.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center text-sm mb-1"
                    >
                      {item.name}{' '}
                      {item.name.toLowerCase().includes('cleanout') ? (
                        <span className="italic text-gray-400">
                          (Estimate only)
                        </span>
                      ) : (
                        `- $${item.price.toFixed(2)}`
                      )}
                      <button
                        onClick={() => removeFromCart(idx)}
                        className="text-red-500 text-xs ml-2 hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col items-center gap-2 w-full md:w-auto">
              <p className="font-bold">
                Total: ${getTotal().toFixed(2)}
              </p>
              <button
                className="button-glow w-full"
                onClick={() =>
                  navigate('/schedule', {
                    state: { cart, total: getTotal() },
                  })
                }
              >
                Schedule Now
              </button>
            </div>
          </div>
        )}
      </div>
