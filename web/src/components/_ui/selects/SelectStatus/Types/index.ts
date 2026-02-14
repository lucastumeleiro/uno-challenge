export type ILeadStatus = 'novo' | 'contactado' | 'qualificado' | 'convertido' | 'perdido'
export type ILeadStatusWithAll = ILeadStatus | 'todos'

export interface ISelectStatusProps {
  label?: string
  error?: string
  required?: boolean
  value?: ILeadStatusWithAll
  onValueChange?: (value: ILeadStatusWithAll) => void
  placeholder?: string
  disabled?: boolean
  includeAll?: boolean | undefined
}

export interface IStatusOption {
  value: ILeadStatusWithAll
  label: string
}
