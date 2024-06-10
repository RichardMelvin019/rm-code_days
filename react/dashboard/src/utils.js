export function getFullYear() {
  const currentDate = new Date();
  return currentDate.getFullYear();
}

export function getFooterCopy(isIndex) {
  if (isIndex) {
    return 'Holberton School';
  }
  else {
    return 'Holberton School main dashboard';
  }
}
