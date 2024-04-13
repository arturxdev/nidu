export const categoryArray = [
  { id: 1, label: "Ahorro e inversión", emoji: "💰", color: "#a8dadc" },
  { id: 2, label: "Compras", emoji: "🛍", color: "#fad02e" },
  { id: 3, label: "Efectivo", emoji: "💵", color: "#c7ecee" },
  { id: 4, label: "Educación", emoji: "🎓", color: "#afeeee" },
  { id: 5, label: "Entretenimiento", emoji: "🎉", color: "#f4acb7" },
  { id: 6, label: "Familia y amigos", emoji: "👨‍👩‍👦", color: "#f9d4a1" },
  { id: 7, label: "Hipoteca y préstamos", emoji: "🏠", color: "#a8dadc" },
  { id: 8, label: "Hogar", emoji: "🏠", color: "#c7ecee" },
  { id: 9, label: "Impuestos", emoji: "📝", color: "#f4acb7" },
  { id: 10, label: "Internet y teléfono", emoji: "🌐", color: "#afeeee" },
  { id: 11, label: "Mascotas", emoji: "🐾", color: "#fad02e" },
  { id: 12, label: "Regalos", emoji: "🎁", color: "#c7ecee" },
  { id: 13, label: "Comida", emoji: "🍽", color: "#f9d4a1" },
  { id: 14, label: "Salario", emoji: "💵", color: "#a8dadc" },
  { id: 15, label: "Salud", emoji: "🏥", color: "#afeeee" },
  { id: 16, label: "Seguros", emoji: "🛡", color: "#f4acb7" },
  { id: 17, label: "Supermercados", emoji: "🛒", color: "#c7ecee" },
  { id: 18, label: "Suscripciones", emoji: "🔐", color: "#f9d4a1" },
  { id: 19, label: "Transporte y vehículo", emoji: "🚕", color: "#afeeee" },
  { id: 20, label: "Traspasos propios", emoji: "🔄", color: "#fad02e" },
  { id: 21, label: "Viajes", emoji: "🏖️", color: "#a8dadc" },
];

// Example of how to create the categoryDictionary
interface CategoryDictionary {
  [key: string]: any;
}

export const categoryDictionary: CategoryDictionary = {};

categoryArray.forEach((category) => {
  categoryDictionary[category.label.toUpperCase().replace(/\s/g, "_")] = {
    label: category.label,
    emoji: category.emoji,
    color: category.color,
  };
});

export const categories = Object.entries(categoryDictionary).map(
  ([key, value]) => ({
    label: value.label,
    value: key,
    emoji: value.emoji,
  })
);
