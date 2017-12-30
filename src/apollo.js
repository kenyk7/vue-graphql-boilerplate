import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import {GC_ID_PROYECT, AUTH_TOKEN_NAME} from './consts'

const GC_AUTH_TOKEN = 'Bearer ' + localStorage.getItem(AUTH_TOKEN_NAME)

// YOUR_GRAPH_QL_ENDPOINT_HERE
const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/' + GC_ID_PROYECT, {
  reconnect: true,
  connectionParams: {
    authToken: GC_AUTH_TOKEN
  }
})

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/' + GC_ID_PROYECT
})

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {
        Authorization: GC_AUTH_TOKEN
      }
    }
    req.options.headers['x-graphcool-source'] = 'app:SimpleBlog'
    next()
  }
}])

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  connectToDevTools: true,
  dataIdFromObject: o => o.id
})

export default client
