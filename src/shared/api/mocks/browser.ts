import { setupWorker } from 'msw/browser'
import { authHandlers } from './handlers/auth'
import { machinesHandlers } from './handlers/auto'

export const worker = setupWorker(...authHandlers, ...machinesHandlers)
