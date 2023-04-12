const getStakedTokenIds = (data: any) => {
  let tokenIds = []

  for (let i = 0; i < data.length; i++) {
    tokenIds.push(data[i][1].toNumber())
  }

  return tokenIds
}

export default getStakedTokenIds
