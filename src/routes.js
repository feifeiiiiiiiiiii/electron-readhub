const TopicView = () => import('./renderer/Topic.vue')

let routes = [ {
  path: '/',
  component: TopicView,
  name: 'topic'
}]

export default routes
