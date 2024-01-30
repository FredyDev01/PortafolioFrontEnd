<template>
  <ul
    v-show="listPages.length"
    class="flex justify-center text-gray-700 dark:text-white font-Maven text-xs"
    @click="clickPage($event)"
  >
    <li>
      <button
        class="px-3 py-2 mx-1 bg-gray-100 dark:bg-Prt260 transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md inline-flex items-center cursor-pointer text-indigo-500 dark:text-emerald-600"
        data-showpage="1"
        :disabled="page === 1"
      >
        <i class="fas fa-angle-double-left table-cell align-middle text-xxs" />
      </button>
    </li>
    <li v-for="showPage in listPages" :key="showPage">
      <button
        class="px-3 py-2 mx-1 border-2 rounded-md inline-flex items-center cursor-pointer"
        :class="[
          showPage == page
            ? 'bg-indigo-500 dark:bg-emerald-600 border-indigo-500 dark:border-emerald-600 text-white'
            : 'bg-gray-100 dark:bg-Prt260 transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600',
        ]"
        :data-showpage="showPage"
      >
        {{ showPage }}
      </button>
    </li>
    <li>
      <button
        class="px-3 py-2 mx-1 bg-gray-100 dark:bg-Prt260 transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md inline-flex items-center cursor-pointer text-indigo-500 dark:text-emerald-600"
        :data-showpage="maxPage"
        :disabled="page === maxPage"
      >
        <i class="fas fa-angle-double-right table-cell align-middle text-xxs" />
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CmpPaginator',
  props: {
    page: { type: Number, default: 1 },
    maxPage: { type: Number, default: 1 },
  },
  emits: ['changePag'],
  data() {
    return {
      listPages: [],
    }
  },
  watch: {
    maxPage: {
      handler() {
        this.listPage()
      },
    },
  },
  mounted() {
    if (this.maxPage) {
      this.listPage()
    }
  },
  methods: {
    clickPage(e) {
      if (e.target.tagName === 'BUTTON') {
        let { showpage } = e.target.dataset
        showpage = parseInt(showpage)
        this.$emit('changePag', showpage)
      }
    },
    listPage() {
      if (this.page <= this.maxPage) {
        const listPages = [this.page]
        let before = this.page
        let after = this.page
        do {
          before -= 1
          after += 1
          if (before > 0) {
            listPages.push(before)
          }
          if (after <= this.maxPage) {
            listPages.push(after)
          }
        } while ((this.maxPage >= 3 ? 3 : this.maxPage) !== listPages.length)
        listPages.sort()
        this.listPages = listPages
      } else {
        this.listPages = []
      }
    },
  },
}
</script>
