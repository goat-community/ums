export function base_url(): string {
  const base_url: string | undefined = import.meta.env.DEV
    ? "/api"
    : "https://goat-dev.plan4better.de/api/v1/";
  return base_url || "";
}

export function base_lambda_url(): string {
  const base_url: string | undefined = import.meta.env.DEV
    ? "/local"
    : "https://auys8w4hm1.execute-api.eu-central-1.amazonaws.com/Prod/";
  return base_url || "";
}
