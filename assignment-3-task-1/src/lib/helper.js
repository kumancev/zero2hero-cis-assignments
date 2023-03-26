export function getFromLocalStorage(key) {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key)
  }

  return null;
}

export function getFromSessionStorage(key) {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key)
  }

  return null
}

export const getTitleByChoice = (choice) => {
  switch (choice) {
    case 1:
      return 'paper'
    case 2:
      return 'scissors'
    case 3:
      return 'rock'
  }
}