// import all the primevue components you need here

import {
    defineNuxtPlugin
} from "#app"
import PrimeVue from "primevue/config"
import Button from "primevue/button"
import Tag from "primevue/tag"
import Message from "primevue/message"
import Card from 'primevue/card'
import Tooltip from 'primevue/tooltip'
import Divider from 'primevue/divider'
import ProgressSpinner from 'primevue/progressspinner'
import Sidebar from 'primevue/sidebar';
import Breadcrumb from 'primevue/breadcrumb';
import Paginator from 'primevue/paginator';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import FileUpload from 'primevue/fileupload';
import AutoComplete from 'primevue/autocomplete';

export default defineNuxtPlugin( ( nuxtApp ) => {
    nuxtApp.vueApp.use( PrimeVue, {
        ripple: true
    } )
    nuxtApp.vueApp.component( 'Button', Button )
    nuxtApp.vueApp.component( 'Tag', Tag )
    nuxtApp.vueApp.component( 'Message', Message )
    nuxtApp.vueApp.component( 'Card', Card )
    nuxtApp.vueApp.component( 'Tooltip', Tooltip )
    nuxtApp.vueApp.directive( 'tooltip', Tooltip )
    nuxtApp.vueApp.component( 'Divider', Divider )
    nuxtApp.vueApp.component( 'ProgressSpinner', ProgressSpinner )
    nuxtApp.vueApp.component( 'Sidebar', Sidebar )
    nuxtApp.vueApp.component( 'Breadcrumb', Breadcrumb )
    nuxtApp.vueApp.component( 'Paginator', Paginator )
    nuxtApp.vueApp.component( 'InputText', InputText )
    nuxtApp.vueApp.component( 'Checkbox', Checkbox )
    nuxtApp.vueApp.component( 'FileUpload', FileUpload )
    nuxtApp.vueApp.component( 'AutoComplete', AutoComplete )
} )