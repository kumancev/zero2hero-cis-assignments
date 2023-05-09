const correctURLs = (urls: any): Array<string | undefined> => {
  let resUrls = <Array<string | undefined>>[]

  for (let i = 0; i < urls.length; i++) {
    resUrls.push(convertURL(urls[i]))
  }

  return resUrls
}

const convertURL = (url: string): string | undefined => {
  if (url.startsWith('ipfs://'))
    return `https://ipfs.io/ipfs/${url.split('ipfs://')[1]}`
}

export default correctURLs
