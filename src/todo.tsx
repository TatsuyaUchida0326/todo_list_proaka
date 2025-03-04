import React, { useState } from 'react';

// "Todo" 型の定義
type Todo = {
  content: string;
  readonly id: number;
};

// Todo コンポーネントの定義
const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Todo の配列を保持するステート
  const [text, setText] = useState(''); // フォーム入力のためのステート
  const [nextId, setNextId] = useState(1); // 次の Todo の ID を保持するステート

  // 新しい Todo を追加する関数
  const handleSubmit = () => {
    if (!text) return;

    // 新しい Todo を作成
    const newTodo: Todo = {
      content: text,
      id: nextId,
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]); // todos ステートを更新
    setNextId(nextId + 1); // 次の ID を更新
    setText(''); // フォーム入力をクリア
  };

  // Todo の内容を編集する関数
  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          // 新しいオブジェクトを作成して返す
          return { ...todo, content: value };
        }
        return todo;
      });
  
  
      // todos ステートが書き換えられていないかチェック
      console.log('=== Original todos ===');
      todos.map((todo) => {
        console.log(`id: ${todo.id}, content: ${todo.content}`);
      });
  
  
      return newTodos;
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" value="追加" />
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.content}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
