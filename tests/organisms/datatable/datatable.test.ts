import { test, expect, describe, beforeAll, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import DataTable from '../../../src/components/organisms/data-table/DataTable.vue'
import { userMoke } from '../../data/user'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useRouter } from 'vue-router'
import { nextTick } from 'vue'

vi.mock('vue-router')

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('Datatable', () => {
    let wrapper: VueWrapper
    let vm: any

    // @ts-ignore eslint-disable-line
    vi.mocked(useRouter).mockReturnValue({
        push: vi.fn()
    })

    beforeAll(() => {
        setActivePinia(createPinia())
    })

    beforeEach(() => {
        wrapper = mount(DataTable, {
            global: {
                plugins: [vuetify, createTestingPinia()],
                mocks: {
                    router: {
                        push: vi.fn()
                    }
                }
            },
            props: {
                users: [userMoke]
            }
        }) as VueWrapper

        vm = wrapper.vm as any
    })
    test('Should update user', async () => {
        await vm.getUserId('1', 'Tue Mar 26 2024 00:00:00 GMT+0100 (heure normale d’Europe centrale)')

        expect(vm.getUserByLdap).toBeCalledWith('1')
    })

    test('Should redirect to account page', async () => {
        await vm.updateAccount('1', 'updateAccount')
        await nextTick()
        await flushPromises()

        expect(useRouter().push).toHaveBeenCalledTimes(1)
        expect(useRouter().push).toHaveBeenCalledWith({
            name: 'account',
            params: { ldap: '1' }
        })
    })
})
