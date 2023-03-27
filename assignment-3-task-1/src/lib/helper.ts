export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key)
  }

  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key)
  }

  return null
}

export function getTitleByChoice(choice: number | null): string | null {
  switch (choice) {
    case 1:
      return 'paper'
    case 2:
      return 'scissors'
    case 3:
      return 'rock'
  }

  return null
}