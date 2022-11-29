export function base_url(): string {
  const base_url: string | undefined = import.meta.env.DEV
    ? "/api"
    : "https://goat-dev.plan4better.de/api/v1/";
  return base_url || "";
}
