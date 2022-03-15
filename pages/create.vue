<template>
    <div class="creating">
        <h1>Creating publication</h1>
        <div class="creating-form">
            <input type="text" placeholder="title" v-model="publicationData.title">
            <textarea type="text" class="creating-content" placeholder="content" v-model="publicationData.content"></textarea>
            <input type="text" placeholder="Your name" v-model="publicationData.author">
            <ButtonMini @click="createPublication">Create</ButtonMini>
        </div>
        <a href="/">Blog</a>
    </div>
</template>
<script lang="ts">
import {
  defineComponent, ref, useContext, useRouter, useStore,
} from '@nuxtjs/composition-api'
import Button from '~/components/components/Button.vue'

export default defineComponent({
  components: { Button },
  setup() {
    const router = useRouter()
    const { $axios } = useContext()

    const publicationData = ref({
      title: '',
      content: '',
      author: ''
    } as any)

    const createPublication = async () => {
      await $axios.post('/v1/publication', publicationData.value)
      document.location.href="/"
    }
    
    return { publicationData, createPublication }
  },
})
</script>
