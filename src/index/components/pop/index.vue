<script setup>
import { Notice, Message, DatePicker } from 'view-ui-plus'
import { ref } from 'vue'

const props = defineProps({

})
const form = reactive({

})
const init = ()=>{

}
defineExpose({
    init
});
onMounted(()=>{
    init()
})
</script>

<template>
    <div class="vote-form-box"></div>
</template>

<style lang="scss" scoped>
</style>
