export const removeGrammarlyTab = () => {
  const grammarlyShadowRoot = document.querySelector(
    '[data-grammarly-shadow-root="true"]'
  )?.shadowRoot;
  if (!grammarlyShadowRoot) return false;
  const grammarlyBtn = grammarlyShadowRoot?.querySelector(
    'button[data-grammarly-part="gbutton"]'
  );
  if (!grammarlyBtn) return false;
  grammarlyBtn?.setAttribute('tabindex', '-1');
  return true;
};
