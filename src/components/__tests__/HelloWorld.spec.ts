import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })

  it('renders Toto', () => {
    // const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect('toto').toBe('toto')
  })

  it('renders Tata', () => {
    // const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect('tata').toBe('tata')
  })
})
