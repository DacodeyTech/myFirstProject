<!-- ====== DAILY FOOD TABLE GENERATOR ====== -->

# 🍽️ Daily Food Table Generator

A professional, feature-rich web application for planning and managing your daily meals. Built with vanilla HTML, CSS, and JavaScript using best practices and modern design patterns.

## ✨ Features

### 📊 Core Functionality
- **Add Meals**: Easily add meals with day, type, name, and calorie information
- **Edit Meals**: Update meal information on the fly
- **Delete Meals**: Remove individual meals or clear all at once
- **Search & Filter**: Find meals by name, type, or day
- **Day Filter**: Filter meals by specific day of the week
- **Local Storage**: All data is saved automatically in browser storage

### 📈 Statistics Dashboard
- **Total Meals**: Count of all meals added
- **Total Calories**: Sum of all calorie intake
- **Average Calories**: Average calories per meal

### 💾 Data Export
- **CSV Export**: Export your meal plan to CSV format for external use
- **Timestamped Files**: Exported files are automatically timestamped

### 🎨 User Experience
- **Beautiful UI**: Modern gradient design with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Form Validation**: Required field validation with helpful error messages
- **Notifications**: Real-time toast notifications for user actions
- **Emoji Support**: Visual meal type indicators with emojis

## 🚀 Quick Start

### Usage
1. Open `index.html` in your web browser
2. Fill in the meal details:
   - Meal Name (required)
   - Day (required)
   - Meal Type (required)
   - Calories (optional)
3. Click "Add Meal"
4. View your meal plan in the table below
5. Use search and filter to find specific meals
6. Export your meal plan as CSV when needed

### Meal Types
- 🌅 **Breakfast**: Morning meal
- 🌞 **Lunch**: Midday meal
- 🌙 **Dinner**: Evening meal
- 🍿 **Snack**: Light snack

## 💻 Technical Details

### Project Structure
```
/
├── index.html      # HTML structure and markup
├── styles.css      # Professional styling and responsive design
├── script.js       # JavaScript functionality and logic
└── README.md       # Documentation
```

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: 
  - CSS Grid and Flexbox for responsive layout
  - CSS custom properties (variables) for theming
  - CSS animations and transitions
  - Media queries for mobile responsiveness
- **JavaScript (ES6+)**:
  - Object-oriented programming with classes
  - LocalStorage API for data persistence
  - DOM manipulation and event handling
  - CSV export functionality

### Code Features
- **Object-Oriented Design**: `FoodTableManager` class encapsulates all functionality
- **Data Persistence**: LocalStorage for automatic data saving
- **Input Validation**: Comprehensive form validation
- **Error Handling**: Try-catch blocks and user feedback
- **Accessibility**: Semantic HTML and proper form labels
- **Security**: HTML escaping to prevent XSS attacks

## 🎨 Design Features

### Color Scheme
- **Primary**: Indigo (#6366f1)
- **Secondary**: Pink (#ec4899)
- **Success**: Green (#10b981)
- **Danger**: Red (#ef4444)
- **Gradients**: Beautiful gradient backgrounds

### Animations
- Smooth fade-in animations on page load
- Hover effects on interactive elements
- Toast notification animations
- Table row hover effects
- Button press animations

### Responsive Breakpoints
- **Desktop**: Full-featured layout
- **Tablet**: Optimized for medium screens
- **Mobile**: Single-column layout with touch-friendly buttons

## 📱 Features Details

### Add Meal Form
- Auto-focus on meal name input
- Enter key support for quick addition
- Auto-reset form after successful addition
- Clear visual feedback on all interactions

### Meal Table
- Sortable-looking rows with alternating backgrounds
- Color-coded meal types
- Calorie badges with icons
- Action buttons for edit and delete
- Empty state message with emoji

### Search & Filter
- Real-time search as you type
- Filter by specific day
- Combination search and day filtering
- Shows helpful message when no results found

### Export
- CSV format with proper headers
- Includes all meal information
- Timestamped filename (YYYY-MM-DD)
- One-click download

## 💾 Local Storage

The application automatically saves all meals to your browser's LocalStorage. This means:
- Your data persists even after closing the browser
- No server required
- Works offline
- Data stored locally on your device

## 🔒 Security

- HTML escaping prevents XSS attacks
- Input validation on all forms
- Confirmation dialogs for destructive actions
- Safe JSON parsing with error handling

## 📊 Example Data

The app comes ready to use with no pre-loaded data. Start by adding some meals:

```
Day: Monday
Meal Type: Breakfast
Name: Oatmeal with Berries
Calories: 350
```

## 🎯 Use Cases

- **Meal Planning**: Plan your entire week's meals
- **Diet Tracking**: Monitor your daily calorie intake
- **Nutrition Management**: Keep track of nutritional habits
- **Meal Prep**: Organize your meal preparation schedule
- **Family Planning**: Plan meals for the whole family

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**DacodeyTech** - Daily Food Table Generator

---

**Made with ❤️ and modern web technologies**

*Last Updated: May 27, 2025*
