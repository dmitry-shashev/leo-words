'use client'

import { FC, useEffect, useState } from 'react'
import { Debug } from '@/utils/debug'

const DebugPage: FC = () => {
  const [info, setInfo] = useState('')

  useEffect(() => {
    setInfo(Debug.getInfo())
  }, [])

  return <pre>{info}</pre>
}

export default DebugPage
