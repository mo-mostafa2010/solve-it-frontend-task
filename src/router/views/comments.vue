<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'
import userCard from '@components/user-card.vue'
import commentsCard from '@components/comments-card.vue'
import tableHeader from '@components/table-header.vue'
import formatDate from '@src/utils/format-date'
import axios from 'axios'
export default {
  page: {
    title: 'Users',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, tableHeader, userCard, commentsCard },
  data() {
    return {
      users: [],
      currentPage: 1,
      limit: 0,
      loading: false,
      rows: null,
      fields: [
        {
          key: 'id',
          label: 'Post ID',
          thStyle: 'width: 15%',
        },
        {
          key: 'name',
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
    postId() {
      return this.$route.params.postid
    },
  },
  watch: {
    // Fetch Repo Data at every change of  a page
    currentPage() {
      this.fetchRepos()
    },
  },
  created() {
    // Fetch Repo Data at compnent creation
    this.fetchRepos()
  },
  methods: {
    fetchRepos() {
      this.loading = true
      // get all github repos in the last 30 days
      axios
        .get(
          `https://gorest.co.in/public-api/posts/${this.postId}/comments?page=${this.currentPage}`
        )
        .then((result) => {
          // Set repos Array from response items
          this.users = result.data.data

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
  },
}
</script>

<template>
  <Layout>
    <div>
      <b-card :class="$style.container + ' mt-4 mb-4'">
        <!-- Back Button -->
        <BaseBack />
        <!-- Back Button -->

        <!-- User Card  -->
        <userCard />
        <!-- User Card -->
        <hr />
        <commentsCard />
        <hr /> <hr />

        <tableHeader
          title="Users Comments"
          subtitle="Lorem ipsum dolor sit amet consectetur"
          search="true"
          :limit="limit"
          :rows="rows"
        />
        <b-table responsive striped hover :items="users" :fields="fields">
          <template v-slot:cell(status)="data">
            <b-icon
              font-scale="0.5"
              variant="success"
              icon="circle-fill"
            ></b-icon>
            {{ data.item.status }}
          </template>
        </b-table>
      </b-card>
    </div>
    <b-overlay :show="loading" no-wrap></b-overlay>

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
