const open = '{x}';
const close = '{/x}';

export function splitHighlight(template: string): [string, string, string] {
  const start = template.indexOf(open);
  const end = template.indexOf(close);
  if (start === -1 || end === -1 || end < start) {
    return [template, '', ''];
  }
  return [
    template.slice(0, start),
    template.slice(start + open.length, end),
    template.slice(end + close.length),
  ];
}
