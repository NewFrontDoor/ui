export function toSlate(content) {
  const standardMarks = new Set([
    'strong',
    'code',
    'em',
    'underline',
    'strike-through'
  ]);

  return content.map((block) => {
    let defsKey;
    if (block.markDefs) {
      defsKey = block.markDefs.map((def) => def._key);
    }

    return {
      ...(block.style === 'normal' && {type: 'paragraph'}),
      ...(block.style === 'h1' && {type: 'heading-one'}),
      ...(block.style === 'h2' && {type: 'heading-two'}),
      ...(block.style === 'h3' && {type: 'heading-three'}),
      ...(block.style === 'h4' && {type: 'heading-four'}),
      ...(block.style === 'h5' && {type: 'heading-five'}),
      ...(block.style === 'blockquote' && {type: 'block-quote'}),
      ...(block.listItem === 'number' && {type: 'numbered-list'}),
      ...(block.listItem === 'bullet' && {type: 'bulleted-list'}),
      ...(block.markDefs ? '' : ''),
      children: block.children.map((item) => {
        if (item.marks.some((r) => defsKey.includes(r))) {
          const customMarks = item.marks.filter(
            (item) => !standardMarks.has(item)
          );
          const inherentMarks = item.marks.filter((item) =>
            standardMarks.has(item)
          );
          // Const definition = block.markDefs.filter(r => r._key === )
          return {
            type: 'link',
            url: block.markDefs[0].href,
            children: [{text: item.text, ...spreadMarks(inherentMarks)}]
          };
        }

        return {
          text: item.text,
          ...spreadMarks(item.marks)
        };
      })
    };
  });
}

function spreadMarks(marks) {
  const object = {};
  if (marks.includes('strong')) {
    object.bold = true;
  }

  if (marks.includes('code')) {
    object.code = true;
  }

  if (marks.includes('em')) {
    object.italic = true;
  }

  return object;
}
