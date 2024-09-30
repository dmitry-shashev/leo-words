import { FC } from 'react'
import { readFileSync } from 'node:fs'

function getContent(): Array<string> {
  return readFileSync('./content/pure-content/useful.txt', 'utf-8')
    .split('\n')
    .map((v) => v.trim())
    .filter((v) => !!v)
}

const UsefulPage: FC = () => {
  const arr = getContent()
  return (
    <div className="">
      {arr.map((v, index) => (
        <div className="m-2 p-2 bg-blue-50 border-2 rounded" key={index}>
          {v}
        </div>
      ))}
    </div>
  )
}

export default UsefulPage
