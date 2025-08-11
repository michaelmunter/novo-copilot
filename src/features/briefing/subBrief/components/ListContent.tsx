import type { ListContent } from '../../types'

const ListContentComponent = ({ content }: { content: ListContent }) => (
  <ul className="space-y-2">
    {content.map((item, index) => (
      <li key={index} className="flex items-start">
        <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
        <span className="text-text-primary">{item}</span>
      </li>
    ))}
  </ul>
)

export default ListContentComponent
