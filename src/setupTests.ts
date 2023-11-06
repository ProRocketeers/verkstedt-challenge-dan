import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'
import { rowsTestData } from './utils/__tests__/rows.testData'

export const restHandlers = [
  http.get('https://api.github.com/search/repositories', () => {
    return HttpResponse.json(rowsTestData.data, { status: 200 })
  }),
]

const server = setupServer(...restHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

afterEach(() => server.resetHandlers())
