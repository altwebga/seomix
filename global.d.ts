declare module "*.css"

declare module "bun:test" {
  type MockCall = unknown[]

  interface MockFunction<T extends (...args: never[]) => unknown> {
    (...args: Parameters<T>): ReturnType<T>
    mock: {
      calls: MockCall[]
    }
  }

  export function afterEach(fn: () => void | Promise<void>): void
  export function beforeEach(fn: () => void | Promise<void>): void
  export function describe(name: string, fn: () => void): void
  export function expect(value: unknown): any
  export function mock<T extends (...args: never[]) => unknown>(
    fn: T
  ): MockFunction<T>
  export namespace mock {
    function module(
      specifier: string,
      factory: () => Record<string, unknown>
    ): void
  }
  export function test(name: string, fn: () => void | Promise<void>): void
}
