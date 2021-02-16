import { ToDo } from "./todo.model";

const todos: ToDo [] = [
  {
    id: 'todo1',
    title: '部屋の掃除',
    due: new Date(2021, 1, 28),
    done: false,
    memo: '１０分で終わらせる'
  },
  {
    id: 'todo2',
    title: 'ゴミ捨て',
    due: new Date(2021, 9, 31),
    done: false,
    memo: 'びん・缶'
  },
  {
    id: 'todo3',
    title: '風呂の掃除',
    due: new Date(2021, 9, 31),
    done: false,
    memo: '１０分で終わらせる'
  },
  {
    id: 'todo4',
    title: '屋根の掃除',
    due: new Date(2021, 9, 31),
    done: false,
    memo: '１０分で終わらせる'
  },
  {
    id: 'todo5',
    title: '窓の掃除',
    due: new Date(2021, 9, 31),
    done: false,
    memo: '１０分で終わらせる'
  },
  {
    id: 'todo6',
    title: '犬小屋の掃除',
    due: new Date(2021, 9, 31),
    done: false,
    memo: '１０分で終わらせる'
  },
  {
    id: 'todo7',
    title: '朝飯を食う',
    due: new Date(2021, 9, 31),
    done: true,
    memo: '３０分で食う'
  },
  {
    id: 'todo8',
    title: '昼飯を食う',
    due: new Date(2021, 9, 31),
    done: true,
    memo: '３０分で食う'
  },
  {
    id: 'todo9',
    title: '晩飯を食う',
    due: new Date(2021, 9, 31),
    done: true,
    memo: '３０分で食う'
  }
].map(todo => new ToDo(todo));

export default todos;
