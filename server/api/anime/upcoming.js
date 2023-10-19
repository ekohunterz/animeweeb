export default defineEventHandler((event) => {
  const { page, filter } = getQuery(event);
  const config = useRuntimeConfig();
  return $fetch(`${config.public.apiBase}/seasons/upcoming?filter=${filter}&page=${page}`);
});
