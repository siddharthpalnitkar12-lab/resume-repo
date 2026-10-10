export const lenisRef = { current: null };

export const scrollToId = (e, id) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: "smooth" });
};
