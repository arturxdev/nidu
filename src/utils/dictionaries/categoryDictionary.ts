import { v5 as uuidv5 } from "uuid";

const MY_NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";

export const categoryArrayWithId = [
  {
    id: uuidv5("subscriptions", MY_NAMESPACE),
    label: "Suscripciones",
    emoji: "🔐",
    color: "#f9d4a1",
    key: "subscriptions",
  },
  {
    id: uuidv5("food", MY_NAMESPACE),
    label: "Comida",
    emoji: "🍽",
    color: "#f9d4a1",
    key: "food",
  },
  {
    id: uuidv5("shopping", MY_NAMESPACE),
    label: "Compras",
    emoji: "🛍",
    color: "#fad02e",
    key: "shopping",
  },
  {
    id: uuidv5("transportationandvehicle", MY_NAMESPACE),
    label: "Transporte y vehículo",
    emoji: "🚕",
    color: "#afeeee",
    key: "transportationandvehicle",
  },
  {
    id: uuidv5("cash", MY_NAMESPACE),
    label: "Efectivo",
    emoji: "💵",
    color: "#c7ecee",
    key: "cash",
  },
  {
    id: uuidv5("savingsandinvestment", MY_NAMESPACE),
    label: "Ahorro e inversión",
    emoji: "💰",
    color: "#a8dadc",
    key: "savingsandinvestment",
  },
  {
    id: uuidv5("education", MY_NAMESPACE),
    label: "Educación",
    emoji: "🎓",
    color: "#afeeee",
    key: "education",
  },
  {
    id: uuidv5("entertainment", MY_NAMESPACE),
    label: "Entretenimiento",
    emoji: "🎉",
    color: "#f4acb7",
    key: "entertainment",
  },
  {
    id: uuidv5("familyandfriends", MY_NAMESPACE),
    label: "Familia y amigos",
    emoji: "👨‍👩‍👦",
    color: "#f9d4a1",
    key: "familyandfriends",
  },
  {
    id: uuidv5("mortgageandloans", MY_NAMESPACE),
    label: "Hipoteca y préstamos",
    emoji: "🏠",
    color: "#a8dadc",
    key: "mortgageandloans",
  },
  {
    id: uuidv5("home", MY_NAMESPACE),
    label: "Hogar",
    emoji: "🏠",
    color: "#c7ecee",
    key: "home",
  },
  {
    id: uuidv5("taxes", MY_NAMESPACE),
    label: "Impuestos",
    emoji: "📝",
    color: "#f4acb7",
    key: "taxes",
  },
  {
    id: uuidv5("internetandphone", MY_NAMESPACE),
    label: "Internet y teléfono",
    emoji: "🌐",
    color: "#afeeee",
    key: "internetandphone",
  },
  {
    id: uuidv5("pets", MY_NAMESPACE),
    label: "Mascotas",
    emoji: "🐾",
    color: "#fad02e",
    key: "pets",
  },
  {
    id: uuidv5("gifts", MY_NAMESPACE),
    label: "Regalos",
    emoji: "🎁",
    color: "#c7ecee",
    key: "gifts",
  },
  {
    id: uuidv5("salary", MY_NAMESPACE),
    label: "Salario",
    emoji: "💵",
    color: "#a8dadc",
    key: "salary",
  },
  {
    id: uuidv5("health", MY_NAMESPACE),
    label: "Salud",
    emoji: "🏥",
    color: "#afeeee",
    key: "health",
  },
  {
    id: uuidv5("insurance", MY_NAMESPACE),
    label: "Seguros",
    emoji: "🛡",
    color: "#f4acb7",
    key: "insurance",
  },
  {
    id: uuidv5("supermarkets", MY_NAMESPACE),
    label: "Supermercados",
    emoji: "🛒",
    color: "#c7ecee",
    key: "supermarkets",
  },
  {
    id: uuidv5("owntransfers", MY_NAMESPACE),
    label: "Traspasos propios",
    emoji: "🔄",
    color: "#fad02e",
    key: "owntransfers",
  },
  {
    id: uuidv5("travel", MY_NAMESPACE),
    label: "Viajes",
    emoji: "🏖️",
    color: "#a8dadc",
    key: "travel",
  },
];

export const getCategoryById = (id: string) => {
  return categoryArrayWithId.find((category) => category.id === id);
};

interface CategoryDictionary {
  [key: string]: any;
}

//
export const categoryDictionary: CategoryDictionary = {
  uncategorized: {
    label: "Sin categoría",
    emoji: "?",
    color: "#b1b1b1",
    id: "uncategorized",
  },
};

categoryArrayWithId.forEach((category) => {
  categoryDictionary[category.key] = {
    label: category.label,
    emoji: category.emoji,
    color: category.color,
    id: category.id,
  };
});

export const categories = Object.entries(categoryDictionary).map(
  ([key, value]) => ({
    label: value.label,
    value: key,
    emoji: value.emoji,
  })
);
