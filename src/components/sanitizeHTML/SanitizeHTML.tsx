import DOMPurify, { Config } from 'dompurify';

type SanitizeNode = Node | string;

interface SanitizeHTMLProps {
  node: SanitizeNode,
  options?: Config
}

const defaultOptions: Config = {
  ALLOWED_TAGS: ['span', 'p', 'strong', 'a'],
  ALLOWED_ATTR: ['href']
}

const sanitize = (dirty: SanitizeNode , options: Config) => ({
  __html: DOMPurify.sanitize(
    dirty,
    {
      ...defaultOptions,
      ...options
    }
  )
})

const SanitizeHTML = ({
  node,
  options
}: SanitizeHTMLProps) => {
  const customOptions = {...options}
  return (
    <span dangerouslySetInnerHTML={sanitize(node, customOptions)} />
  )
};

export { SanitizeHTML }