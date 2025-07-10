/* Presets */

const slider_groups = [
    {
        name: "fruit",
        rates: [15, 0, 0]
    },
    {
        name: "veg",
        rates: [5, 2, 0]
    },
    {
        name: "milk",
        rates: [12, 8, 3]
    }
];

const fill_groups = [
    {
        name: "starch",
        rates: [15, 3, 1],
        goal_index: 0
    },
    {
        name: "pro",
        rates: [0, 7, 4],
        goal_index: 1
    },
    {
        name: "fat",
        rates: [0, 0, 5],
        goal_index: 2
    }
];

/* Query Selectors */

const table = document.querySelector(".js-table");
const slider_group_template = document.querySelector(".js-slider-group-template");
const fill_group_template = document.querySelector(".js-fill-group-template");
const last_row = document.querySelector(".js-last-row");
const goal_nutrients = Array.from(document.querySelectorAll(".js-goal-nutrient"));
const calculated_nutrients = Array.from(document.querySelectorAll(".js-calculated-nutrient"));

/* Slider Groups */

for (const group of slider_groups) {
    // Clone template
    const new_row = slider_group_template.content.cloneNode(true).firstElementChild;

    // Query-select elements
    const slider = new_row.querySelector(".js-slider");
    const servings = new_row.querySelector(".js-servings");
    const servings_label = new_row.querySelector(".js-servings-label");
    const name_label = new_row.querySelector(".js-name-label");
    const nutrients = Array.from(new_row.querySelectorAll(".js-nutrient"));
    const nutrient_cells = Array.from(new_row.querySelectorAll(".js-nutrient-cell"));
    const rates = Array.from(new_row.querySelectorAll(".js-rate"));
    const rate_cells = Array.from(new_row.querySelectorAll(".js-rate-cell"));

    // Set 'id' and 'for' attributes for inputs and labels
    slider.setAttribute("id", `html-${group.name}-slider`);
    servings_label.setAttribute("for", `html-${group.name}-slider`);
    name_label.setAttribute("for", `html-${group.name}-slider`);

    // Set nutrient name and exchange rates
    name_label.innerText = group.name.toUpperCase();
    for (let i = 0; i < rates.length; ++i) {
        rates[i].value = group.rates[i];
    }

    // Attach event listeners
    slider.addEventListener("input", () => {
        servings.value = slider.value;
        updateNutrientDisplays();
    });

    for (let i = 0; i < nutrient_cells.length; ++i) {
        nutrient_cells[i].addEventListener("mouseenter", ({relatedTarget}) => {
            if (!isHoverableElement(relatedTarget)) {
                showRateCells();
            }
        });

        rate_cells[i].addEventListener("mouseenter", ({relatedTarget}) => {
            if (!isHoverableElement(relatedTarget)) {
                showRateCells();
            }
        });

        nutrient_cells[i].addEventListener("mouseleave", ({relatedTarget}) => {
            if (!isHoverableElement(relatedTarget)) {
                hideRateCells();
            }
        });

        rate_cells[i].addEventListener("mouseleave", ({relatedTarget}) => {
            if (!isHoverableElement(relatedTarget)) {
                hideRateCells();
            }
        });
    }

    for (let i = 0; i < rates.length; ++i) {
        rates[i].addEventListener("input", ({target}) => {
            group.rates[i] = target.value;
            updateNutrientDisplays();
        });
    }

    // Insert new row to table
    last_row.parentNode.insertBefore(new_row, last_row);

    // Save food group's servings count for future calculations
    group.servings = servings;

    // Define hoisted utility functions
    function updateNutrientDisplays() {
        for (let i = 0; i < nutrients.length; ++i) {
            nutrients[i].value = `${rates[i].value * servings.value} g`;
        }
    }

    function showRateCells() {
        for (const cell of rate_cells) {
            cell.style.setProperty("opacity", "1");
        }
    }

    function hideRateCells() {
        for (const cell of rate_cells) {
            cell.style.removeProperty("opacity");
        }
    }

    function isHoverableElement(element) {
        return nutrient_cells.includes(element) || rate_cells.includes(element);
    }
}

/* Fill Groups */

for (const group of fill_groups) {
    // Clone template
    const new_row = fill_group_template.content.cloneNode(true).firstElementChild;

    // Query-select elements
    const servings = new_row.querySelector(".js-servings");
    const name_cell = new_row.querySelector(".js-name-cell");
    const nutrients = Array.from(new_row.querySelectorAll(".js-nutrient"));
    const nutrient_cells = Array.from(new_row.querySelectorAll(".js-nutrient-cell"));
    const rates = Array.from(new_row.querySelectorAll(".js-rate"));
    const rate_cells = Array.from(new_row.querySelectorAll(".js-rate-cell"));

    // Set nutrient name and exchange rates
    name_cell.innerText = group.name.toUpperCase();
    for (let i = 0; i < rates.length; ++i) {
        rates[i].value = group.rates[i];
    }

    // Attach event listeners
    for (let i = 0; i < nutrient_cells.length; ++i) {
        nutrient_cells[i].addEventListener("mouseenter", ({relatedTarget}) => {
            if (!isHoverableElement(relatedTarget)) {
                showRateCells();
            }
        });

        rate_cells[i].addEventListener("mouseenter", ({relatedTarget}) => {
            if (!isHoverableElement(relatedTarget)) {
                showRateCells();
            }
        });

        nutrient_cells[i].addEventListener("mouseleave", ({relatedTarget}) => {
            if (!isHoverableElement(relatedTarget)) {
                hideRateCells();
            }
        });

        rate_cells[i].addEventListener("mouseleave", ({relatedTarget}) => {
            if (!isHoverableElement(relatedTarget)) {
                hideRateCells();
            }
        });
    }

    for (let i = 0; i < rates.length; ++i) {
        rates[i].addEventListener("input", ({target}) => {
            group.rates[i] = target.value;
            updateNutrientDisplays();
        });
    }

    // Insert new row to table
    last_row.parentNode.insertBefore(new_row, last_row);

    // Save food group's servings count for future calculations
    group.servings = servings;

    // Save updateNutrientDisplays function for future calculations
    group.updateNutrientDisplays = updateNutrientDisplays;

    // Define hoisted utility functions
    function updateNutrientDisplays() {
        for (let i = 0; i < nutrients.length; ++i) {
            nutrients[i].value = `${rates[i].value * servings.value} g`;
        }
    }

    function showRateCells() {
        for (const cell of rate_cells) {
            cell.style.setProperty("opacity", "1");
        }
    }

    function hideRateCells() {
        for (const cell of rate_cells) {
            cell.style.removeProperty("opacity");
        }
    }

    function isHoverableElement(element) {
        return nutrient_cells.includes(element) || rate_cells.includes(element);
    }
}

/* Final Calculations */

table.addEventListener("input", () => {
    for (let i = 0; i < fill_groups.length; ++i) {
        const group = fill_groups[i];
        const goal_index = group.goal_index;
        const goal_amount = goal_nutrients[goal_index].value;
        const rate = group.rates[goal_index];

        let subtotal = 0;
        for (const group of slider_groups) {
            subtotal += group.servings.value * group.rates[goal_index];
        }
        for (let j = 0; j < i; ++j) {
            const group = fill_groups[j];
            subtotal += group.servings.value * group.rates[goal_index];
        }
        const remaining = goal_amount - subtotal;

        group.servings.value = Math.round(remaining / rate);
        group.updateNutrientDisplays();
    }

    const total_nutrients = [0, 0, 0];
    for (const group of slider_groups) {
        for (let i = 0; i < total_nutrients.length; ++i) {
            total_nutrients[i] += group.servings.value * group.rates[i];
        }
    }
    for (const group of fill_groups) {
        for (let i = 0; i < total_nutrients.length; ++i) {
            total_nutrients[i] += group.servings.value * group.rates[i];
        }
    }

    for (let i = 0; i < calculated_nutrients.length; ++i) {
        calculated_nutrients[i].value = `${total_nutrients[i]} g`
    }
});