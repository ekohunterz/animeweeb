export default defineEventHandler((event) => {
  const id = [...event.node.req.url.split("/")].pop();
  const config = useRuntimeConfig();
  return $fetch(`${config.public.apiBase}/anime/${id}/full`, {
    method: "GET",
  });
});
