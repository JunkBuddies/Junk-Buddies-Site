// File: src/pages/ItemizedPage.jsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Load tier rates (35-yard truck)
const loadRates = [
  { maxVolume: 8.75, price: 250 },
  { maxVolume: 17.5, price: 500 },
  { maxVolume: 26.25, price: 750 },
  { maxVolume: 35, price: 1000 }
];

// Discount progression logic
const getDiscountRate = (index) => {
  if (index < 2) return 0;
  const step = Math.floor((index - 2) / 2);
  const discount = 15 + (step * 5);
  return Math.min(discount, 45);
};
const itemData = [
  {
    category: 'Beds & Bedroom Furniture',
    items: [
      { name: 'Adjustable Bed Base', price: 120, volume: 2 },
      { name: 'Adjustable Bed Base - Full', price: 130, volume: 2 },
      { name: 'Adjustable Bed Base - King/Cal King', price: 160, volume: 3 },
      { name: 'Adjustable Bed Base - Queen', price: 150, volume: 2.5 },
      { name: 'Adjustable Bed Base - Twin', price: 120, volume: 1.5 },
      { name: 'Bed Base/Foundation - Full', price: 70, volume: 2 },
      { name: 'Bed Base/Foundation - King/Cal King', price: 100, volume: 3 },
      { name: 'Bed Base/Foundation - Queen', price: 85, volume: 2.5 },
      { name: 'Bed Base/Foundation - Twin', price: 65, volume: 1.5 },
      { name: 'Bed Foundation', price: 75, volume: 2 },
      { name: 'Bed Frame', price: 75, volume: 1.5 },
      { name: 'Bed Frame - Full/Queen', price: 80, volume: 2 },
      { name: 'Bed Frame - King/Cal King', price: 90, volume: 2.5 },
      { name: 'Bed Frame - Twin', price: 70, volume: 1.5 },
      { name: 'Bedframe with Drawers', price: 100, volume: 3 },
      { name: 'Bed Side Rails', price: 40, volume: 0.5 },
      { name: 'Bedroom Cleanout - Large', price: 0, volume: 15 },
      { name: 'Bedroom Cleanout - Small', price: 0, volume: 8 },
      { name: 'Bunkbed', price: 100, volume: 5 },
      { name: 'Bunky Boards', price: 40, volume: 0.75 },
      { name: 'Daybed', price: 85, volume: 3 },
      { name: 'Hospital Bed', price: 130, volume: 5 },
      { name: 'Mattress', price: 80, volume: 2.5 },
      { name: 'Mattress Coil Set', price: 85, volume: 2.5 },
      { name: 'Mattress - Crib', price: 50, volume: 1 },
      { name: 'Mattress - Full', price: 75, volume: 2 },
      { name: 'Mattress - King/Cal King', price: 95, volume: 3 },
      { name: 'Mattress - Queen', price: 85, volume: 2.5 },
      { name: 'Mattress - Twin', price: 65, volume: 1.5 },
      { name: 'Mattress Topper', price: 45, volume: 0.5 },
      { name: 'Murphy Bed', price: 150, volume: 6 },
      { name: 'Nightstand', price: 40, volume: 1 },
      { name: 'Trundle Bed', price: 70, volume: 3 },
      { name: 'Waterbed', price: 90, volume: 3 },
    ],
  },
  {
    category: 'Living Room Seating',
    items: [
      { name: 'Beanbag - Large', price: 55, volume: 2 },
      { name: 'Beanbag - Standard Size', price: 45, volume: 1 },
      { name: 'Bench', price: 60, volume: 2 },
      { name: 'Chair', price: 45, volume: 1.5 },
      { name: 'Chaise Lounge', price: 80, volume: 3 },
      { name: 'Club Chair', price: 65, volume: 2 },
      { name: 'Couch / Loveseat', price: 110, volume: 4 },
      { name: 'Glider - Rocking Chair', price: 55, volume: 2 },
      { name: 'Glider with Ottoman - Rocking Chair', price: 70, volume: 2.5 },
      { name: 'Loveseat - Reclining', price: 110, volume: 4.5 },
      { name: 'Ottoman', price: 40, volume: 1 },
      { name: 'Recliner', price: 80, volume: 3 },
      { name: 'Reclining Sofa', price: 130, volume: 6 },
      { name: 'Rocking Chair', price: 50, volume: 2 },
      { name: 'Sectional Sofa - 2 pieces', price: 150, volume: 6 },
      { name: 'Sectional Sofa - 3 pieces', price: 180, volume: 8 },
      { name: 'Sectional Sofa - 4 pieces', price: 200, volume: 10 },
      { name: 'Sectional Sofa - 5 pieces', price: 210, volume: 12 },
      { name: 'Sectional Sofa - 6+ pieces', price: 240, volume: 14 },
      { name: 'Sectional - with built-in Recliner', price: 170, volume: 10 },
      { name: 'Sectional - with built-in Sleeper', price: 180, volume: 12 },
      { name: 'Sleeper Sofa', price: 110, volume: 5 },
      { name: 'Sofa', price: 110, volume: 4 },
      { name: 'Stool', price: 25, volume: 0.75 },
    ],
  },
  {
    category: 'Dressers, Cabinets & Storage',
    items: [
      { name: 'Bookshelf', price: 50, volume: 3 },
      { name: 'Cabinet', price: 70, volume: 3 },
      { name: 'Cabinet - Large', price: 100, volume: 5 },
      { name: 'China Cabinet', price: 100, volume: 5 },
      { name: 'Chest', price: 75, volume: 3 },
      { name: 'Combo Dresser', price: 80, volume: 4 },
      { name: 'Double Dresser', price: 90, volume: 5 },
      { name: 'Dresser', price: 80, volume: 4 },
      { name: 'Filing Cabinet', price: 60, volume: 2.5 },
      { name: 'File Cabinet - 2 or 3 Drawer', price: 55, volume: 2 },
      { name: 'File Cabinet - 4 or 5 Drawer', price: 70, volume: 3 },
      { name: 'Gentleman’s Chest', price: 85, volume: 4 },
      { name: 'Horizontal Chest of Drawers', price: 80, volume: 3.5 },
      { name: 'Horizontal Dresser', price: 80, volume: 3.5 },
      { name: 'Hutch', price: 75, volume: 3.5 },
      { name: 'Lingerie Chest', price: 60, volume: 2 },
      { name: 'Sideboard', price: 75, volume: 3 },
      { name: 'Small Cabinet', price: 45, volume: 2 },
      { name: 'Toy Box', price: 35, volume: 2 },
      { name: 'Vertical Chest of Drawers', price: 75, volume: 3 },
      { name: 'Vertical Dresser', price: 75, volume: 3 },
    ],
  },
  {
    category: 'Tables & Desks',
    items: [
      { name: 'Desk', price: 70, volume: 3 },
      { name: 'Desk - Executive', price: 100, volume: 4 },
      { name: 'Desk - L-Shaped', price: 110, volume: 5 },
      { name: 'Desk - Motorized Sit/Stand', price: 120, volume: 4 },
      { name: 'Desk - U Shaped', price: 130, volume: 5 },
      { name: 'Dining / China Hutch', price: 100, volume: 5 },
      { name: 'Dining Table', price: 80, volume: 5 },
      { name: 'End Table', price: 40, volume: 1.5 },
      { name: 'Table', price: 65, volume: 3 },
      { name: 'Table - Coffee', price: 40, volume: 2 },
      { name: 'Table - Conference Room Table', price: 100, volume: 6 },
      { name: 'Table - Dining', price: 80, volume: 5 },
      { name: 'Table Saw', price: 90, volume: 4 },
      { name: 'Tool Bench', price: 90, volume: 5 },
    ],
  },
  {
    category: 'Appliances',
    items: [
      { name: '30" Range', price: 95, volume: 3 },
      { name: '48" Range', price: 120, volume: 4 },
      { name: '60" Range', price: 150, volume: 5 },
      { name: 'Air Conditioner', price: 85, volume: 2 },
      { name: 'Air Conditioner - Window Unit', price: 75, volume: 1.5 },
      { name: 'Carpet Steamer', price: 55, volume: 1 },
      { name: 'Cooktop', price: 85, volume: 1.5 },
      { name: 'Dishwasher', price: 85, volume: 3 },
      { name: 'Dryer', price: 95, volume: 3 },
      { name: 'Electric Fireplace', price: 100, volume: 3 },
      { name: 'Freezer', price: 100, volume: 4 },
      { name: 'Freezer Chest', price: 110, volume: 5 },
      { name: 'Freezer - Commercial Size', price: 180, volume: 8 },
      { name: 'Freezer - Residential Upright', price: 120, volume: 5 },
      { name: 'Microwave', price: 45, volume: 1 },
      { name: 'Oven - Double Wall Oven', price: 140, volume: 5 },
      { name: 'Oven - Kitchen', price: 110, volume: 4 },
      { name: 'Range', price: 100, volume: 3 },
      { name: 'Range - Commercial Size', price: 160, volume: 6 },
      { name: 'Range / Oven', price: 120, volume: 4 },
      { name: 'Refrigerator', price: 120, volume: 5 },
      { name: 'Refrigerator - Commercial Size', price: 200, volume: 8 },
      { name: 'Refrigerator - Mini', price: 70, volume: 2 },
      { name: 'Refrigerator - Residential Built-In', price: 150, volume: 6 },
      { name: 'Refrigerator - Residential Standard', price: 130, volume: 5 },
      { name: 'Stackable Washer and Dryer', price: 150, volume: 5 },
      { name: 'Stove', price: 90, volume: 3 },
      { name: 'Washer', price: 100, volume: 3 },
    ],
  },
  {
    category: 'Fitness & Sports',
    items: [
      { name: 'ATV', price: 250, volume: 12 },
      { name: 'Basi Systems Reformer', price: 180, volume: 6 },
      { name: 'Elliptical', price: 120, volume: 5 },
      { name: 'Exercise Bike', price: 100, volume: 4 },
      { name: 'Foosball or Residential Game Room Table', price: 140, volume: 5 },
      { name: 'Golf Clubs', price: 40, volume: 1 },
      { name: 'Home Gym', price: 200, volume: 8 },
      { name: 'Peloton Exercise Bike', price: 150, volume: 4 },
      { name: 'Pilates Machine', price: 130, volume: 5 },
      { name: 'Recumbent Exercise Cycle', price: 120, volume: 4 },
      { name: 'Rowing Exercise Machine', price: 110, volume: 4 },
      { name: 'Stair Climbing Machine', price: 120, volume: 5 },
      { name: 'Tanning Bed', price: 200, volume: 6 },
      { name: 'Treadmill', price: 100, volume: 4 },
      { name: 'Treadmill - Commercial', price: 140, volume: 6 },
      { name: 'Treadmill - Residential', price: 110, volume: 5 },
      { name: 'Weight Bench', price: 60, volume: 3 },
      { name: 'Weight Bench Set', price: 80, volume: 4 },
      { name: 'Weight Machine', price: 100, volume: 5 },
    ],
  },
  {
    category: 'Kids & Baby Items',
    items: [
      { name: 'Baby Car Seat', price: 40, volume: 1 },
      { name: 'Baby Changing Table', price: 45, volume: 2 },
      { name: 'Baby Swing', price: 40, volume: 1.5 },
      { name: 'Baby Walker', price: 35, volume: 1 },
      { name: 'Crib', price: 70, volume: 3 },
      { name: 'Highchair', price: 35, volume: 1.5 },
      { name: 'Kids Bike', price: 40, volume: 2 },
      { name: 'Play Pen', price: 40, volume: 2 },
      { name: 'Playset - Indoor', price: 120, volume: 8 },
      { name: 'Sandbox - Plastic', price: 50, volume: 3 },
      { name: 'Sandbox - Wooden', price: 90, volume: 5 },
      { name: 'Slide', price: 50, volume: 3 },
      { name: 'Stroller', price: 35, volume: 2 },
      { name: 'Swing(s)', price: 50, volume: 3 },
      { name: 'Swingset - Medium', price: 150, volume: 8 },
    ],
  },
  {
    category: 'Outdoor & Yard',
    items: [
      { name: 'Above Ground Pool', price: 300, volume: 20 },
      { name: 'Basketball Goal', price: 120, volume: 6 },
      { name: 'Brush Pile - Large 10ft x 10ft x 10ft', price: 250, volume: 20 },
      { name: 'Brush Pile - Small 5ft x 5ft x 5ft', price: 150, volume: 8 },
      { name: 'Cat Tree', price: 50, volume: 2 },
      { name: 'Junk Pile - Large (10x10x5 ft)', price: 220, volume: 15 },
      { name: 'Junk Pile - Small (5x5x5 ft)', price: 140, volume: 8 },
      { name: 'Ladder', price: 45, volume: 2 },
      { name: 'Large Sports Equipment', price: 100, volume: 5 },
      { name: 'Lawnmower - Push', price: 70, volume: 3 },
      { name: 'Lawnmower - Riding', price: 120, volume: 6 },
      { name: 'Leafblower', price: 40, volume: 1 },
      { name: 'Outdoor Chair', price: 45, volume: 2 },
      { name: 'Outdoor Fire Pit', price: 85, volume: 3 },
      { name: 'Outdoor Furniture', price: 100, volume: 5 },
      { name: 'Outdoor Furniture - Sectional', price: 150, volume: 8 },
      { name: 'Outdoor Lounge Chair', price: 70, volume: 3 },
      { name: 'Playground', price: 250, volume: 15 },
      { name: 'Storage Shed', price: 250, volume: 20 },
      { name: 'Trampoline', price: 120, volume: 8 },
      { name: 'Weed Eater / Trimmer', price: 40, volume: 1 },
      { name: 'Wheelbarrow', price: 40, volume: 2 },
      { name: 'Wood Pallet', price: 30, volume: 1.5 },
    ],
  },
  {
    category: 'Bathroom & Plumbing',
    items: [
      { name: 'Bathroom Cleanout', price: 0, volume: 10 },
      { name: 'Bathtub - Cast Iron', price: 160, volume: 6 },
      { name: 'Bathtub - Fiberglass', price: 120, volume: 5 },
      { name: 'Bathtub - Porcelain', price: 130, volume: 5 },
      { name: 'Shower Kit/Stall - Double', price: 130, volume: 5 },
      { name: 'Shower Kit/Stall - Single', price: 100, volume: 4 },
      { name: 'Sink', price: 50, volume: 2 },
      { name: 'Toilet', price: 50, volume: 2 },
      { name: 'Vanity - Large', price: 100, volume: 4 },
      { name: 'Vanity - Medium', price: 80, volume: 3 },
      { name: 'Vanity - Small', price: 60, volume: 2 },
      { name: 'Water Heater', price: 80, volume: 3 },
    ],
  },
  {
    category: 'Décor & Small Items',
    items: [
      { name: 'Area Rug 6x9 or Smaller', price: 50, volume: 1 },
      { name: 'Area Rug Larger than 6x9', price: 80, volume: 2 },
      { name: 'Artificial Christmas Tree 10ft or Less', price: 60, volume: 2 },
      { name: 'Books, CD, DVD', price: 30, volume: 0.5 },
      { name: 'Cardboard Box Not Broken Down', price: 30, volume: 0.5 },
      { name: 'Cardboard - Large Bale', price: 70, volume: 2 },
      { name: 'Cardboard - Medium Bale', price: 50, volume: 1.5 },
      { name: 'Cardboard - Small Bale', price: 40, volume: 1 },
      { name: 'Carpet', price: 90, volume: 3 },
      { name: 'Ceiling Fan', price: 50, volume: 1 },
      { name: 'Chandelier - Large', price: 100, volume: 2 },
      { name: 'Chandelier - Small', price: 70, volume: 1 },
      { name: 'Christmas Tree Live 10ft or Less', price: 60, volume: 2 },
      { name: 'Clock - Grandfather', price: 120, volume: 3 },
      { name: 'Lamp', price: 30, volume: 1 },
      { name: 'Large Wall Decor', price: 60, volume: 2 },
      { name: 'Linens', price: 30, volume: 1 },
      { name: 'Luggage', price: 40, volume: 2 },
      { name: 'Marble/Concrete Table', price: 150, volume: 5 },
      { name: 'Massage Chair', price: 160, volume: 5 },
      { name: 'Mirror', price: 35, volume: 1 },
      { name: 'Mirror - Dresser', price: 50, volume: 2 },
      { name: 'Miscellaneous Garden Equipment - Small', price: 40, volume: 1 },
      { name: 'Miscellaneous Home Decor', price: 30, volume: 1 },
      { name: 'Miscellaneous Power Tools', price: 50, volume: 1 },
      { name: 'Miscellaneous Small Electronics', price: 30, volume: 1 },
      { name: 'Miscellaneous Small Exercise Equipment', price: 45, volume: 1.5 },
      { name: 'Miscellaneous Small Kitchen Appliances', price: 30, volume: 1 },
      { name: 'Miscellaneous Sports Equipment', price: 50, volume: 2 },
      { name: 'Miscellaneous Toys', price: 35, volume: 1 },
      { name: 'Miscellaneous Yard Equipment', price: 45, volume: 2 },
      { name: 'Musical Instruments', price: 70, volume: 2 },
      { name: 'Organ - Electric', price: 130, volume: 4 },
      { name: 'Paper Shredder', price: 30, volume: 1 },
      { name: 'Podium', price: 50, volume: 2 },
      { name: 'Proof of Disposal', price: 20, volume: 0 },
      { name: 'Proof of Recycling - Appliances Only', price: 25, volume: 0 },
      { name: 'Shoes and Clothing', price: 30, volume: 1 },
      { name: 'Speakers', price: 40, volume: 1 },
      { name: 'Steamer', price: 35, volume: 1 },
      { name: 'Stereo System', price: 60, volume: 2 },
      { name: 'Television', price: 60, volume: 2 },
      { name: 'Television - Flat Screen - 25in or less', price: 40, volume: 1 },
      { name: 'Television - Flat Screen - 26in to 42in', price: 50, volume: 1.5 },
      { name: 'Television - Flat Screen - 42in or larger', price: 70, volume: 2.5 },
      { name: 'Television - Projection', price: 80, volume: 3 },
      { name: 'Television - Tube 25in or larger', price: 70, volume: 2 },
      { name: 'Television - Tube 25in or under', price: 50, volume: 1.5 },
      { name: 'Toy Box', price: 35, volume: 2 },
    ],
  },
  {
    category: 'Tools, Garage & Miscellaneous',
    items: [
      { name: 'Automotive Rim', price: 35, volume: 1 },
      { name: 'Automotive Rim and Tire', price: 50, volume: 1.5 },
      { name: 'Bag of Junk', price: 30, volume: 0.5 },
      { name: 'Bundle of 10 Broken Down Moving Boxes', price: 40, volume: 1 },
      { name: 'Cot', price: 40, volume: 2 },
      { name: 'Floor Jack', price: 50, volume: 2 },
      { name: 'Folding Event Chairs', price: 25, volume: 0.75 },
      { name: 'Generator - Portable', price: 90, volume: 3 },
      { name: 'Generator - Stationary', price: 140, volume: 5 },
      { name: 'Grill', price: 70, volume: 3 },
      { name: 'Grill - Propane', price: 85, volume: 3 },
      { name: 'Headboard', price: 50, volume: 2 },
      { name: 'Hood', price: 60, volume: 2 },
      { name: 'Ice Machine', price: 120, volume: 4 },
      { name: 'Ice Maker', price: 65, volume: 2 },
      { name: 'Interior Door', price: 50, volume: 2.5 },
      { name: 'Ironing Board', price: 25, volume: 1 },
      { name: 'Jackhammer', price: 80, volume: 3 },
      { name: 'Mileage', price: 20, volume: 0 },
      { name: 'Motorcycle', price: 180, volume: 10 },
      { name: 'Moving Fee (within 15 miles)', price: 75, volume: 0 },
      { name: 'Ophthalmic Chair', price: 120, volume: 4 },
      { name: 'Ophthalmic Instrument Stand', price: 110, volume: 4 },
      { name: 'Paint - 1 Gallon Paint Can', price: 20, volume: 0.25 },
      { name: 'Paint - 5 Gallon Bucket', price: 40, volume: 0.75 },
      { name: 'Pizza Oven - Portable', price: 120, volume: 4 },
      { name: 'Pizza Oven Stand', price: 80, volume: 3 },
      { name: 'Power Ride On Toy', price: 90, volume: 4 },
      { name: 'Printer - Free Standing', price: 60, volume: 2 },
      { name: 'Propane Tank - 120 Gallon', price: 100, volume: 5 },
      { name: 'Propane Tank - 20lb Grill Size', price: 30, volume: 1 },
      { name: 'Propane Tank - 250+ Gallon Tank', price: 150, volume: 8 },
      { name: 'Safe - Large', price: 160, volume: 5 },
      { name: 'Safe - Personal', price: 100, volume: 3 },
      { name: 'Safe - Small', price: 70, volume: 2 },
      { name: 'Salon Chair', price: 80, volume: 3 },
      { name: 'Satellite Dish - Small', price: 35, volume: 1 },
      { name: 'Scale', price: 25, volume: 1 },
      { name: 'Sewing Machine', price: 50, volume: 1.5 },
      { name: 'Sliding Door', price: 70, volume: 4 },
      { name: 'Smoker', price: 70, volume: 3 },
      { name: 'Snow Blower', price: 90, volume: 4 },
      { name: 'Stackable Washer and Dryer', price: 150, volume: 5 },
      { name: 'Stool', price: 25, volume: 1 },
      { name: 'Toolbox - Freestanding', price: 60, volume: 3 },
      { name: 'Toolbox - Large Rolling', price: 80, volume: 4 },
      { name: 'Toolbox - Small', price: 40, volume: 2 },
      { name: 'Trampoline', price: 120, volume: 8 },
      { name: 'TV Stand', price: 50, volume: 2 },
      { name: 'Vacuum', price: 30, volume: 1 },
      { name: 'Vending Machine', price: 120, volume: 5 },
      { name: 'Wheelchair - Motorized', price: 120, volume: 4 },
      { name: 'Wheelchair - Non Motorized', price: 80, volume: 3 },
      { name: 'Wine Cooler - Large', price: 90, volume: 4 },
      { name: 'Wine Cooler - Small', price: 60, volume: 2 },
      { name: 'Wood Pallet', price: 30, volume: 1.5 },
    ],
  },
  {
    category: 'Custom & Catch-All',
    items: [
      { name: 'Custom Job - L', price: 300, volume: 0 },
      { name: 'Custom Job - M', price: 200, volume: 0 },
      { name: 'Custom Job - S', price: 120, volume: 0 },
      { name: 'Custom Job - XS', price: 80, volume: 0 },
      { name: 'Misc. Large Unlisted Item', price: 100, volume: 5 },
      { name: 'Misc. Medium Unlisted Item', price: 70, volume: 3 },
      { name: 'Misc. Small Unlisted Item', price: 50, volume: 2 },
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

  // Dynamic pricing calculations
  const totalVolume = cart.reduce((sum, item) => sum + item.volume, 0);

  const discountedItemTotal = cart.reduce((sum, item, index) => {
    const discountRate = getDiscountRate(index);
    const discountedPrice = item.price * (1 - discountRate / 100);
    return sum + discountedPrice;
  }, 0);

  const applicableLoad = loadRates.find(tier => totalVolume <= tier.maxVolume);
  const loadPrice = applicableLoad ? applicableLoad.price : loadRates[loadRates.length - 1].price;

  const finalPrice = Math.min(discountedItemTotal, loadPrice);
  const itemSavings = cart.reduce((sum, item) => sum + item.price, 0) - discountedItemTotal;
  const loadSavings = discountedItemTotal > loadPrice ? discountedItemTotal - loadPrice : 0;

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
                <button
                  key={i}
                  className="item-card-button"
                  onClick={() => addToCart(item)}
                >
                  <div className="item-card-button-text">
                    <p className="font-semibold">{item.name}</p>
                    {/* Price intentionally hidden */}
                  </div>
                </button>
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
          <p className="text-gold text-lg font-bold">
            View Cart ({cart.length}) — Total: ${finalPrice.toFixed(2)}
          </p>
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
                  {cart.map((item, idx) => {
                    const discountRate = getDiscountRate(idx);
                    const discountedPrice = item.price * (1 - discountRate / 100);
                    return (
                      <li
                        key={idx}
                        className="flex justify-between items-center text-sm mb-1"
                      >
                        {item.name}{' '}
                        {discountRate > 0 ? (
                          <span>
                            ({discountRate}% off): ${discountedPrice.toFixed(2)}
                          </span>
                        ) : (
                          <>: ${discountedPrice.toFixed(2)}</>
                        )}
                        <button
                          onClick={() => removeFromCart(idx)}
                          className="text-red-500 text-xs ml-2 hover:underline"
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="flex flex-col items-center gap-2 w-full md:w-auto">
              {itemSavings > 0 && (
                <p className="text-green-400">
                  ✅ You saved ${itemSavings.toFixed(2)} on your items by bundling!
                </p>
              )}
              {loadSavings > 0 && (
                <p className="text-green-400">
                  ✅ We switched you to the {applicableLoad?.maxVolume} yd³ load rate to save you ${loadSavings.toFixed(2)}!
                </p>
              )}
              <p className="font-bold">
                Final Price: ${finalPrice.toFixed(2)}
              </p>
              <button
                className="button-glow w-full"
                onClick={() =>
                  navigate('/schedule', {
                    state: { cart, total: finalPrice },
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
