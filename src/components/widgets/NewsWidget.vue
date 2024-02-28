<template>
  <div class="news-feed-widget">
    <h2>Latest News</h2>
    <ul>
      <li v-for="article in articles" :key="article.url">
        <a :href="article.url" target="_blank">{{ article.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NewsFeedWidget',
  data() {
    return {
      articles: [],
    };
  },
  async mounted() {
    await this.fetchNews();
  },
  methods: {
    async fetchNews() {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY');
        const data = await response.json();
        this.articles = data.articles;
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    },
  },
};
</script>

<style scoped>
.news-feed-widget {
  /* Widget styling */
}
</style>
