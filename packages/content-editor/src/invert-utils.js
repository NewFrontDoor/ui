export function toSlate(content) {
  return content.map(block => {
    let defsKey;
    if (block.markDefs) {
      defsKey = block.markDefs.map(def => def._key);
    }

    return {
      ...(block.style === 'normal' && {type: 'paragraph'}),
      ...(block.style === 'blockquote' && {type: 'block-quote'}),
      ...(block.style === 'h1' && {type: 'heading-one'}),
      ...(block.style === 'h2' && {type: 'heading-two'}),
      ...(block.style === 'h3' && {type: 'heading-three'}),
      ...(block.style === 'h4' && {type: 'heading-four'}),
      ...(block.style === 'h5' && {type: 'heading-five'}),
      ...(block.listItem === 'number' && {type: 'numbered-list'}),
      ...(block.listItem === 'bullet' && {type: 'bulleted-list'}),
      ...(block.markDefs ? '' : ''),
      children: block.children.map(item => {
        if (item.marks.some(r => defsKey.includes(r))) {
          return {
            type: 'link',
            url: block.markDefs[0].href,
            children: [{text: item.text}]
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
  const obj = {};
  if (marks.includes('strong')) {
    obj.bold = true;
  }

  if (marks.includes('code')) {
    obj.code = true;
  }

  if (marks.includes('em')) {
    obj.italic = true;
  }

  return obj;
}
