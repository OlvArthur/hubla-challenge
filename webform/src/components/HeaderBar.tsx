import { Fragment } from 'react'

interface HeaderBarProps {
  navigatioTabOptions: string[]
}

export function HeaderBar(props: HeaderBarProps) {
  return (
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      {props.navigatioTabOptions.map((item, itemIdx) =>
        itemIdx === 0 ? (
          <Fragment key={item}>
            <a href="#" key={item} className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
              {item}
            </a>
          </Fragment>
        ) : (
          <a
            key={item}
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            {item}
          </a>
        )
      )}
    </div>
  )
}