import type { TextContent } from '../../types'

const TextContentComponent = ({ content }: { content: TextContent }) => (
  <div className="prose prose-sm max-w-none">
    <p className="text-text-primary">{content.text}</p>
    {content.highlights && content.highlights.length > 0 && (
      <ul className="list-disc list-inside mt-3 space-y-1">
        {content.highlights.map((highlight, index) => (
          <li key={index} className="text-text-secondary text-sm">
            {highlight}
          </li>
        ))}
      </ul>
    )}
  </div>
)

export default TextContentComponent
