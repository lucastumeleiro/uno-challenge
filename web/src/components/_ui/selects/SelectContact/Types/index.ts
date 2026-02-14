export interface IContact {
  id: string
  name: string
  email: string
}

export interface ISelectContactProps {
  label?: string
  error?: string
  required?: boolean
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  contacts: IContact[]
  emptyMessage?: string
}
