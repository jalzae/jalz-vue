type headers = {
  name: string,
  cursor?: boolean
  cursor_visible?: boolean
}

type actions = {
  model?: string
  icon?: string
  action: string
  text?: string
  class?: string
}

type button = {
  id: string
  model: string
  action: string
  icon: string
  class: string
  text: string
  actionFalse: string
  iconFalse: string
  classFalse: string
  textFalse: string
  status?: boolean
}

type Tables = {
  header: headers[]
  body?: string[]
  action?: actions[]
  action2?: actions[]
  image?: any[]
  vhtml?: any[]
  class?: string
  hitAction?: string
  button?: button[]
}

export type {
  Tables, headers, actions, button
}