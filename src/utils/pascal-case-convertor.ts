export function convert_to_pascal(string: string): string {
  const splitted_string = string.split("_");

  for (let i = 0; i < splitted_string.length; i++) {
    const element = splitted_string[i];
    splitted_string[i] = element[0].toUpperCase() + element.slice(1);
  }

  return splitted_string.join(" ");
}

export function convert_from_pascal(string: string): string {
  const splitted_string = string.split(" ");

  for (let i = 0; i < splitted_string.length; i++) {
    const element = splitted_string[i];
    splitted_string[i] = element[0].toLowerCase() + element.slice(1);
  }

  return splitted_string.join("_");
}
