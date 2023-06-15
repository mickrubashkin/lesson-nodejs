export const isValidUser = (user) => {
  if (Number.isNaN(user.age) || user.name === '') {
    return false;
  }

  return true;
}