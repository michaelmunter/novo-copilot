import type { TableContent } from '../../types'

const TableContentComponent = ({ content }: { content: TableContent }) => (
  <div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {content.headers.map((header, index) => (
              <th
                key={index}
                className="text-left p-2 font-medium text-text-primary"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-border hover:bg-bg-secondary"
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-2 text-text-primary">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {content.summary && (
      <p className="text-xs text-text-secondary mt-3 p-2 bg-bg-secondary rounded">
        {content.summary}
      </p>
    )}
  </div>
)

export default TableContentComponent
