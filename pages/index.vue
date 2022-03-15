<template>
    <div class="publications">
        <h3 class="publications-title">All publications</h3>
        <div class="search">
          <input type="text" placeholder="search by name" v-model="poisk.title">
          <ButtonMini @click="search">Search</ButtonMini>
        </div>
        <div class="publication" v-for="publication, index in publications"
        :key="index">
            <div class="publication-container">
              <h4 class="publication-title">{{publication.title}}</h4>
              <p class="publication-content">{{publication.content}}</p>
              <p class="publication-author">Author: {{publication.author}}</p>
              <a :href='publication.id'>Change or delete</a>
            </div>
    </div>
    <a href='create' style="margin-top: 5vh;">NewPublication</a>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  ref
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $axios } = useContext()
    
    const publications = ref([])

    const poisk = ref({
      title: ""
    } as any)

    $axios.get('/v1/publications').then((data) => publications.value = data.data)
    const search = async ({}) => {
      await $axios.get(`/v1/search-publication`, poisk.value).then((data)=>publications.value = data.data)
      
    }
    return { publications, poisk, search }
  },
})
</script>
