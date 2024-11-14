export async function postApi(url: string, option?: any) {
  const response = await fetch(url, option);
  const newUser = await response.json();
  console.log(newUser);
}
