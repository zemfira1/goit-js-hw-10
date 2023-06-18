const options = {
  headers: {
    'x-api-key':
      'live_iMnL9DzHqf7dJWaUEt317EfvSqu1gXna3gDSPNbxDpVQ7uxzNMueVgXL793JiuHF',
  },
};

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', options)
    .then(r => r.json())
    .catch(error => console.log(error));
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    options
  )
    .then(res => res.json())
    .catch(error => console.log(error));
}
