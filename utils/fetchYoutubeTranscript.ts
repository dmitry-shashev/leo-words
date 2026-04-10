import { readFileSync } from 'fs'
import path from 'path'
import { createRequire } from 'module'
import { pathToFileURL } from 'url'

type TranscriptItem = {
  text: string
  duration: number
  offset: number
  lang?: string
}

type YoutubeTranscriptModule = {
  fetchTranscript: (videoId: string) => Promise<Array<TranscriptItem>>
}

const require = createRequire(import.meta.url)

async function loadYoutubeTranscriptModule(): Promise<YoutubeTranscriptModule> {
  const packageJsonPath = require.resolve('youtube-transcript/package.json')
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as {
    module?: string
  }

  if (!packageJson.module) {
    throw new Error('youtube-transcript does not expose an ESM module entry')
  }

  const modulePath = path.resolve(
    path.dirname(packageJsonPath),
    packageJson.module
  )
  return (await import(
    pathToFileURL(modulePath).href
  )) as YoutubeTranscriptModule
}

export async function fetchYoutubeTranscript(
  videoId: string
): Promise<Array<TranscriptItem>> {
  const { fetchTranscript } = await loadYoutubeTranscriptModule()
  return fetchTranscript(videoId)
}
