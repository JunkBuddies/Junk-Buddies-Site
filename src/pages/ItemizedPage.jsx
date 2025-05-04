// File: src/pages/ItemizedPage.jsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const itemData = [
  {
    category: 'Full Itemized List',
    items: [
      { name: '1 Car Garage Cleanout', price: 0 },
      { name: '2 Car Garage Cleanout', price: 0 },
      { name: '3 Car Garage Cleanout', price: 0 },
      { name: '30" Range', price: 95 },
      { name: '48" Range', price: 120 },
      { name: '60" Range', price: 150 },
      { name: 'Above Ground Pool', price: 300 },
      { name: 'Adjustable Bed Base', price: 120 },
      { name: 'Adjustable Bed Base - Full', price: 130 },
      { name: 'Adjustable Bed Base - King/Cal King', price: 160 },
      { name: 'Adjustable Bed Base - Queen', price: 150 },
      { name: 'Adjustable Bed Base - Twin', price: 120 },
      { name: 'Air Conditioner', price: 85 },
      { name: 'Air Conditioner - Window Unit', price: 75 },
      { name: 'Aquarium - Large', price: 150 },
      { name: 'Aquarium - Medium', price: 100 },
      { name: 'Aquarium - Small', price: 70 },
      { name: 'Area Rug 6x9 or Smaller', price: 50 },
      { name: 'Area Rug Larger than 6x9', price: 80 },
      { name: 'Artificial Christmas Tree 10ft or Less', price: 60 },
      { name: 'ATV', price: 250 },
      { name: 'Automotive Rim', price: 35 },
      { name: 'Automotive Rim and Tire', price: 50 },
      { name: 'Baby Car Seat', price: 40 },
      { name: 'Baby Changing Table', price: 45 },
      { name: 'Baby Swing', price: 40 },
      { name: 'Baby Walker', price: 35 },
      { name: 'Bag of Junk', price: 30 },
      { name: 'Basi Systems Reformer', price: 180 },
      { name: 'Basketball Goal', price: 120 },
      { name: 'Bathroom Cleanout', price: 0 },
      { name: 'Bathtub - Cast Iron', price: 160 },
      { name: 'Bathtub - Fiberglass', price: 120 },
      { name: 'Bathtub - Porcelain', price: 130 },
      { name: 'Beanbag - Large', price: 55 },
      { name: 'Beanbag - Standard Size', price: 45 },
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
      { name: 'Bicycle', price: 50 },
      { name: 'Books, CD, DVD', price: 30 },
      { name: 'Bookshelf', price: 50 },
      { name: 'Box of Junk', price: 30 },
      { name: 'Box Spring', price: 75 },
      { name: 'Box Spring - Full', price: 75 },
      { name: 'Box Spring - King/Cal King', price: 95 },
      { name: 'Box Spring - Queen', price: 85 },
      { name: 'Box Spring - Twin', price: 65 },
      { name: 'Brush Pile - Large 10ft x 10ft x 10ft', price: 250 },
      { name: 'Brush Pile - Small 5ft x 5ft x 5ft', price: 150 },
      { name: 'Bundle of 10 Broken Down Moving Boxes', price: 40 },
      { name: 'Bunkbed', price: 100 },
      { name: 'Bunky Boards', price: 40 },
      { name: 'Cabinet', price: 70 },
      { name: 'Cabinet - Large', price: 100 },
      { name: 'Cardboard Box Not Broken Down', price: 30 },
      { name: 'Cardboard - Large Bale', price: 70 },
      { name: 'Cardboard - Medium Bale', price: 50 },
      { name: 'Cardboard - Small Bale', price: 40 },
      { name: 'Carpet', price: 90 },
      { name: 'Carpet Steamer', price: 55 },
      { name: 'Casket', price: 200 },
      { name: 'Cat Tree', price: 50 },
      { name: 'Ceiling Fan', price: 50 },
      { name: 'Chair', price: 45 },
      { name: 'Chaise Lounge', price: 80 },
      { name: 'Chandelier - Large', price: 100 },
      { name: 'Chandelier - Small', price: 70 },
      { name: 'Chest', price: 75 },
      { name: 'China Cabinet', price: 100 },
      { name: 'Christmas Tree Live 10ft or Less', price: 60 },
      { name: 'Clock - Grandfather', price: 120 },
      { name: 'Club Chair', price: 65 },
      { name: 'Combo Dresser', price: 80 },
      { name: 'Cooktop', price: 85 },
      { name: 'Cooler', price: 45 },
      { name: 'Cot', price: 40 },
      { name: 'Couch / Loveseat', price: 110 },
      { name: 'Countertop - Laminates', price: 80 },
      { name: 'Countertop - Stone', price: 120 },
      { name: 'Crib', price: 70 },
      { name: 'Cubicle', price: 100 },
      { name: 'Custom Job - L', price: 300 },
      { name: 'Custom Job - M', price: 200 },
      { name: 'Custom Job - S', price: 120 },
      { name: 'Custom Job - XS', price: 80 },
      { name: 'Daybed', price: 85 },
      { name: 'Den Cleanout', price: 0 },
      { name: 'Desk', price: 70 },
      { name: 'Desk - Executive', price: 100 },
      { name: 'Desk - L-Shaped', price: 110 },
      { name: 'Desk - Motorized Sit/Stand', price: 120 },
      { name: 'Desk - U Shaped', price: 130 },
      { name: 'Dining / China Hutch', price: 100 },
      { name: 'Dishwasher', price: 85 },
      { name: 'Double Dresser', price: 90 },
      { name: 'Dresser', price: 80 },
      { name: 'Dryer', price: 95 },
      { name: 'E-Bike', price: 80 },
      { name: 'Electric Fireplace', price: 100 },
      { name: 'Electric Heater - Large', price: 60 },
      { name: 'Electric Heater - Small', price: 40 },
      { name: 'Electric Scooter', price: 70 },
      { name: 'Elliptical', price: 120 },
      { name: 'End Table', price: 40 },
      { name: 'Entertainment Center - 3 Piece', price: 130 },
      { name: 'Entertainment Center - Large', price: 120 },
      { name: 'Entertainment Center - Small', price: 85 },
      { name: 'Exercise Bike', price: 100 },
      { name: 'Exterior Door', price: 70 },
      { name: 'File Cabinet - 2 or 3 Drawer', price: 55 },
      { name: 'File Cabinet - 4 or 5 Drawer', price: 70 },
      { name: 'Filing Cabinet', price: 60 },
      { name: 'Floor Jack', price: 50 },
      { name: 'Folding Event Chairs', price: 25 },
      { name: 'Foosball or Residential Game Room Table', price: 140 },
      { name: 'Footboard', price: 50 },
      { name: 'Freezer', price: 100 },
      { name: 'Freezer Chest', price: 110 },
      { name: 'Freezer - Commercial Size', price: 180 },
      { name: 'Freezer - Residential Upright', price: 120 },
      { name: 'Futon', price: 75 },
      { name: 'Generator - Portable', price: 90 },
      { name: 'Generator - Stationary', price: 140 },
      { name: 'Gentleman’s Chest', price: 85 },
      { name: 'Glider - Rocking Chair', price: 55 },
      { name: 'Glider with Ottoman - Rocking Chair', price: 70 },
      { name: 'Golf Clubs', price: 40 },
      { name: 'Grill', price: 70 },
      { name: 'Grill - Propane', price: 85 },
      { name: 'Headboard', price: 50 },
      { name: 'Highchair', price: 35 },
      { name: 'Home Gym', price: 200 },
      { name: 'Hood', price: 60 },
      { name: 'Horizontal Chest of Drawers', price: 80 },
      { name: 'Horizontal Dresser', price: 80 },
      { name: 'Hospital Bed', price: 130 },
      { name: 'Hot Tub', price: 250 },
      { name: 'Hot Tub Cover', price: 80 },
      { name: 'Hutch', price: 75 },
      { name: 'Ice Machine', price: 120 },
      { name: 'Ice Maker', price: 65 },
      { name: 'Interior Door', price: 50 },
      { name: 'Ironing Board', price: 25 },
      { name: 'Jackhammer', price: 80 },
      { name: 'Junk Pile - Large (10x10x5 ft)', price: 220 },
      { name: 'Junk Pile - Small (5x5x5 ft)', price: 140 },
      { name: 'Keyboard - Electric', price: 50 },
      { name: 'Kids Bike', price: 40 },
      { name: 'Kitchen Cleanout', price: 0 },
      { name: 'Ladder', price: 45 },
      { name: 'Lamp', price: 30 },
      { name: 'Large Sports Equipment', price: 100 },
      { name: 'Large Wall Decor', price: 60 },
      { name: 'Lawnmower - Push', price: 70 },
      { name: 'Lawnmower - Riding', price: 120 },
      { name: 'Leafblower', price: 40 },
      { name: 'Linens', price: 30 },
      { name: 'Lingerie Chest', price: 60 },
      { name: 'Living Room Cleanout', price: 0 },
      { name: 'Loveseat - Reclining', price: 110 },
      { name: 'Luggage', price: 40 },
      { name: 'Marble/Concrete Table', price: 150 },
      { name: 'Massage Chair', price: 160 },
      { name: 'Mattress', price: 80 },
      { name: 'Mattress Coil Set', price: 85 },
      { name: 'Mattress - Crib', price: 50 },
      { name: 'Mattress - Full', price: 75 },
      { name: 'Mattress - King/Cal King', price: 95 },
      { name: 'Mattress - Queen', price: 85 },
      { name: 'Mattress Topper', price: 45 },
      { name: 'Mattress - Twin', price: 65 },
      { name: 'Medical Treatment Table', price: 100 },
      { name: 'Microwave', price: 45 },
      { name: 'Mileage', price: 20 },
      { name: 'Mirror', price: 35 },
      { name: 'Mirror - Dresser', price: 50 },
      { name: 'Miscellaneous Garden Equipment - Small', price: 40 },
      { name: 'Miscellaneous Home Decor', price: 30 },
      { name: 'Miscellaneous Power Tools', price: 50 },
      { name: 'Miscellaneous Small Electronics', price: 30 },
      { name: 'Miscellaneous Small Exercise Equipment', price: 45 },
      { name: 'Miscellaneous Small Kitchen Appliances', price: 30 },
      { name: 'Miscellaneous Sports Equipment', price: 50 },
      { name: 'Miscellaneous Toys', price: 35 },
      { name: 'Miscellaneous Yard Equipment', price: 45 },
      { name: 'Motorcycle', price: 180 },
      { name: 'Moving Fee (within 15 miles)', price: 75 },
      { name: 'Murphy Bed', price: 150 },
      { name: 'Musical Instruments', price: 70 },
      { name: 'Nightstand', price: 40 },
      { name: 'Office Chair', price: 45 },
      { name: 'Ophthalmic Chair', price: 120 },
      { name: 'Ophthalmic Instrument Stand', price: 110 },
      { name: 'Organ - Electric', price: 130 },
      { name: 'Ottoman', price: 40 },
      { name: 'Outdoor Chair', price: 45 },
      { name: 'Outdoor Fire Pit', price: 85 },
      { name: 'Outdoor Furniture', price: 100 },
      { name: 'Outdoor Furniture - Sectional', price: 150 },
      { name: 'Outdoor Lounge Chair', price: 70 },
      { name: 'Oven - Double Wall Oven', price: 140 },
      { name: 'Oven - Kitchen', price: 110 },
      { name: 'Paint - 1 Gallon Paint Can', price: 20 },
      { name: 'Paint - 5 Gallon Bucket', price: 40 },
      { name: 'Paper Shredder', price: 30 },
      { name: 'Peloton Exercise Bike', price: 150 },
      { name: 'Piano - Baby Grand', price: 250 },
      { name: 'Piano - Grand', price: 300 },
      { name: 'Piano - Upright', price: 200 },
      { name: 'Pilates Machine', price: 130 },
      { name: 'Pillow', price: 15 },
      { name: 'Pizza Oven - Portable', price: 120 },
      { name: 'Pizza Oven Stand', price: 80 },
      { name: 'Playground', price: 250 },
      { name: 'Play Pen', price: 40 },
      { name: 'Playset - Indoor', price: 120 },
      { name: 'Podium', price: 50 },
      { name: 'Pool Table or Commercial Game Room Table', price: 200 },
      { name: 'Power Ride On Toy', price: 90 },
      { name: 'Printer - Free Standing', price: 60 },
      { name: 'Proof of Disposal', price: 20 },
      { name: 'Proof of Recycling - Appliances Only', price: 25 },
      { name: 'Propane Tank - 120 Gallon', price: 100 },
      { name: 'Propane Tank - 20lb Grill Size', price: 30 },
      { name: 'Propane Tank - 250+ Gallon Tank', price: 150 },
      { name: 'Range', price: 100 },
      { name: 'Range - Commercial Size', price: 160 },
      { name: 'Range / Oven', price: 120 },
      { name: 'Recliner', price: 80 },
      { name: 'Reclining Sofa', price: 130 },
      { name: 'Recumbent Exercise Cycle', price: 120 },
      { name: 'Refrigerator', price: 120 },
      { name: 'Refrigerator - Commercial Size', price: 200 },
      { name: 'Refrigerator - Mini', price: 70 },
      { name: 'Refrigerator - Residential Built-In', price: 150 },
      { name: 'Refrigerator - Residential Standard', price: 130 },
      { name: 'Rocking Chair', price: 50 },
      { name: 'Rowing Exercise Machine', price: 110 },
      { name: 'Safe - Large', price: 160 },
      { name: 'Safe - Personal', price: 100 },
      { name: 'Safe - Small', price: 70 },
      { name: 'Salon Chair', price: 80 },
      { name: 'Sandbox - Plastic', price: 50 },
      { name: 'Sandbox - Wooden', price: 90 },
      { name: 'Satellite Dish - Small', price: 35 },
      { name: 'Scale', price: 25 },
      { name: 'Sectional Sofa - 2 pieces', price: 150 },
      { name: 'Sectional Sofa - 3 pieces', price: 180 },
      { name: 'Sectional Sofa - 4 pieces', price: 200 },
      { name: 'Sectional Sofa - 5 pieces', price: 210 },
      { name: 'Sectional Sofa - 6+ pieces', price: 240 },
      { name: 'Sectional - with built-in Recliner', price: 170 },
      { name: 'Sectional - with built-in Sleeper', price: 180 },
      { name: 'Sewing Machine', price: 50 },
      { name: 'Shoes and Clothing', price: 30 },
      { name: 'Shower Kit/Stall - Double', price: 130 },
      { name: 'Shower Kit/Stall - Single', price: 100 },
      { name: 'Sideboard', price: 75 },
      { name: 'Sleeper Sofa', price: 110 },
      { name: 'Slide', price: 50 },
      { name: 'Sliding Door', price: 70 },
      { name: 'Small Cabinet', price: 45 },
      { name: 'Smoker', price: 70 },
      { name: 'Snow Blower', price: 90 },
      { name: 'Speakers', price: 40 },
      { name: 'Stackable Washer and Dryer', price: 150 },
      { name: 'Stair Climbing Machine', price: 120 },
      { name: 'Steamer', price: 35 },
      { name: 'Stereo System', price: 60 },
      { name: 'Stool', price: 25 },
      { name: 'Storage Shed', price: 250 },
      { name: 'Stove', price: 90 },
      { name: 'Stroller', price: 35 },
      { name: 'Swing(s)', price: 50 },
      { name: 'Swingset - Medium', price: 150 },
      { name: 'Table', price: 65 },
      { name: 'Table - Coffee', price: 40 },
      { name: 'Table - Conference Room Table', price: 100 },
      { name: 'Table - Dining', price: 80 },
      { name: 'Table Saw', price: 90 },
      { name: 'Tanning Bed', price: 200 },
      { name: 'Television', price: 60 },
      { name: 'Television - Flat Screen - 25in or less', price: 40 },
      { name: 'Television - Flat Screen - 26in to 42in', price: 50 },
      { name: 'Television - Flat Screen - 42in or larger', price: 70 },
      { name: 'Television - Projection', price: 80 },
      { name: 'Television - Tube 25in or larger', price: 70 },
      { name: 'Television - Tube 25in or under', price: 50 },
      { name: 'Tire - Automotive', price: 30 },
      { name: 'Toaster Oven', price: 25 },
      { name: 'Toilet', price: 50 },
      { name: 'Tool Bench', price: 90 },
      { name: 'Toolbox - Freestanding', price: 60 },
      { name: 'Toolbox - Large Rolling', price: 80 },
      { name: 'Toolbox - Small', price: 40 },
      { name: 'Toy Box', price: 35 },
      { name: 'Trampoline', price: 120 },
      { name: 'Treadmill', price: 100 },
      { name: 'Treadmill - Commercial', price: 140 },
      { name: 'Treadmill - Residential', price: 110 },
      { name: 'Trundle Bed', price: 70 },
      { name: 'TV Stand', price: 50 },
      { name: 'Vacuum', price: 30 },
      { name: 'Vanity - Large', price: 100 },
      { name: 'Vanity - Medium', price: 80 },
      { name: 'Vanity - Small', price: 60 },
      { name: 'Vending Machine', price: 120 },
      { name: 'Vertical Chest of Drawers', price: 75 },
      { name: 'Vertical Dresser', price: 75 },
      { name: 'Washer', price: 100 },
      { name: 'Waterbed', price: 90 },
      { name: 'Water Heater', price: 80 },
      { name: 'Weed Eater / Trimmer', price: 40 },
      { name: 'Weight Bench', price: 60 },
      { name: 'Weight Bench Set', price: 80 },
      { name: 'Weight Machine', price: 100 },
      { name: 'Wheelbarrow', price: 40 },
      { name: 'Wheelchair - Motorized', price: 120 },
      { name: 'Wheelchair - Non Motorized', price: 80 },
      { name: 'Wine Cooler - Large', price: 90 },
      { name: 'Wine Cooler - Small', price: 60 },
      { name: 'Wood Pallet', price: 30 },
      { name: 'Misc. Large Unlisted Item', price: 100 },
      { name: 'Misc. Medium Unlisted Item', price: 70 },
      { name: 'Misc. Small Unlisted Item', price: 50 },
    ],
  },
];
function ItemizedPage() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [cartVisible, setCartVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const initialCart = location.state?.cart || [];
  const initialTotal = location.state?.total || 0;

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const getTotal = () =>
    (initialTotal || 0) +
    cart
      .filter((item) => !item.name.toLowerCase().includes('cleanout'))
      .reduce((sum, item) => sum + item.price, 0);

  const filteredData = itemData.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="bg-black text-white min-h-screen p-6 pb-32">
      <h1 className="text-gold text-4xl font-bold mb-6 text-center">
        Itemized Junk Removal
      </h1>

      <div className="mb-2 text-center text-sm text-yellow-400 italic">
        *Cleanout services are estimates only and will be confirmed by our team prior to your appointment.
      </div>

      <div className="mb-6 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search items..."
          className="w-full p-3 rounded-xl text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredData.map((section, idx) =>
        section.items.length > 0 ? (
          <div key={idx} className="mb-10">
            <h2 className="text-2xl text-gold mb-4">{section.category}</h2>
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-white text-black p-4 rounded-xl shadow flex flex-col justify-between"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    {item.name.toLowerCase().includes('cleanout') ? (
                      <p className="text-xs italic text-gray-700">
                        Estimated: ${item.price.toFixed(2)}
                      </p>
                    ) : (
                      <p className="text-sm">${item.price.toFixed(2)}</p>
                    )}
                  </div>
                  <button
                    className="bg-gold mt-4 px-4 py-2 rounded text-black font-bold hover:bg-yellow-400"
                    onClick={() => addToCart(item)}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}

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
    </div>
  );
}

export default ItemizedPage;
