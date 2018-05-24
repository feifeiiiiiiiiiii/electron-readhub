const TopicView = () => import('./renderer/Topic.vue')
const NewsView = () => import('./renderer/News.vue')
const TechView = () => import('./renderer/Tech.vue')
const BlockchainView = () => import('./renderer/Blockchain.vue')
const JobsView = () => import('./renderer/Jobs.vue')

let routes = [ {
  path: '/',
  component: TopicView,
  name: 'topic'
}, {
  path: '/news',
  component: NewsView,
  name: 'news'
}, {
  path: '/tech',
  component: TechView,
  name: 'tech'
}, {
  path: '/blockchain',
  component: BlockchainView,
  name: 'blockchain'
}, {
  path: '/jobs',
  component: JobsView,
  name: 'jobs'
}]

export default routes
