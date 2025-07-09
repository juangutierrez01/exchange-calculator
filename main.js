/* Presets */

const slider_groups = [
    {
        name: "fruit",
        cho_rate: 15,
        pro_rate: 0,
        fat_rate: 0
    },
    {
        name: "veg",
        cho_rate: 5,
        pro_rate: 2,
        fat_rate: 0
    },
    {
        name: "milk",
        cho_rate: 12,
        pro_rate: 8,
        fat_rate: 3
    }
];

const fill_groups = [
    {
        name: "starch",
        goal_name: "cho",
        cho_rate: 15,
        pro_rate: 3,
        fat_rate: 1
    },
    {
        name: "pro",
        goal_name: "pro",
        cho_rate: 0,
        pro_rate: 7,
        fat_rate: 4
    },
    {
        name: "fat",
        goal_name: "fat",
        cho_rate: 0,
        pro_rate: 0,
        fat_rate: 5
    }
];

/* Query Selectors */

const table = document.querySelector(".js-table");
const slider_group_template = document.querySelector(".js-slider-group-template");
const fill_group_template = document.querySelector(".js-fill-group-template");
const last_row = document.querySelector(".js-last-row");
const calculated_cho = document.querySelector(".js-calculated-cho");
const calculated_pro = document.querySelector(".js-calculated-pro");
const calculated_fat = document.querySelector(".js-calculated-fat");

/* Slider Groups */

for (const group of slider_groups) {
    const new_row = slider_group_template.content.cloneNode(true).firstElementChild;

    const slider = new_row.querySelector(".js-slider");
    const servings = new_row.querySelector(".js-servings");
    const servings_label = new_row.querySelector(".js-servings-label");
    const name_label = new_row.querySelector(".js-name-label");
    const cho = new_row.querySelector(".js-cho");
    const cho_cell = new_row.querySelector(".js-cho-cell");
    const cho_rate = new_row.querySelector(".js-cho-rate");
    const cho_rate_cell = new_row.querySelector(".js-cho-rate-cell");
    const pro = new_row.querySelector(".js-pro");
    const pro_cell = new_row.querySelector(".js-pro-cell");
    const pro_rate = new_row.querySelector(".js-pro-rate");
    const pro_rate_cell = new_row.querySelector(".js-pro-rate-cell");
    const fat = new_row.querySelector(".js-fat");
    const fat_cell = new_row.querySelector(".js-fat-cell");
    const fat_rate = new_row.querySelector(".js-fat-rate");
    const fat_rate_cell = new_row.querySelector(".js-fat-rate-cell");

    slider.setAttribute("id", `html-${group.name}-slider`);
    servings_label.setAttribute("for", `html-${group.name}-slider`);
    name_label.setAttribute("for", `html-${group.name}-slider`);
    name_label.innerText = group.name.toUpperCase();
    cho_rate.value = group.cho_rate;
    pro_rate.value = group.pro_rate;
    fat_rate.value = group.fat_rate;

    function updateChoProFatDisplays() {
        cho.value = `${group.cho_rate * servings.value} g`;
        pro.value = `${group.pro_rate * servings.value} g`;
        fat.value = `${group.fat_rate * servings.value} g`;
    }

    slider.addEventListener("input", () => {
        servings.value = slider.value;
        updateChoProFatDisplays();
    });

    new_row.addEventListener("mouseover", () => {
        cho_cell.setAttribute("colspan", 1);
        pro_cell.setAttribute("colspan", 1);
        fat_cell.setAttribute("colspan", 1);
        cho_rate_cell.removeAttribute("hidden");
        pro_rate_cell.removeAttribute("hidden");
        fat_rate_cell.removeAttribute("hidden");
    });

    new_row.addEventListener("mouseleave", () => {
        cho_cell.setAttribute("colspan", 2);
        pro_cell.setAttribute("colspan", 2);
        fat_cell.setAttribute("colspan", 2);
        cho_rate_cell.setAttribute("hidden", "hidden");
        pro_rate_cell.setAttribute("hidden", "hidden");
        fat_rate_cell.setAttribute("hidden", "hidden");
    });

    cho_rate.addEventListener("input", ({target: rate}) => {
        group.cho_rate = rate.value;
        updateChoProFatDisplays();
    });

    pro_rate.addEventListener("input", ({target: rate}) => {
        group.pro_rate = rate.value;
        updateChoProFatDisplays();
    });

    fat_rate.addEventListener("input", ({target: rate}) => {
        group.fat_rate = rate.value;
        updateChoProFatDisplays();
    });

    last_row.parentNode.insertBefore(new_row, last_row);

    group.servings = servings;
}

/* Fill Groups */

for (const group of fill_groups) {
    const new_row = fill_group_template.content.cloneNode(true).firstElementChild;

    const servings = new_row.querySelector(".js-servings");
    const name_cell = new_row.querySelector(".js-name-cell");
    const cho = new_row.querySelector(".js-cho");
    const pro = new_row.querySelector(".js-pro");
    const fat = new_row.querySelector(".js-fat");
    const goal = document.querySelector(`.js-goal-${group.goal_name}`);

    name_cell.innerText = group.name.toUpperCase();

    last_row.parentNode.insertBefore(new_row, last_row);

    group.servings = servings;
    group.goal = goal;
    group.updateChoProFatDisplays = function() {
        cho.value = `${group.cho_rate * servings.value} g`;
        pro.value = `${group.pro_rate * servings.value} g`;
        fat.value = `${group.fat_rate * servings.value} g`;
    }
}

/* Final Calculations */

table.addEventListener("input", () => {
    for (let i = 0; i < fill_groups.length; ++i) {
        const group = fill_groups[i];
        const goal_name = group.goal_name;
        const goal_amount = group.goal.value;
        const rate = group[`${goal_name}_rate`];

        let subtotal = 0;
        for (const group of slider_groups) {
            subtotal += group.servings.value * group[`${goal_name}_rate`];
        }
        for (let j = 0; j < i; ++j) {
            const group = fill_groups[j];
            subtotal += group.servings.value * group[`${goal_name}_rate`];
        }
        const remaining = goal_amount - subtotal;

        group.servings.value = Math.round(remaining / rate);
        group.updateChoProFatDisplays();
    }

    let total_cho = 0;
    let total_pro = 0;
    let total_fat = 0;
    for (const group of slider_groups) {
        total_cho += group.servings.value * group.cho_rate;
        total_pro += group.servings.value * group.pro_rate;
        total_fat += group.servings.value * group.fat_rate;
    }
    for (const group of fill_groups) {
        total_cho += group.servings.value * group.cho_rate;
        total_pro += group.servings.value * group.pro_rate;
        total_fat += group.servings.value * group.fat_rate;
    }
    calculated_cho.value = `${total_cho} g`;
    calculated_pro.value = `${total_pro} g`;
    calculated_fat.value = `${total_fat} g`;
});