export default defineEventHandler((event) => {
  const { query } = getQuery(event);
  const config = useRuntimeConfig();
  return $fetch(`${config.public.apiBase}/anime?q=${query}`);
});
