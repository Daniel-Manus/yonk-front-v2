import MarkdownIt from 'markdown-it';

const markdownIt = new MarkdownIt();

export const useMarkdown = () => {
  const md = (text: string) => {
    return markdownIt.render(text);
  };

  return {
    md
  };
};
