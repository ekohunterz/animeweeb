export default defineEventHandler((event) => {
  const { page, filter } = getQuery(event);
  const config = useRuntimeConfig();
  return $fetch(`${config.public.apiBase}/seasons/now?filter=${filter}&page=${page}`);
});
