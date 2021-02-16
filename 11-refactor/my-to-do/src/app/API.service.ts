/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type CreateTodoInput = {
  id?: string | null;
  title: string;
  due?: string | null;
  memo?: string | null;
  done?: boolean | null;
  userId: string;
};

export type ModelTodoConditionInput = {
  title?: ModelStringInput | null;
  due?: ModelStringInput | null;
  memo?: ModelStringInput | null;
  done?: ModelBooleanInput | null;
  userId?: ModelStringInput | null;
  and?: Array<ModelTodoConditionInput | null> | null;
  or?: Array<ModelTodoConditionInput | null> | null;
  not?: ModelTodoConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Todo = {
  __typename: "Todo";
  id?: string;
  title?: string;
  due?: string | null;
  memo?: string | null;
  done?: boolean | null;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  owner?: string | null;
};

export type UpdateTodoInput = {
  id: string;
  title?: string | null;
  due?: string | null;
  memo?: string | null;
  done?: boolean | null;
  userId?: string | null;
};

export type DeleteTodoInput = {
  id?: string | null;
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  due?: ModelStringInput | null;
  memo?: ModelStringInput | null;
  done?: ModelBooleanInput | null;
  userId?: ModelStringInput | null;
  and?: Array<ModelTodoFilterInput | null> | null;
  or?: Array<ModelTodoFilterInput | null> | null;
  not?: ModelTodoFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection";
  items?: Array<Todo | null> | null;
  nextToken?: string | null;
};

export type SearchableTodoFilterInput = {
  id?: SearchableIDFilterInput | null;
  title?: SearchableStringFilterInput | null;
  due?: SearchableStringFilterInput | null;
  memo?: SearchableStringFilterInput | null;
  done?: SearchableBooleanFilterInput | null;
  userId?: SearchableStringFilterInput | null;
  and?: Array<SearchableTodoFilterInput | null> | null;
  or?: Array<SearchableTodoFilterInput | null> | null;
  not?: SearchableTodoFilterInput | null;
};

export type SearchableIDFilterInput = {
  ne?: string | null;
  gt?: string | null;
  lt?: string | null;
  gte?: string | null;
  lte?: string | null;
  eq?: string | null;
  match?: string | null;
  matchPhrase?: string | null;
  matchPhrasePrefix?: string | null;
  multiMatch?: string | null;
  exists?: boolean | null;
  wildcard?: string | null;
  regexp?: string | null;
  range?: Array<string | null> | null;
};

export type SearchableStringFilterInput = {
  ne?: string | null;
  gt?: string | null;
  lt?: string | null;
  gte?: string | null;
  lte?: string | null;
  eq?: string | null;
  match?: string | null;
  matchPhrase?: string | null;
  matchPhrasePrefix?: string | null;
  multiMatch?: string | null;
  exists?: boolean | null;
  wildcard?: string | null;
  regexp?: string | null;
  range?: Array<string | null> | null;
};

export type SearchableBooleanFilterInput = {
  eq?: boolean | null;
  ne?: boolean | null;
};

export type SearchableTodoSortInput = {
  field?: SearchableTodoSortableFields | null;
  direction?: SearchableSortDirection | null;
};

export enum SearchableTodoSortableFields {
  id = "id",
  title = "title",
  due = "due",
  memo = "memo",
  done = "done",
  userId = "userId"
}

export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc"
}

export type SearchableTodoConnection = {
  __typename: "SearchableTodoConnection";
  items?: Array<Todo | null> | null;
  nextToken?: string | null;
  total?: number | null;
};

export type CreateTodoMutation = {
  __typename: "Todo";
  id: string;
  title: string;
  due?: string | null;
  memo?: string | null;
  done?: boolean | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateTodoMutation = {
  __typename: "Todo";
  id: string;
  title: string;
  due?: string | null;
  memo?: string | null;
  done?: boolean | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type DeleteTodoMutation = {
  __typename: "Todo";
  id: string;
  title: string;
  due?: string | null;
  memo?: string | null;
  done?: boolean | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type GetTodoQuery = {
  __typename: "Todo";
  id: string;
  title: string;
  due?: string | null;
  memo?: string | null;
  done?: boolean | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ListTodosQuery = {
  __typename: "ModelTodoConnection";
  items?: Array<{
    __typename: "Todo";
    id: string;
    title: string;
    due?: string | null;
    memo?: string | null;
    done?: boolean | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null> | null;
  nextToken?: string | null;
};

export type SearchTodosQuery = {
  __typename: "SearchableTodoConnection";
  items?: Array<{
    __typename: "Todo";
    id: string;
    title: string;
    due?: string | null;
    memo?: string | null;
    done?: boolean | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null> | null;
  nextToken?: string | null;
  total?: number | null;
};

export type OnCreateTodoSubscription = {
  __typename: "Todo";
  id: string;
  title: string;
  due?: string | null;
  memo?: string | null;
  done?: boolean | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnUpdateTodoSubscription = {
  __typename: "Todo";
  id: string;
  title: string;
  due?: string | null;
  memo?: string | null;
  done?: boolean | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnDeleteTodoSubscription = {
  __typename: "Todo";
  id: string;
  title: string;
  due?: string | null;
  memo?: string | null;
  done?: boolean | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateTodo(
    input: CreateTodoInput,
    condition?: ModelTodoConditionInput
  ): Promise<CreateTodoMutation> {
    const statement = `mutation CreateTodo($input: CreateTodoInput!, $condition: ModelTodoConditionInput) {
        createTodo(input: $input, condition: $condition) {
          __typename
          id
          title
          due
          memo
          done
          userId
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateTodoMutation>response.data.createTodo;
  }
  async UpdateTodo(
    input: UpdateTodoInput,
    condition?: ModelTodoConditionInput
  ): Promise<UpdateTodoMutation> {
    const statement = `mutation UpdateTodo($input: UpdateTodoInput!, $condition: ModelTodoConditionInput) {
        updateTodo(input: $input, condition: $condition) {
          __typename
          id
          title
          due
          memo
          done
          userId
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateTodoMutation>response.data.updateTodo;
  }
  async DeleteTodo(
    input: DeleteTodoInput,
    condition?: ModelTodoConditionInput
  ): Promise<DeleteTodoMutation> {
    const statement = `mutation DeleteTodo($input: DeleteTodoInput!, $condition: ModelTodoConditionInput) {
        deleteTodo(input: $input, condition: $condition) {
          __typename
          id
          title
          due
          memo
          done
          userId
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteTodoMutation>response.data.deleteTodo;
  }
  async GetTodo(id: string): Promise<GetTodoQuery> {
    const statement = `query GetTodo($id: ID!) {
        getTodo(id: $id) {
          __typename
          id
          title
          due
          memo
          done
          userId
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetTodoQuery>response.data.getTodo;
  }
  async ListTodos(
    filter?: ModelTodoFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListTodosQuery> {
    const statement = `query ListTodos($filter: ModelTodoFilterInput, $limit: Int, $nextToken: String) {
        listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            title
            due
            memo
            done
            userId
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListTodosQuery>response.data.listTodos;
  }
  async SearchTodos(
    filter?: SearchableTodoFilterInput,
    sort?: SearchableTodoSortInput,
    limit?: number,
    nextToken?: string,
    from?: number
  ): Promise<SearchTodosQuery> {
    const statement = `query SearchTodos($filter: SearchableTodoFilterInput, $sort: SearchableTodoSortInput, $limit: Int, $nextToken: String, $from: Int) {
        searchTodos(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken, from: $from) {
          __typename
          items {
            __typename
            id
            title
            due
            memo
            done
            userId
            createdAt
            updatedAt
            owner
          }
          nextToken
          total
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (sort) {
      gqlAPIServiceArguments.sort = sort;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (from) {
      gqlAPIServiceArguments.from = from;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SearchTodosQuery>response.data.searchTodos;
  }
  OnCreateTodoListener: Observable<
    SubscriptionResponse<OnCreateTodoSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateTodo($owner: String!) {
        onCreateTodo(owner: $owner) {
          __typename
          id
          title
          due
          memo
          done
          userId
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateTodoSubscription>>;

  OnUpdateTodoListener: Observable<
    SubscriptionResponse<OnUpdateTodoSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateTodo($owner: String!) {
        onUpdateTodo(owner: $owner) {
          __typename
          id
          title
          due
          memo
          done
          userId
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateTodoSubscription>>;

  OnDeleteTodoListener: Observable<
    SubscriptionResponse<OnDeleteTodoSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteTodo($owner: String!) {
        onDeleteTodo(owner: $owner) {
          __typename
          id
          title
          due
          memo
          done
          userId
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteTodoSubscription>>;
}
