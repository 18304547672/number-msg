<template>
    <div>
        <app-header></app-header>
        <app-narbar></app-narbar>
        <app-main/>
    </div>
</template>

<script>
import AppHeader from './appHeader'
import AppNarbar from './appNavBar'
import AppMain from './appMain'
export default {
    components:{
        AppHeader,
        AppNarbar,
        AppMain
    }
}
</script>
<style >
    
</style>