const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
export const addProductsToUser = (userId, products) => {
  fetch(`https://amasong-88ebb-default-rtdb.firebaseio.com/shopping/.json`, {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      products: [...products],
      fecha: hoy.toLocaleDateString(),
    }),
  });
};
