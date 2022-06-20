import { ElForm } from 'element-plus'
import { FormItemRule } from 'element-plus/es/tokens/form'

export type IElForm = InstanceType<typeof ElForm>

export type IFormRule = Record<string, FormItemRule[]>
