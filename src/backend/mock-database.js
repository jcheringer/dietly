const measureUnits = {
    0: 'À Vontade',
    1: 'Unidade(s)',
    2: 'Grama(s)',
    3: 'Colher(es)'
};

const foods = [
    {
        id: 1,
        name: 'Ovo',
        measureUnits: [{ id: 1, multiplier: 1 }, { id: 2, multiplier: 0.02 }]
    },
    {
        id: 2,
        name: 'Pão',
        measureUnits: [{ id: 1, multiplier: 1 }]
    },
    {
        id: 3,
        name: 'Patinho Moido',
        measureUnits: [{ id: 2, multiplier: 1 }]
    },
    {
        id: 4,
        name: 'Farinha de Tapioca',
        measureUnits: [{ id: 3, multiplier: 1 }]
    },
    {
        id: 5,
        name: 'Banana',
        measureUnits: [{ id: 1, multiplier: 1 }]
    },
    {
        id: 6,
        name: 'Aveia em Flocos',
        measureUnits: [{ id: 3, multiplier: 1 }]
    },
    {
        id: 7,
        name: 'Requeijão Light',
        measureUnits: [{ id: 3, multiplier: 1 }]
    },
    {
        id: 8,
        name: 'Arroz Integral',
        measureUnits: [{ id: 2, multiplier: 1 }]
    },
    {
        id: 9,
        name: 'Feijão',
        measureUnits: [{ id: 2, multiplier: 1 }]
    },
    {
        id: 10,
        name: 'Peito de Frango Grelhado',
        measureUnits: [{ id: 2, multiplier: 1 }]
    },
    {
        id: 11,
        name: 'Alface',
        measureUnits: [{ id: 0, multiplier: 1 }]
    },
    {
        id: 12,
        name: 'Tomate',
        measureUnits: [{ id: 0, multiplier: 1 }]
    },
    {
        id: 13,
        name: 'Cenoura Ralada',
        measureUnits: [{ id: 0, multiplier: 1 }]
    },
    {
        id: 14,
        name: 'Beterraba Ralada',
        measureUnits: [{ id: 0, multiplier: 1 }]
    }
];

const receipts = [
    {
        id: 1,
        name: 'Crepioca',
        ingredients: [
            { id: 1, measureUnit: 1, amount: 1 },
            { id: 3, measureUnit: 2, amount: 60 },
            { id: 4, measureUnit: 3, amount: 3 }
        ]
    },
    {
        id: 2,
        name: 'Sanduiche de Patinho',
        ingredients: [
            { id: 2, measureUnit: 1, amount: 2 },
            { id: 3, measureUnit: 2, amount: 60 },
            { id: 7, measureUnit: 3, amount: 1 }
        ]
    }
];

const diets = [
    {
        id: 1,
        name: 'Dieta 01',
        active: true,
        meals: [
            {
                id: 1,
                name: 'Desjejum',
                time: '09:30',
                receipts: [{ id: 1, measureUnit: 1, amount: 1 }],
                foods: []
            },
            {
                id: 2,
                name: 'Lanche Manhã',
                time: '11:30',
                receipts: [],
                foods: [
                    { id: 5, measureUnit: 1, amount: 1 },
                    { id: 6, measureUnit: 3, amount: 2 }
                ]
            },
            {
                id: 3,
                name: 'Almoço',
                time: '13:30',
                receipts: [],
                foods: [
                    { id: 8, measureUnit: 2, amount: 160 },
                    { id: 9, measureUnit: 2, amount: 80 },
                    { id: 10, measureUnit: 2, amount: 90 },
                    { id: 11, measureUnit: 0, amount: null },
                    { id: 12, measureUnit: 0, amount: null },
                    { id: 13, measureUnit: 0, amount: null },
                    { id: 14, measureUnit: 0, amount: null }
                ]
            }
        ]
    }
];

const dietSchedule = [
    {
        date: '2019-12-04',
        diet: {
            id: 1,
            meals: [
                {
                    id: 1,
                    receipts: [{ id: 1, measureUnit: 1, amount: 1, checked: true }],
                    foods: []
                },
                {
                    id: 2,
                    receipts: [],
                    foods: [
                        { id: 5, measureUnit: 1, amount: 1, checked: true },
                        { id: 6, measureUnit: 3, amount: 2, checked: false }
                    ]
                },
                {
                    id: 3,
                    receipts: [],
                    foods: [
                        { id: 8, measureUnit: 2, amount: 160 },
                        { id: 9, measureUnit: 2, amount: 80 },
                        { id: 10, measureUnit: 2, amount: 90 },
                        { id: 11, measureUnit: 0, amount: null },
                        { id: 12, measureUnit: 0, amount: null },
                        { id: 13, measureUnit: 0, amount: null },
                        { id: 14, measureUnit: 0, amount: null }
                    ]
                }
            ]
        }
    }
];

module.exports = {
    measureUnits,
    foods,
    receipts,
    diets,
    dietSchedule
};