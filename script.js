// ==================== DAILY FOOD TABLE GENERATOR ==================== //

class FoodTableManager {
    constructor() {
        this.meals = this.loadFromLocalStorage();
        this.filteredMeals = [...this.meals];
        this.initializeElements();
        this.attachEventListeners();
        this.renderTable();
        this.updateStatistics();
    }

    // ==================== INITIALIZATION ==================== //
    initializeElements() {
        // Input elements
        this.mealNameInput = document.getElementById('mealName');
        this.mealDaySelect = document.getElementById('mealDay');
        this.mealTypeSelect = document.getElementById('mealType');
        this.caloriesInput = document.getElementById('calories');

        // Button elements
        this.addBtn = document.getElementById('addBtn');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        this.exportBtn = document.getElementById('exportBtn');

        // Filter elements
        this.searchInput = document.getElementById('searchInput');
        this.filterDay = document.getElementById('filterDay');

        // Table elements
        this.tableBody = document.getElementById('tableBody');
        this.mealTable = document.getElementById('mealTable');

        // Stats elements
        this.statsSection = document.getElementById('statsSection');
        this.totalMealsSpan = document.getElementById('totalMeals');
        this.totalCaloriesSpan = document.getElementById('totalCalories');
        this.avgCaloriesSpan = document.getElementById('avgCalories');
    }

    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.addMeal());
        this.clearAllBtn.addEventListener('click', () => this.clearAll());
        this.exportBtn.addEventListener('click', () => this.exportToCSV());
        this.searchInput.addEventListener('input', () => this.filterMeals());
        this.filterDay.addEventListener('change', () => this.filterMeals());

        // Allow adding meal with Enter key
        this.mealNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addMeal();
        });
    }

    // ==================== MEAL MANAGEMENT ==================== //
    addMeal() {
        const mealName = this.mealNameInput.value.trim();
        const mealDay = this.mealDaySelect.value;
        const mealType = this.mealTypeSelect.value;
        const calories = this.caloriesInput.value;

        // Validation
        if (!mealName) {
            this.showNotification('Please enter a meal name', 'error');
            return;
        }
        if (!mealDay) {
            this.showNotification('Please select a day', 'error');
            return;
        }
        if (!mealType) {
            this.showNotification('Please select a meal type', 'error');
            return;
        }

        const meal = {
            id: Date.now(),
            name: mealName,
            day: mealDay,
            type: mealType,
            calories: calories ? parseInt(calories) : null,
            createdAt: new Date().toLocaleString()
        };

        this.meals.push(meal);
        this.saveToLocalStorage();
        this.resetForm();
        this.renderTable();
        this.updateStatistics();
        this.showNotification('Meal added successfully! 🎉', 'success');
    }

    editMeal(id, newData) {
        const mealIndex = this.meals.findIndex(m => m.id === id);
        if (mealIndex !== -1) {
            this.meals[mealIndex] = { ...this.meals[mealIndex], ...newData };
            this.saveToLocalStorage();
            this.renderTable();
            this.updateStatistics();
            this.showNotification('Meal updated successfully!', 'success');
        }
    }

    deleteMeal(id) {
        if (confirm('Are you sure you want to delete this meal?')) {
            this.meals = this.meals.filter(m => m.id !== id);
            this.saveToLocalStorage();
            this.renderTable();
            this.updateStatistics();
            this.showNotification('Meal deleted successfully!', 'success');
        }
    }

    clearAll() {
        if (confirm('Are you sure you want to delete all meals? This action cannot be undone.')) {
            this.meals = [];
            this.saveToLocalStorage();
            this.renderTable();
            this.updateStatistics();
            this.showNotification('All meals cleared!', 'success');
        }
    }

    resetForm() {
        this.mealNameInput.value = '';
        this.mealDaySelect.value = '';
        this.mealTypeSelect.value = '';
        this.caloriesInput.value = '';
        this.mealNameInput.focus();
    }

    // ==================== FILTERING & SEARCHING ==================== //
    filterMeals() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const selectedDay = this.filterDay.value;

        this.filteredMeals = this.meals.filter(meal => {
            const matchesSearch = meal.name.toLowerCase().includes(searchTerm) ||
                                meal.type.toLowerCase().includes(searchTerm) ||
                                meal.day.toLowerCase().includes(searchTerm);
            const matchesDay = !selectedDay || meal.day === selectedDay;
            return matchesSearch && matchesDay;
        });

        this.renderTable();
    }

    // ==================== TABLE RENDERING ==================== //
    renderTable() {
        if (this.filteredMeals.length === 0) {
            this.tableBody.innerHTML = `
                <tr class="empty-state">
                    <td colspan="5">
                        ${this.meals.length === 0 
                            ? 'No meals added yet. Start planning your week! 🎯' 
                            : 'No meals found matching your search. 🔍'}
                    </td>
                </tr>
            `;
            return;
        }

        this.tableBody.innerHTML = this.filteredMeals.map(meal => `
            <tr>
                <td><strong>${meal.day}</strong></td>
                <td>
                    <span class="meal-type-badge ${meal.type.toLowerCase()}">
                        ${this.getMealTypeEmoji(meal.type)} ${meal.type}
                    </span>
                </td>
                <td>${this.escapeHtml(meal.name)}</td>
                <td>
                    ${meal.calories 
                        ? `<span class="calories-badge">${meal.calories} kcal</span>` 
                        : '<span style="color: #9ca3af;">-</span>'}
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-edit btn-small" onclick="foodManager.showEditForm(${meal.id})">
                            ✏️ Edit
                        </button>
                        <button class="btn btn-delete btn-small" onclick="foodManager.deleteMeal(${meal.id})">
                            🗑️ Delete
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // ==================== STATISTICS ==================== //
    updateStatistics() {
        const totalMeals = this.meals.length;
        const totalCalories = this.meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
        const avgCalories = totalMeals > 0 ? Math.round(totalCalories / totalMeals) : 0;

        this.totalMealsSpan.textContent = totalMeals;
        this.totalCaloriesSpan.textContent = totalCalories.toLocaleString();
        this.avgCaloriesSpan.textContent = avgCalories;

        // Show/hide stats section
        this.statsSection.style.display = totalMeals > 0 ? 'grid' : 'none';
    }

    // ==================== EXPORT FUNCTIONALITY ==================== //
    exportToCSV() {
        if (this.meals.length === 0) {
            this.showNotification('No meals to export!', 'error');
            return;
        }

        const headers = ['Day', 'Meal Type', 'Meal Name', 'Calories', 'Created At'];
        const csvContent = [
            headers.join(','),
            ...this.meals.map(meal => [
                meal.day,
                meal.type,
                `"${meal.name}"`,
                meal.calories || 'N/A',
                meal.createdAt
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `meal-plan-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showNotification('Meal plan exported successfully! 📥', 'success');
    }

    // ==================== EDIT FUNCTIONALITY ==================== //
    showEditForm(id) {
        const meal = this.meals.find(m => m.id === id);
        if (!meal) return;

        this.mealNameInput.value = meal.name;
        this.mealDaySelect.value = meal.day;
        this.mealTypeSelect.value = meal.type;
        this.caloriesInput.value = meal.calories || '';

        this.addBtn.textContent = 'Update Meal';
        this.addBtn.onclick = () => {
            const updatedData = {
                name: this.mealNameInput.value.trim(),
                day: this.mealDaySelect.value,
                type: this.mealTypeSelect.value,
                calories: this.caloriesInput.value ? parseInt(this.caloriesInput.value) : null
            };

            if (updatedData.name && updatedData.day && updatedData.type) {
                this.editMeal(id, updatedData);
                this.resetForm();
                this.addBtn.textContent = 'Add Meal';
                this.addBtn.onclick = null;
                this.attachEventListeners();
            } else {
                this.showNotification('Please fill all required fields', 'error');
            }
        };

        this.mealNameInput.focus();
    }

    // ==================== LOCAL STORAGE ==================== //
    saveToLocalStorage() {
        try {
            localStorage.setItem('mealTableData', JSON.stringify(this.meals));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            this.showNotification('Error saving data', 'error');
        }
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('mealTableData');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return [];
        }
    }

    // ==================== UTILITY FUNCTIONS ==================== //
    getMealTypeEmoji(type) {
        const emojis = {
            'Breakfast': '🌅',
            'Lunch': '🌞',
            'Dinner': '🌙',
            'Snack': '🍿'
        };
        return emojis[type] || '🍽️';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        `;

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };

        notification.style.backgroundColor = colors[type] || colors.info;
        notification.style.color = 'white';
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ==================== INITIALIZATION ==================== //
let foodManager;

document.addEventListener('DOMContentLoaded', () => {
    foodManager = new FoodTableManager();

    // Add animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
