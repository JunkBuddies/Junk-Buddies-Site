// File: src/pages/ItemizedPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { calculatePrice, getLoadLabel, fullLoadPoints } from '../utils/pricing';

function ItemizedPage() {
  const { cart, setCart } = useCart();
  const [search, setSearch] = useState('');
  const [cartVisible, setCartVisible] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showSmartSelectorNotice, setShowSmartSelectorNotice] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const navigate = useNavigate();

  const addToCart = (item) => setCart([...cart, item]);

  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const { finalPrice, totalVolume } = calculatePrice(cart);
  const discountAmount = discountApplied ? finalPrice * 0.1 : 0;
  const totalWithDiscount = finalPrice - discountAmount;

  const truckFillPercent =
    ((totalVolume % fullLoadPoints) / fullLoadPoints) * 100;
  const loadLabel = getLoadLabel(totalVolume);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSmartSelectorNotice(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const pulseGlowStyle = `
    @keyframes glowPulse {
      0% { border-color: #FFD700; box-shadow: 0 0 10px #FFD700; }
      50% { border-color: white; box-shadow: 0 0 20px white; }
      100% { border-color: #FFD700; box-shadow: 0 0 10px #FFD700; }
    }
    .animate-pulse-glow {
      animation: glowPulse 1.5s infinite ease-in-out;
    }
  `;

  async function handleSmartSelectorInput(userText) {
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    try {
      const res = await fetch('/api/smart-selector', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userText, itemData }),
      });
      const data = await res.json();

      setCart((prev) => [...prev, ...data]);
      setDiscountApplied(true);

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Got it! I've added ${data.length} items to your cart. You’re saving 10%.`,
        },
      ]);
    } catch (err) {
      console.error('Smart Selector failed:', err);
      setChatMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Something went wrong. Please try again.' },
      ]);
    }
  }
    const itemData = [               
    {
  category: 'Beds & Bedroom Furniture',
  items: [
    { name: 'Adjustable Bed Base', price: 120, volume: 20 },
    { name: 'Adjustable Bed Base - Full', price: 130, volume: 22 },
    { name: 'Adjustable Bed Base - King/Cal King', price: 160, volume: 28 },
    { name: 'Adjustable Bed Base - Queen', price: 150, volume: 26 },
    { name: 'Adjustable Bed Base - Twin', price: 120, volume: 18 },
    { name: 'Bed Base/Foundation - Full', price: 70, volume: 20 },
    { name: 'Bed Base/Foundation - King/Cal King', price: 100, volume: 28 },
    { name: 'Bed Base/Foundation - Queen', price: 85, volume: 25 },
    { name: 'Bed Base/Foundation - Twin', price: 65, volume: 18 },
    { name: 'Bed Foundation', price: 75, volume: 20 },
    { name: 'Bed Frame', price: 75, volume: 15 },
    { name: 'Bed Frame - Full/Queen', price: 80, volume: 20 },
    { name: 'Bed Frame - King/Cal King', price: 90, volume: 25 },
    { name: 'Bed Frame - Twin', price: 70, volume: 15 },
    { name: 'Bedframe with Drawers', price: 100, volume: 30 },
    { name: 'Bed Side Rails', price: 40, volume: 6 },
    { name: 'Bedroom Cleanout - Large', price: 0, volume: 80 },
    { name: 'Bedroom Cleanout - Small', price: 0, volume: 45 },
    { name: 'Bunkbed', price: 100, volume: 60 },
    { name: 'Bunky Boards', price: 40, volume: 8 },
    { name: 'Daybed', price: 85, volume: 35 },
    { name: 'Hospital Bed', price: 130, volume: 55 },
    { name: 'Mattress', price: 80, volume: 30 },
    { name: 'Mattress Coil Set', price: 85, volume: 32 },
    { name: 'Mattress - Crib', price: 50, volume: 12 },
    { name: 'Mattress - Full', price: 75, volume: 25 },
    { name: 'Mattress - King/Cal King', price: 95, volume: 40 },
    { name: 'Mattress - Queen', price: 85, volume: 32 },
    { name: 'Mattress - Twin', price: 65, volume: 20 },
    { name: 'Mattress Topper', price: 45, volume: 6 },
    { name: 'Murphy Bed', price: 150, volume: 65 },
    { name: 'Nightstand', price: 40, volume: 10 },
    { name: 'Trundle Bed', price: 70, volume: 35 },
    { name: 'Waterbed', price: 90, volume: 40 }
  ]
    },
    {
  category: 'Living Room Seating',
  items: [
    { name: 'Beanbag - Large', price: 55, volume: 15 },
    { name: 'Beanbag - Standard Size', price: 45, volume: 10 },
    { name: 'Bench', price: 60, volume: 18 },
    { name: 'Chair', price: 45, volume: 15 },
    { name: 'Chaise Lounge', price: 80, volume: 30 },
    { name: 'Club Chair', price: 65, volume: 20 },
    { name: 'Couch / Loveseat', price: 110, volume: 40 },
    { name: 'Glider - Rocking Chair', price: 55, volume: 18 },
    { name: 'Glider with Ottoman - Rocking Chair', price: 70, volume: 25 },
    { name: 'Loveseat - Reclining', price: 110, volume: 45 },
    { name: 'Ottoman', price: 40, volume: 10 },
    { name: 'Recliner', price: 80, volume: 30 },
    { name: 'Reclining Sofa', price: 130, volume: 60 },
    { name: 'Rocking Chair', price: 50, volume: 18 },
    { name: 'Sectional Sofa - 2 pieces', price: 150, volume: 60 },
    { name: 'Sectional Sofa - 3 pieces', price: 180, volume: 75 },
    { name: 'Sectional Sofa - 4 pieces', price: 200, volume: 90 },
    { name: 'Sectional Sofa - 5 pieces', price: 210, volume: 110 },
    { name: 'Sectional Sofa - 6+ pieces', price: 240, volume: 125 },
    { name: 'Sectional - with built-in Recliner', price: 170, volume: 110 },
    { name: 'Sectional - with built-in Sleeper', price: 180, volume: 120 },
    { name: 'Sleeper Sofa', price: 110, volume: 60 },
    { name: 'Sofa', price: 110, volume: 50 },
    { name: 'Stool', price: 25, volume: 5 }
  ]
    },
    {
  category: 'Dressers, Cabinets & Storage',
  items: [
    { name: 'Bookshelf', price: 50, volume: 20 },
    { name: 'Cabinet', price: 70, volume: 24 },
    { name: 'Cabinet - Large', price: 100, volume: 35 },
    { name: 'China Cabinet', price: 100, volume: 35 },
    { name: 'Chest', price: 75, volume: 24 },
    { name: 'Combo Dresser', price: 80, volume: 30 },
    { name: 'Double Dresser', price: 90, volume: 35 },
    { name: 'Dresser', price: 80, volume: 30 },
    { name: 'Filing Cabinet', price: 60, volume: 18 },
    { name: 'File Cabinet - 2 or 3 Drawer', price: 55, volume: 15 },
    { name: 'File Cabinet - 4 or 5 Drawer', price: 70, volume: 22 },
    { name: 'Gentleman’s Chest', price: 85, volume: 30 },
    { name: 'Horizontal Chest of Drawers', price: 80, volume: 28 },
    { name: 'Horizontal Dresser', price: 80, volume: 28 },
    { name: 'Hutch', price: 75, volume: 28 },
    { name: 'Lingerie Chest', price: 60, volume: 18 },
    { name: 'Sideboard', price: 75, volume: 24 },
    { name: 'Small Cabinet', price: 45, volume: 16 },
    { name: 'Toy Box', price: 35, volume: 14 },
    { name: 'Vertical Chest of Drawers', price: 75, volume: 24 },
    { name: 'Vertical Dresser', price: 75, volume: 24 }
  ]
    },
    {
  category: 'Tables & Desks',
  items: [
    { name: 'Desk', price: 70, volume: 28 },
    { name: 'Desk - Executive', price: 100, volume: 40 },
    { name: 'Desk - L-Shaped', price: 110, volume: 50 },
    { name: 'Desk - Motorized Sit/Stand', price: 120, volume: 36 },
    { name: 'Desk - U Shaped', price: 130, volume: 60 },
    { name: 'Dining / China Hutch', price: 100, volume: 45 },
    { name: 'Dining Table', price: 80, volume: 50 },
    { name: 'End Table', price: 40, volume: 12 },
    { name: 'Table', price: 65, volume: 28 },
    { name: 'Table - Coffee', price: 40, volume: 18 },
    { name: 'Table - Conference Room Table', price: 100, volume: 65 },
    { name: 'Table - Dining', price: 80, volume: 50 },
    { name: 'Table Saw', price: 90, volume: 36 },
    { name: 'Tool Bench', price: 90, volume: 40 }
  ]
    },
    {
  category: 'Appliances',
  items: [
    { name: '30" Range', price: 95, volume: 30 },
    { name: '48" Range', price: 120, volume: 40 },
    { name: '60" Range', price: 150, volume: 50 },
    { name: 'Air Conditioner', price: 85, volume: 20 },
    { name: 'Air Conditioner - Window Unit', price: 75, volume: 14 },
    { name: 'Carpet Steamer', price: 55, volume: 10 },
    { name: 'Cooktop', price: 85, volume: 14 },
    { name: 'Dishwasher', price: 85, volume: 30 },
    { name: 'Dryer', price: 95, volume: 30 },
    { name: 'Electric Fireplace', price: 100, volume: 28 },
    { name: 'Freezer', price: 100, volume: 40 },
    { name: 'Freezer Chest', price: 110, volume: 55 },
    { name: 'Freezer - Commercial Size', price: 180, volume: 75 },
    { name: 'Freezer - Residential Upright', price: 120, volume: 55 },
    { name: 'Microwave', price: 45, volume: 8 },
    { name: 'Oven - Double Wall Oven', price: 140, volume: 55 },
    { name: 'Oven - Kitchen', price: 110, volume: 45 },
    { name: 'Range', price: 100, volume: 30 },
    { name: 'Range - Commercial Size', price: 160, volume: 65 },
    { name: 'Range / Oven', price: 120, volume: 40 },
    { name: 'Refrigerator', price: 120, volume: 55 },
    { name: 'Refrigerator - Commercial Size', price: 200, volume: 75 },
    { name: 'Refrigerator - Mini', price: 70, volume: 20 },
    { name: 'Refrigerator - Residential Built-In', price: 150, volume: 65 },
    { name: 'Refrigerator - Residential Standard', price: 130, volume: 55 },
    { name: 'Stackable Washer and Dryer', price: 150, volume: 55 },
    { name: 'Stove', price: 90, volume: 30 },
    { name: 'Washer', price: 100, volume: 30 }
  ]
    },
    {
  category: 'Fitness & Sports',
  items: [
    { name: 'ATV', price: 250, volume: 80 },
    { name: 'Basi Systems Reformer', price: 180, volume: 45 },
    { name: 'Elliptical', price: 120, volume: 40 },
    { name: 'Exercise Bike', price: 100, volume: 35 },
    { name: 'Foosball or Residential Game Room Table', price: 140, volume: 50 },
    { name: 'Golf Clubs', price: 40, volume: 6 },
    { name: 'Home Gym', price: 200, volume: 60 },
    { name: 'Peloton Exercise Bike', price: 150, volume: 30 },
    { name: 'Pilates Machine', price: 130, volume: 45 },
    { name: 'Recumbent Exercise Cycle', price: 120, volume: 35 },
    { name: 'Rowing Exercise Machine', price: 110, volume: 30 },
    { name: 'Stair Climbing Machine', price: 120, volume: 45 },
    { name: 'Tanning Bed', price: 200, volume: 60 },
    { name: 'Treadmill', price: 100, volume: 40 },
    { name: 'Treadmill - Commercial', price: 140, volume: 55 },
    { name: 'Treadmill - Residential', price: 110, volume: 45 },
    { name: 'Weight Bench', price: 60, volume: 20 },
    { name: 'Weight Bench Set', price: 80, volume: 30 },
    { name: 'Weight Machine', price: 100, volume: 40 }
  ]
    },
    {
  category: 'Kids & Baby Items',
  items: [
    { name: 'Baby Car Seat', price: 40, volume: 6 },
    { name: 'Baby Changing Table', price: 45, volume: 12 },
    { name: 'Baby Swing', price: 40, volume: 8 },
    { name: 'Baby Walker', price: 35, volume: 6 },
    { name: 'Crib', price: 70, volume: 30 },
    { name: 'Highchair', price: 35, volume: 8 },
    { name: 'Kids Bike', price: 40, volume: 12 },
    { name: 'Play Pen', price: 40, volume: 16 },
    { name: 'Playset - Indoor', price: 120, volume: 40 },
    { name: 'Sandbox - Plastic', price: 50, volume: 25 },
    { name: 'Sandbox - Wooden', price: 90, volume: 35 },
    { name: 'Slide', price: 50, volume: 18 },
    { name: 'Stroller', price: 35, volume: 10 },
    { name: 'Swing(s)', price: 50, volume: 20 },
    { name: 'Swingset - Medium', price: 150, volume: 60 }
  ]
    },
    {
  category: 'Outdoor & Yard',
  items: [
    { name: 'Above Ground Pool', price: 300, volume: 80 },
    { name: 'Basketball Goal', price: 120, volume: 50 },
    { name: 'Brush Pile - Large 10ft x 10ft x 10ft', price: 250, volume: 100 },
    { name: 'Brush Pile - Small 5ft x 5ft x 5ft', price: 150, volume: 35 },
    { name: 'Cat Tree', price: 50, volume: 12 },
    { name: 'Junk Pile - Large (10x10x5 ft)', price: 220, volume: 70 },
    { name: 'Junk Pile - Small (5x5x5 ft)', price: 140, volume: 35 },
    { name: 'Ladder', price: 45, volume: 10 },
    { name: 'Large Sports Equipment', price: 100, volume: 40 },
    { name: 'Lawnmower - Push', price: 70, volume: 20 },
    { name: 'Lawnmower - Riding', price: 120, volume: 40 },
    { name: 'Leafblower', price: 40, volume: 6 },
    { name: 'Outdoor Chair', price: 45, volume: 12 },
    { name: 'Outdoor Fire Pit', price: 85, volume: 20 },
    { name: 'Outdoor Furniture', price: 100, volume: 35 },
    { name: 'Outdoor Furniture - Sectional', price: 150, volume: 55 },
    { name: 'Outdoor Lounge Chair', price: 70, volume: 20 },
    { name: 'Playground', price: 250, volume: 75 },
    { name: 'Storage Shed', price: 250, volume: 100 },
    { name: 'Trampoline', price: 120, volume: 40 },
    { name: 'Weed Eater / Trimmer', price: 40, volume: 6 },
    { name: 'Wheelbarrow', price: 40, volume: 12 },
    { name: 'Wood Pallet', price: 30, volume: 8 }
  ]
    },
    {
  category: 'Bathroom & Plumbing',
  items: [
    { name: 'Bathroom Cleanout', price: 0, volume: 50 },
    { name: 'Bathtub - Cast Iron', price: 160, volume: 35 },
    { name: 'Bathtub - Fiberglass', price: 120, volume: 28 },
    { name: 'Bathtub - Porcelain', price: 130, volume: 30 },
    { name: 'Shower Kit/Stall - Double', price: 130, volume: 30 },
    { name: 'Shower Kit/Stall - Single', price: 100, volume: 20 },
    { name: 'Sink', price: 50, volume: 10 },
    { name: 'Toilet', price: 50, volume: 12 },
    { name: 'Vanity - Large', price: 100, volume: 25 },
    { name: 'Vanity - Medium', price: 80, volume: 20 },
    { name: 'Vanity - Small', price: 60, volume: 15 },
    { name: 'Water Heater', price: 80, volume: 25 }
  ]
    },
    {
  category: 'Décor & Small Items',
  items: [
    { name: 'Area Rug 6x9 or Smaller', price: 50, volume: 8 },
    { name: 'Area Rug Larger than 6x9', price: 80, volume: 12 },
    { name: 'Artificial Christmas Tree 10ft or Less', price: 60, volume: 15 },
    { name: 'Books, CD, DVD', price: 30, volume: 3 },
    { name: 'Cardboard Box Not Broken Down', price: 30, volume: 3 },
    { name: 'Cardboard - Large Bale', price: 70, volume: 10 },
    { name: 'Cardboard - Medium Bale', price: 50, volume: 8 },
    { name: 'Cardboard - Small Bale', price: 40, volume: 5 },
    { name: 'Carpet', price: 90, volume: 18 },
    { name: 'Ceiling Fan', price: 50, volume: 6 },
    { name: 'Chandelier - Large', price: 100, volume: 10 },
    { name: 'Chandelier - Small', price: 70, volume: 6 },
    { name: 'Christmas Tree Live 10ft or Less', price: 60, volume: 15 },
    { name: 'Clock - Grandfather', price: 120, volume: 20 },
    { name: 'Lamp', price: 30, volume: 5 },
    { name: 'Large Wall Decor', price: 60, volume: 8 },
    { name: 'Linens', price: 30, volume: 4 },
    { name: 'Luggage', price: 40, volume: 6 },
    { name: 'Marble/Concrete Table', price: 150, volume: 35 },
    { name: 'Massage Chair', price: 160, volume: 30 },
    { name: 'Mirror', price: 35, volume: 6 },
    { name: 'Mirror - Dresser', price: 50, volume: 10 },
    { name: 'Miscellaneous Garden Equipment - Small', price: 40, volume: 6 },
    { name: 'Miscellaneous Home Decor', price: 30, volume: 6 },
    { name: 'Miscellaneous Power Tools', price: 50, volume: 6 },
    { name: 'Miscellaneous Small Electronics', price: 30, volume: 4 },
    { name: 'Miscellaneous Small Exercise Equipment', price: 45, volume: 6 },
    { name: 'Miscellaneous Small Kitchen Appliances', price: 30, volume: 4 },
    { name: 'Miscellaneous Sports Equipment', price: 50, volume: 8 },
    { name: 'Miscellaneous Toys', price: 35, volume: 5 },
    { name: 'Miscellaneous Yard Equipment', price: 45, volume: 8 },
    { name: 'Musical Instruments', price: 70, volume: 8 },
    { name: 'Organ - Electric', price: 130, volume: 25 },
    { name: 'Paper Shredder', price: 30, volume: 4 },
    { name: 'Podium', price: 50, volume: 10 },
    { name: 'Proof of Disposal', price: 20, volume: 0 },
    { name: 'Proof of Recycling - Appliances Only', price: 25, volume: 0 },
    { name: 'Shoes and Clothing', price: 30, volume: 4 },
    { name: 'Speakers', price: 40, volume: 6 },
    { name: 'Steamer', price: 35, volume: 4 },
    { name: 'Stereo System', price: 60, volume: 10 },
    { name: 'Television', price: 60, volume: 10 },
    { name: 'Television - Flat Screen - 25in or less', price: 40, volume: 6 },
    { name: 'Television - Flat Screen - 26in to 42in', price: 50, volume: 8 },
    { name: 'Television - Flat Screen - 42in or larger', price: 70, volume: 10 },
    { name: 'Television - Projection', price: 80, volume: 15 },
    { name: 'Television - Tube 25in or larger', price: 70, volume: 12 },
    { name: 'Television - Tube 25in or under', price: 50, volume: 10 },
    { name: 'Toy Box', price: 35, volume: 6 }
  ]
    },
    {
  category: 'Tools, Garage & Miscellaneous',
  items: [
    { name: 'Automotive Rim', price: 35, volume: 6 },
    { name: 'Automotive Rim and Tire', price: 50, volume: 8 },
    { name: 'Bag of Junk', price: 30, volume: 3 },
    { name: 'Bundle of 10 Broken Down Moving Boxes', price: 40, volume: 5 },
    { name: 'Cot', price: 40, volume: 10 },
    { name: 'Floor Jack', price: 50, volume: 10 },
    { name: 'Folding Event Chairs', price: 25, volume: 4 },
    { name: 'Generator - Portable', price: 90, volume: 10 },
    { name: 'Generator - Stationary', price: 140, volume: 20 },
    { name: 'Grill', price: 70, volume: 10 },
    { name: 'Grill - Propane', price: 85, volume: 12 },
    { name: 'Headboard', price: 50, volume: 8 },
    { name: 'Hood', price: 60, volume: 10 },
    { name: 'Ice Machine', price: 120, volume: 15 },
    { name: 'Ice Maker', price: 65, volume: 10 },
    { name: 'Interior Door', price: 50, volume: 10 },
    { name: 'Ironing Board', price: 25, volume: 4 },
    { name: 'Jackhammer', price: 80, volume: 12 },
    { name: 'Mileage', price: 20, volume: 0 },
    { name: 'Motorcycle', price: 180, volume: 40 },
    { name: 'Moving Fee (within 15 miles)', price: 75, volume: 0 },
    { name: 'Ophthalmic Chair', price: 120, volume: 20 },
    { name: 'Ophthalmic Instrument Stand', price: 110, volume: 20 },
    { name: 'Paint - 1 Gallon Paint Can', price: 20, volume: 2 },
    { name: 'Paint - 5 Gallon Bucket', price: 40, volume: 5 },
    { name: 'Pizza Oven - Portable', price: 120, volume: 15 },
    { name: 'Pizza Oven Stand', price: 80, volume: 10 },
    { name: 'Power Ride On Toy', price: 90, volume: 12 },
    { name: 'Printer - Free Standing', price: 60, volume: 10 },
    { name: 'Propane Tank - 120 Gallon', price: 100, volume: 18 },
    { name: 'Propane Tank - 20lb Grill Size', price: 30, volume: 6 },
    { name: 'Propane Tank - 250+ Gallon Tank', price: 150, volume: 25 },
    { name: 'Safe - Large', price: 160, volume: 20 },
    { name: 'Safe - Personal', price: 100, volume: 12 },
    { name: 'Safe - Small', price: 70, volume: 8 },
    { name: 'Salon Chair', price: 80, volume: 10 },
    { name: 'Satellite Dish - Small', price: 35, volume: 4 },
    { name: 'Scale', price: 25, volume: 4 },
    { name: 'Sewing Machine', price: 50, volume: 6 },
    { name: 'Sliding Door', price: 70, volume: 18 },
    { name: 'Smoker', price: 70, volume: 12 },
    { name: 'Snow Blower', price: 90, volume: 15 },
    { name: 'Stackable Washer and Dryer', price: 150, volume: 20 },
    { name: 'Stool', price: 25, volume: 4 },
    { name: 'Toolbox - Freestanding', price: 60, volume: 10 },
    { name: 'Toolbox - Large Rolling', price: 80, volume: 15 },
    { name: 'Toolbox - Small', price: 40, volume: 8 },
    { name: 'Trampoline', price: 120, volume: 20 },
    { name: 'TV Stand', price: 50, volume: 8 },
    { name: 'Vacuum', price: 30, volume: 6 },
    { name: 'Vending Machine', price: 120, volume: 20 },
    { name: 'Wheelchair - Motorized', price: 120, volume: 15 },
    { name: 'Wheelchair - Non Motorized', price: 80, volume: 10 },
    { name: 'Wine Cooler - Large', price: 90, volume: 15 },
    { name: 'Wine Cooler - Small', price: 60, volume: 8 },
    { name: 'Wood Pallet', price: 30, volume: 6 }
  ]
    },
    {
  category: 'Custom & Catch-All',
  items: [
    { name: 'Custom Job - L', price: 300, volume: 0 },
    { name: 'Custom Job - M', price: 200, volume: 0 },
    { name: 'Custom Job - S', price: 120, volume: 0 },
    { name: 'Custom Job - XS', price: 80, volume: 0 },
    { name: 'Misc. Large Unlisted Item', price: 100, volume: 20 },
    { name: 'Misc. Medium Unlisted Item', price: 70, volume: 12 },
    { name: 'Misc. Small Unlisted Item', price: 50, volume: 8 }
  ]
}
];

 const filteredData = itemData.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="bg-black text-white min-h-screen p-6 pb-32">
      <style>{pulseGlowStyle}</style>

      {/* Page Title */}
      <h1 className="text-4xl mb-6 text-center font-bold">
        <span className="text-white">Manually Select Junk</span>{' '}
        <span
          className="px-2 py-1 border-2 rounded-lg animate-pulse-glow"
          style={{ borderColor: '#FFD700', color: '#FFD700' }}
        >
          or Add with Smart Select! (Save 10%)
        </span>
      </h1>

      {/* Smart Selector Popup */}
      {showSmartSelectorNotice && !showChat && (
        <div
          className="fixed bottom-6 right-6 bg-black text-white border-2 rounded-xl p-4 shadow-xl animate-pulse-glow cursor-pointer z-50 max-w-xs"
          style={{ borderColor: '#FFD700' }}
          onClick={() => setShowChat(true)}
        >
          <h3 className="font-bold text-gold text-lg mb-1">
            Quick Add with Smart Select — Save 10%
          </h3>
          <p className="text-sm">Let me build your list in seconds. Tap to start.</p>
        </div>
      )}

      {/* Smart Selector Chat Drawer */}
      {showChat && (
        <div className="fixed bottom-0 right-0 w-full sm:w-96 h-2/3 bg-gray-900 border-l border-gold z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gold">
            <h2 className="text-gold font-bold">Junk Buddies Smart Selector</h2>
            <button onClick={() => setShowChat(false)} className="text-white hover:text-gold">
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {chatMessages.map((msg, idx) => (
              <p key={idx} className={msg.sender === 'user' ? 'text-blue-300' : 'text-gray-300'}>
                {msg.text}
              </p>
            ))}
          </div>
          <textarea
            className="w-full p-2 bg-gray-800 text-white border-t border-gold"
            placeholder="Type your items (e.g., sofa, 2 TVs, treadmill)..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSmartSelectorInput(e.target.value);
                e.target.value = '';
              }
            }}
          />
        </div>
      )}

      {/* Badges + Search */}
      <div className="mb-6 max-w-2xl mx-auto">
        <div className="mt-4 mb-6 flex flex-wrap justify-center gap-3">
          <div className="compare-badge-silver">You Don’t Pay Until the Job Is Done</div>
          <div className="compare-badge-silver">Compare Prices Instantly in Cart</div>
        </div>
        <input
          type="text"
          placeholder="Search items..."
          className="w-full p-3 rounded-xl text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Item list remains as-is */}
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
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : null
      )}

      {/* Floating Schedule Button */}
      {!cartVisible && (
        <button
          className="fixed bottom-20 right-6 button-glow z-40"
          onClick={() =>
            navigate('/schedule', { state: { cart, total: totalWithDiscount, volume: totalVolume } })
          }
        >
          Schedule Pickup
        </button>
      )}

      {/* Fixed Cart Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gold p-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setCartVisible(!cartVisible)}
        >
          <p className="text-gold text-lg font-bold">
            View Cart ({cart.length}) — Total: ${totalWithDiscount.toFixed(2)}
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
                  {cart.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center text-sm mb-1">
                      {item.name}: ${item.price.toFixed(2)}
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
              <div className="truck-fill-container">
                <div className="truck-fill-bar" style={{ width: `${Math.min(truckFillPercent, 100)}%` }} />
              </div>
              <p className="text-xs text-yellow-400 mt-1">Truck is {Math.round(truckFillPercent)}% full</p>
              <p className="text-yellow-400 text-sm font-semibold">Estimated Load Tier: {loadLabel}</p>
              {discountApplied && (
                <p className="text-green-400 text-sm">Discount Applied: -${discountAmount.toFixed(2)}</p>
              )}
              <p className="font-bold">Final Price: ${totalWithDiscount.toFixed(2)}</p>
              <button
                className="button-glow w-full"
                onClick={() =>
                  navigate('/schedule', { state: { cart, total: totalWithDiscount, volume: totalVolume } })
                }
              >
                Schedule Now
              </button>
              <button
                className="underline text-sm text-blue-300 mt-1"
                onClick={() => setShowComparison(true)}
              >
                Compare to other junk removal companies
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Price Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-center">Price Comparison</h3>
            <ul className="text-sm mb-4 space-y-1">
              <li>• LoadUp (estimated): ${Math.round(totalWithDiscount * 1.1)}</li>
              <li>• College Hunks (estimated): ${Math.round(totalWithDiscount * 1.2)}</li>
              <li>• 1-800-GOT-JUNK (estimated): ${Math.round(totalWithDiscount * 1.3)}</li>
            </ul>
            <p className="text-green-700 font-bold text-center">
              *Prices are estimated and may vary by location.
            </p>
            <p className="text-green-700 font-bold text-center mt-2">
              You’re likely saving with Junk Buddies!
            </p>
            <button
              className="mt-4 px-4 py-2 bg-gold text-black font-semibold rounded"
              onClick={() => setShowComparison(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemizedPage;
