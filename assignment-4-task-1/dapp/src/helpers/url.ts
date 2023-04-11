const correctURLs = (urls: any) => {
  let resUrls = []

  for (let i = 0; i < urls.length; i++) {
    resUrls.push(convertURL(urls[i]))
  }

  return resUrls
}

const convertURL = (url: string) => {
  if (url.startsWith('ipfs://'))
    return `https://ipfs.io/ipfs/${url.split('ipfs://')[1]}`
}

export default correctURLs
