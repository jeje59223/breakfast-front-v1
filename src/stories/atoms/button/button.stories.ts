import Button from '../../../components/atoms/button/Button.vue'

export default {
    title: "Atoms/Button",
    component: Button
}

const Template = (args: any) => ({
    components: {Button},
    setup() {
        return {args};
    },
    template: '<Button v-bind="args" />'
})

export const ButtonOutlined = Template.bind({});
ButtonOutlined.args = {
    variant: 'outlined',
    color: '#1abc9c',
    text: 'Chipolatas'
}

export const ButtonOutlinedWithRightIcon = Template.bind({});
ButtonOutlinedWithRightIcon.args = {
    variant: 'outlined',
    color: '#1abc9c',
    text: 'Chipolatas',
    withIcon: true,
    rightIcon: true,
    icon: 'mdi-heart',
    tnrId: 'Chipolatas-Button'
}

export const ButtonSimple = Template.bind({});
ButtonSimple.args = {
    variant: 'elevated',
    color: 'pink',
    size: 'small',
    text: 'Merguez'
}

export const ButtonSimpleWithLeftIcon = Template.bind({});
ButtonSimpleWithLeftIcon.args = {
    variant: 'elevated',
    color: '#34495e',
    size: 'x-large',
    text: 'Merguez',
    withIcon: true,
    leftIcon: true,
    icon: 'mdi-arrow-left'
}

export const ButtonSimpleWithRightIcon = Template.bind({});
ButtonSimpleWithRightIcon.args = {
    variant: 'elevated',
    color: '#34495e',
    size: 'x-large',
    text: 'Merguez',
    withIcon: true,
    rightIcon: true,
    icon: 'mdi-cancel'
}
