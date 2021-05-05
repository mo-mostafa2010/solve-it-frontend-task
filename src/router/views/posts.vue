<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'
import formatDate from '@src/utils/format-date'
import userCard from '@components/user-card.vue'
import statsCard from '@components/stats-card.vue'
import tableHeader from '@components/table-header.vue'
import axios from 'axios'
export default {
  page: {
    title: 'Posts',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, tableHeader, userCard, statsCard },
  data() {
    return {
      posts: [],
      currentPage: 1,
      limit: 0,
      rows: null,
      loading: false,
      statFields: [
        {
          key: 'Total No. of posts',
          value: '50',
          color: ' text-red',
        },
        {
          key: 'current page no.',
          value: '20',
          color: ' text-blue',
        },
        {
          key: 'User Creation Date',
          value: '05-05-2021',
        },
        {
          key: 'User Updated Date',
          value: '05-05-2021',
        },
      ],
      fields: [
        {
          key: 'id',
          label: 'Post ID',
          thStyle: 'width: 15%',
        },
        {
          key: 'title',
          label: 'Post Title',
          thStyle: 'width: 20%',
        },
        {
          key: 'body',
          thStyle: 'width: 50%',
        },
      ],
    }
  },
  computed: {
    userId() {
      return this.$route.params.userid
    },
  },
  watch: {
    // Fetch Repo Data at every change of  a page
    currentPage() {
      this.fetchPosts()
    },
  },
  created() {
    // Fetch Repo Data at compnent creation
    this.fetchPosts()
  },
  methods: {
    fetchPosts() {
      this.loading = true
      // get all github posts in the last 30 days
      axios
        .get(
          `https://gorest.co.in/public-api/users/${this.userId}/posts?page=${this.currentPage}`
        )
        .then((result) => {
          // Set posts Array from response items
          this.posts = result.data.data

          // As github api only provide the first 1000 items,
          // Use this workaround to check if the current data is greater than 1000 or not
          this.rows = parseInt(result.data.meta.pagination.total)

          // Set the limit value from value fitched from api
          this.limit = result.data.meta.pagination.limit
          this.loading = false
        })
        .catch((err, message) => {
          // Display the erroe message on alert for user
          window.alert(err.message)
          this.loading = false
        })
    },
    calculatedDate(date) {
      const dateObj = new Date(date)
      return formatDate(dateObj)
    },
    handleClick(event) {
      // Navigate to comments page
      this.$router.push(`/comments/${event.id}`)
    },
  },
}
</script>

<template>
  <Layout>
    <!-- Main Component to be rendered in a card -->
    <b-card :class="$style.container + ' mt-4 mb-4'">
      <!-- Back Button -->
      <BaseBack />
      <!-- Back Button -->

      <!-- User Card  -->
      <userCard />
      <!-- User Card -->
      <hr />
      <!-- Stats Section -->
      <b-row>
        <b-col
          v-for="item in statFields"
          :key="item.key"
          class="m-0 p-0"
          sm="2"
        >
          <statsCard
            :key-name="item.key"
            :value="item.value"
            :text-color="item.color"
          />
        </b-col>
      </b-row>
      <!-- Stats Section -->

      <hr />
      <!-- Table header -->
      <tableHeader
        title="posts Posts"
        subtitle="Lorem ipsum dolor sit amet consectetur"
        :limit="limit"
        :rows="rows"
      />
      <!-- Table header -->

      <!-- Main Table -->
      <b-table
        responsive
        striped
        hover
        :items="posts"
        :loading="loading"
        :fields="fields"
        @row-clicked="handleClick"
      >
        <template v-slot:cell(status)="data">
          <b-icon
            font-scale="0.5"
            variant="success"
            icon="circle-fill"
          ></b-icon>
          {{ data.item.status }}
        </template>
      </b-table>
      <!-- Main Table -->
    </b-card>
    <b-overlay :show="loading" no-wrap></b-overlay>

    <!-- Main Component to be rendered in a card -->
    <!-- Bottom Pagination -->
    <b-pagination
      v-model="currentPage"
      :per-page="30"
      :total-rows="rows"
      align="center"
    />
    <!-- End of Bottom Pagination -->
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.container {
  min-width: $size-content-width-min;
  max-width: $size-content-width-max;
  margin: 0 auto;
}
</style>
