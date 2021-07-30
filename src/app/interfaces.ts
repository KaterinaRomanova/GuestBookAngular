export interface Post{
  title: string,
  message: string,
  id?:number,
  user?:User,
  created_at?:Date
}

export interface User{
  email: string,
  password: string,
  password_confirmation?: string,
  name?: string,
  id?: number,
  token?:Token,
  avatar?: FormData,
  is_admin?: number
}

export interface Comment{
  message: string,
  id?:number,
  user?:User,
  created_at?:Date
}

export interface Token{
  access_token:string
}

export interface Meta{
  currentPage: number,
  from: number,
  last_page: number,
  to: number,
  total: number,
  path: string,
  per_page: number
}

export interface Links{
  first: string,
  last: string,
  next: string,
  prev: string
}
