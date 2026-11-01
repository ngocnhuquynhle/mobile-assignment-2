# Welcome to your Expo app 👋

# Starbucks-Inspired Mobile App

**Mobile Development – Assignment 2**

## Project Overview

This project is a Starbucks-inspired mobile application developed using React Native, Expo, Expo Router, and TypeScript.

The goal of this assignment is to recreate the look and feel of a real-world mobile application while implementing multiple screens, navigation, reusable components, and interactive features.

The application is a student project created for educational purposes and is not affiliated with Starbucks.

## Features

### 1. Home Screen

- Personalized welcome message
- Starbucks Rewards Star balance
- Promotional offers and reward cards
- Quick access to the ordering screen

### 2. Scan Screen

- Starbucks-inspired digital card interface
- Scan & Pay and Scan Only options
- QR code illustration
- Add a demo Starbucks card
- Set a card as the default

### 3. Order Screen

- Browse drinks by category
- Search for drinks
- View drink details and prices
- Select item quantities
- Add drinks to the shopping cart
- View, remove, and clear cart items
- Automatically calculate cart totals

### 4. Gift Screen

- Choose from different gift card designs
- Select a gift card amount
- Enter recipient and sender information
- Add a personalized message
- Preview the gift card before finishing

### 5. Rewards Screen

- View Star balance and reward progress
- Explore different reward levels
- Switch between rewards and benefits
- Navigate to the Scan and Order screens

## Technologies Used

- React Native
- Expo
- Expo Router
- TypeScript
- React Context API
- Ionicons

## Navigation

The application uses two navigation patterns:

**Tab Navigation:** Home, Scan, Order, Gift, and Rewards.

**Stack Navigation:** Allows users to open the Drink Details screen from the Order screen and return to the previous screen.

## Reusable Components and State Management

The application includes a reusable `DrinkCard` component for displaying menu items.

The shopping cart uses React Context API to share cart information between the Order and Drink Details screens. Users can add items, change quantities, remove items, and view the total price.

## How to Run the Project

### Prerequisites

- Node.js
- npm
- Expo Go on a mobile device, or a supported simulator

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ngocnhuquynhle/mobile-assignment-2.git
   ```

2. Open the project directory:

   ```bash
   cd mobile-assignment-2
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npx expo start
   ```

5. Scan the QR code using Expo Go to run the application on a mobile device.

## Project Structure

```text
src/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx
│   │   ├── scan.tsx
│   │   ├── order.tsx
│   │   ├── gifts.tsx
│   │   ├── rewards.tsx
│   │   └── _layout.tsx
│   ├── drink-details.tsx
│   ├── index.tsx
│   └── _layout.tsx
├── components/
│   └── DrinkCard.tsx
└── context/
    └── CartContext.tsx
```

## Important Notes

This application is a functional educational prototype.

- Menu items and prices are sample data.
- Reward Stars are demonstration values.
- QR code scanning and payment processing are not connected to real Starbucks services.
- Gift card previews are for demonstration purposes only.
- Shopping cart data is stored in application memory and is not saved to an external database.

## Author

Quinn Le

Mobile Development – Assignment 2

## GitHub Repository

https://github.com/ngocnhuquynhle/mobile-assignment-2
