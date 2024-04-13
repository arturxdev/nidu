export const categoryArray = [
  { label: "Ahorro e inversión", emoji: "💰", color: "#a8dadc" },
  { label: "Compras", emoji: "🛍", color: "#fad02e" },
  { label: "Educación", emoji: "🎓", color: "#afeeee" },
  { label: "Efectivo", emoji: "💵", color: "#c7ecee" },
  { label: "Entretenimiento", emoji: "🎉", color: "#f4acb7" },
  { label: "Familia y amigos", emoji: "👨‍👩‍👦", color: "#f9d4a1" },
  { label: "Hipoteca y préstamos", emoji: "🏠", color: "#a8dadc" },
  { label: "Hogar", emoji: "🏠", color: "#c7ecee" },
  { label: "Impuestos", emoji: "📝", color: "#f4acb7" },
  { label: "Internet y teléfono", emoji: "🌐", color: "#afeeee" },
  { label: "Mascotas", emoji: "🐾", color: "#fad02e" },
  { label: "Regalos", emoji: "🎁", color: "#c7ecee" },
  { label: "Comida", emoji: "🍽", color: "#f9d4a1" },
  { label: "Salario", emoji: "💵", color: "#a8dadc" },
  { label: "Salud", emoji: "🏥", color: "#afeeee" },
  { label: "Seguros", emoji: "🛡", color: "#f4acb7" },
  { label: "Supermercados", emoji: "🛒", color: "#c7ecee" },
  { label: "Suscripciones", emoji: "🔐", color: "#f9d4a1" },
  { label: "Transporte y vehículo", emoji: "🚕", color: "#afeeee" },
  { label: "Traspasos propios", emoji: "🔄", color: "#fad02e" },
  { label: "Viajes", emoji: "🏖️", color: "#a8dadc" },
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
