export const formatDate = (dateInput: string | Date | undefined): string => {
  if (!dateInput) return "";
  
  const d = new Date(dateInput);
  
  // Check if date is invalid
  if (isNaN(d.getTime())) return String(dateInput);

  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(-2);
  
  return `${dd}:${mm}:${yy}`;
};
