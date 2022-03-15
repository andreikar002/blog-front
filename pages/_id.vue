<template>
    <div class="creating">
      <div class="creating-form">
        <input type="text" placeholder="title" v-model="publicationData.title">
        <textarea type="text" placeholder="content" class="creating-content" v-model="publicationData.content"></textarea>
        <input type="text" placeholder="Your name" v-model="publicationData.author">
        <ButtonMini @click="savePublication">Save</ButtonMini>
        <ButtonMini @click="deletePublication">Delete</ButtonMini>
      </div>
      <a href="/">Blog</a>
    </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  ref
} from '@nuxtjs/composition-api'

export default defineComponent({
    computed: {
        id() {
         return this.$route.params.id;
        },
    },
  setup() {
    const { $axios } = useContext()
    
    const publication = ref()
    
    const publicationData = ref({
      id: 0,
      title: '',
      content: '',
      author: ''
    } as any)
    
    const url = window.location.href;
    const lastParam = url.split("/").slice(-1)[0];

    $axios.get(`/v1/publication/${lastParam}`).then((data) => publicationData.value = data.data)

    const deletePublication = async ({}) => {
      await $axios.delete(`/v1/publication/${lastParam}`, publicationData.value)
      document.location.href="/"
    }

    const savePublication = async ({}) => {
      await $axios.put(`/v1/publication/${lastParam}`, publicationData.value)
      document.location.href="/"
    }

    return { publication, deletePublication, savePublication, publicationData }
  },
})
</script>
