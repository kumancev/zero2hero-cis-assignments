import axios from 'axios'

const getNftData = async (urls: any) => {
  let nftData = []

  for (let i = 0; i < urls.length; i++) {
    try {
      const { data, status } = await axios.get(urls[i], {
        headers: {
          Accept: 'application/json',
        },
      })
      nftData.push(data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('error message: ', error.message)
        return error.message
      } else {
        console.error('unexpected error: ', error)
        return 'An unexpected error occurred'
      }
    }
  }

  return nftData
}

export default getNftData
