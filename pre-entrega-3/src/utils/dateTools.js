const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

const formattedDate = (dateString) => {
  const date = new Date(dateString);
  const timestamp = date.toLocaleDateString('es-ES', options);
  return timestamp; 
};

export { formattedDate };