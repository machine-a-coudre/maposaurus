export type Mtheme = {
  label: string
  abstract: string
  link: string
  layers?: Record<string, string>
  themes?: Mtheme[]
}

export type MConfigThemes = {
  themes: Mtheme[]
}

export async function loadThemes(): Promise<Mtheme[]> {
  const response = await fetch('data/themes.json')

  if (!response.ok) {
    throw new Error(`${response.status}`)
  }

  const data = await response.json()

  // TODO: cache
  return data.themes
}
