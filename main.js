/* Presets */

const slider_groups = [
    {
        name: "fruit",
        exchange_cho: 15,
        exchange_pro: 0,
        exchange_fat: 0
    },
    {
        name: "veg",
        exchange_cho: 5,
        exchange_pro: 2,
        exchange_fat: 0
    },
    {
        name: "milk",
        exchange_cho: 12,
        exchange_pro: 8,
        exchange_fat: 3
    }
];

const fill_groups = [
    {
        name: "starch",
        goal_name: "cho",
        exchange_cho: 15,
        exchange_pro: 3,
        exchange_fat: 1
    },
    {
        name: "pro",
        goal_name: "pro",
        exchange_cho: 0,
        exchange_pro: 7,
        exchange_fat: 4
    },
    {
        name: "fat",
        goal_name: "fat",
        exchange_cho: 0,
        exchange_pro: 0,
        exchange_fat: 5
    }
];

/* Query selectors */

for (const group of slider_groups) {
    group.slider = document.querySelector(`.js-${group.name}-slider`);
    group.count = document.querySelector(`.js-${group.name}-count`);
    group.cho = document.querySelector(`.js-${group.name}-cho`);
    group.pro = document.querySelector(`.js-${group.name}-pro`);
    group.fat = document.querySelector(`.js-${group.name}-fat`);
}

for (const group of fill_groups) {
    group.goal = document.querySelector(`.js-goal-${group.goal_name}`);
    group.count = document.querySelector(`.js-${group.name}-count`);
    group.cho = document.querySelector(`.js-${group.name}-cho`);
    group.pro = document.querySelector(`.js-${group.name}-pro`);
    group.fat = document.querySelector(`.js-${group.name}-fat`);
}

const table = document.querySelector(".js-table");
const calculated_cho = document.querySelector(".js-calculated-cho");
const calculated_pro = document.querySelector(".js-calculated-pro");
const calculated_fat = document.querySelector(".js-calculated-fat");

/* Events */

for (const group of slider_groups) {
    group.slider.addEventListener("input", ({target: slider}) => {
        group.count.value = slider.value;
        group.cho.value = `${group.exchange_cho * slider.value} g`;
        group.pro.value = `${group.exchange_pro * slider.value} g`;
        group.fat.value = `${group.exchange_fat * slider.value} g`;
    });
}

table.addEventListener("input", () => {
    for (let i = 0; i < fill_groups.length; ++i) {
        const group = fill_groups[i];
        const goal_name = group.goal_name;
        const goal_amount = group.goal.value;
        const exchange_rate = group[`exchange_${goal_name}`];

        let subtotal = 0;
        for (const group of slider_groups) {
            subtotal += parseInt(group[goal_name].value);
        }
        for (let j = 0; j < i; ++j) {
            const group = fill_groups[j];
            subtotal += parseInt(group[goal_name].value);
        }
        const remaining = goal_amount - subtotal;

        group.count.value = Math.round(remaining / exchange_rate);
        group.cho.value = `${group.exchange_cho * group.count.value} g`;
        group.pro.value = `${group.exchange_pro * group.count.value} g`;
        group.fat.value = `${group.exchange_fat * group.count.value} g`;
    }
    
    let total_cho = 0;
    let total_pro = 0;
    let total_fat = 0;
    for (const group of slider_groups) {
        total_cho += parseInt(group.cho.value);
        total_pro += parseInt(group.pro.value);
        total_fat += parseInt(group.fat.value);
    }
    for (const group of fill_groups) {
        total_cho += parseInt(group.cho.value);
        total_pro += parseInt(group.pro.value);
        total_fat += parseInt(group.fat.value);
    }
    calculated_cho.value = `${total_cho} g`;
    calculated_pro.value = `${total_pro} g`;
    calculated_fat.value = `${total_fat} g`;
});