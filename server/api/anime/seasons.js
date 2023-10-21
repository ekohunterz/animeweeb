export default defineEventHandler((event) => {
  const { year, season, page, filter } = getQuery(event);
  const config = useRuntimeConfig();
  return $fetch(`${config.public.apiBase}/seasons/${year}/${season}?filter=${filter}&page=${page}`);
});
