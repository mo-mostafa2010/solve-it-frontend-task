<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'
import tableHeader from '@components/table-header.vue'
import status from '@components/status.vue'
import formatDate from '@src/utils/format-date'
import axios from 'axios'
export default {
  page: {
    title: 'Users Directory',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, tableHeader, status },
  data() {
    return {
      users: [],
      currentPage: 1,
      limit: 0,
      rows: null,
      loading: false,
      fields: [
        {
          key: 'id',
          label: '#',
        },
        {
          key: 'name',
        },
        {
          key: 'email',
          label: 'Email Address',
        },
        {
          key: 'gender',
        },
        {
          key: 'status',
        },
        {
          key: 'updated_at',
          formatter: (value) => {
            return this.calculatedDate(value)
          },
        },
      ],
    }
  },
  watch: {
    // Fetch user Data at every change of  a page
    currentPage() {
      this.fetchUsers()
    },
  },
  created() {
    // Fetch user Data at compnent creation
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      this.loading = true
      // get all github users in the last 30 days
      axios
        .get(`https://gorest.co.in/public-api/users?page=${this.currentPage}`)
        .then((result) => {
          // Set users Array from response items
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
    handleClick(event) {
      // Naigate the user to the posts page
      this.$router.push(`./posts/${event.id}`)
    },
  },
}
</script>

<template>
  <Layout>
    <div>
      <b-card :class="$style.container + ' mt-4 mb-4'">
        <tableHeader
          title="Users Directory"
          subtitle="Lorem ipsum dolor sit amet consectetur"
          :search="true"
          :limit="limit"
          :rows="rows"
        />
        <b-table
          responsive
          striped
          hover
          :fields="fields"
          :loading="loading"
          :items="users"
          outlined
          @row-clicked="handleClick"
        >
          <template v-slot:cell(status)="data">
            <status :status="data.item.status" />
          </template>
        </b-table>
      </b-card>
    </div>
    <b-overlay :show="loading" no-wrap></b-overlay>
    <!-- Bottom Pagination -->
    <b-pagination
      v-model="currentPage"
      :per-page="limit"
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
