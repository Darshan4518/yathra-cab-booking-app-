export async function postApi(url: string, option?: any) {
try {
  const response = await fetch(url, option);
  if(!response.ok){
    new Error(`http error status: ${response.status}`)
  }
  return await response.json();
} catch (error) {
  console.log(error);
  throw error
}
}
