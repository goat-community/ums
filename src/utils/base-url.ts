export function base_url(): string {
  const base_url: string | undefined = import.meta.env.DEV
    ? "/api"
    : "https://goat.plan4better.de/api/v1/";
  return base_url || "";
}

export function base_lambda_url(): string {
  const base_url: string | undefined = import.meta.env.DEV
    ? "/local"
    : "https://dfvz2uuq63.execute-api.eu-central-1.amazonaws.com/Prod/";
  return base_url || "";
}
