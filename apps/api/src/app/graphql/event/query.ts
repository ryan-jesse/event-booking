import { GraphQLFieldConfig, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";

import { getEvent, getEvents } from "./data";
import { Event } from './type'

// TODO: workout how GraphQLFieldConfig types work
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GetEvent: GraphQLFieldConfig<any, any, any> = {
  type: Event,
  description: Event.description,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'The event id'
    }
  },
  resolve: (source, args) => {
    return getEvent(args.id);
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ListEvents: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLList(Event),
  description: Event.description,
  resolve: () => {
    return getEvents();
  }
};

export const EventQuery = new GraphQLObjectType({
  name: 'EventQuery',
  description: 'The event base query',
  fields: {
    get: GetEvent,
    list: ListEvents
  }
});
