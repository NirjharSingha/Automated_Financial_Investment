export function getLastNMonths(n) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const currentMonth = today.getMonth();

  const lastNMonths = [];
  for (let i = 0; i < n; i++) {
    const index = (currentMonth - i + 12) % 12; // Ensure positive index
    lastNMonths.push(months[index]);
  }

  return lastNMonths;
}
