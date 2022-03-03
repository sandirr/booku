const FAV = 'booku_sandi_favorite';
    
export function clearStorage(){
  localStorage.removeItem(FAV);
}

export async function addFav(data){
  const currentFav = await getFav() || [];

  const dataAlreadyExist = await currentFav.filter(fav=> fav.id === data.id);
  if(!dataAlreadyExist.length){
    await currentFav.push(data);
  }

  localStorage.setItem(FAV, JSON.stringify(currentFav));
}

export function removeFav(id){
  const currentFav = getFav() || [];
  const newFav = currentFav.filter(fav => fav.id !== id);
  localStorage.setItem(FAV, JSON.stringify(newFav));
}

export function getFav() {
  const retval = localStorage.getItem(FAV);
  return JSON.parse(retval) || '';
}
