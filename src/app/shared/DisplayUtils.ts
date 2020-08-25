/**
 * A function to call before passing a string to a markdown renderer.
 * @param value the value to debrace
 */
export function debrace(value: string): string {
  if (!value) {
    return value;
  }
  let renderedValue = value.replace(/>/g, '&gt;').replace(/</g, '&lt;');

  // if it replaced a <> in a markdown code block, change it back
  renderedValue = renderedValue.replace(/`.+?`/g, match => {
    return match.replace(/&gt;/, '>').replace(/&lt;/, '<');
  });

  return renderedValue;
}
