const getCoordinates = async (address: any) => {
  const { street, city, state } = address;

  const query = `${street}, ${city}, ${state}, Brasil`;

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return { latitude: lat, longitude: lon };
    } else {
      console.error("Coordenadas não encontradas.");
      return { latitude: null, longitude: null };
    }
  } catch (error) {
    console.error("Erro ao obter coordenadas:", error);
    return { latitude: null, longitude: null };
  }
};

export default getCoordinates