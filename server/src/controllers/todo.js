let todos = [
  {
    id: 1,
    title: "Belajar Express",
    isDone: false,
  },
  {
    id: 2,
    title: "Belajar Node.js",
    isDone: true,
  },
];

exports.getTodos = (req, res) => {
  res.send({
    status: "success",
    message: "Todo Succesfully Get",
    data: {
      todos,
    },
  });
};

exports.detailTodo = (req, res) => {
  const { id } = req.params;

  const todo = todos.find((todo) => todo.id == id);

  if (!todo) {
    return res.status(401).send({
      status: "failed",
      message: `Todo with id: ${id} not existed`,
      data: {
        todo,
      },
    });
  }

  res.send({
    status: "success",
    message: "Todo Succesfully Get",
    data: {
      todo,
    },
  });
};

exports.addTodo = (req, res) => {
  const { body } = req;
  console.log("ini files", req.files);
  const idRandom = Math.random() * 100;

  todos = [
    ...todos,
    {
      id: idRandom,
      ...body,
    },
  ];

  res.send({
    status: "success",
    message: "Todo Succesfully Added",
    data: {
      todo: {
        id: idRandom,
        ...body,
      },
    },
  });
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const todo = todos.find((todo) => todo.id == id);

  if (!todo) {
    return res.status(401).send({
      status: "failed",
      message: `Todo with id: ${id} not existed`,
      data: {
        todo,
      },
    });
  }

  //awda

  const updatedTodos = todos.map((todo) => {
    return todo.id == id
      ? {
          id,
          ...body,
        }
      : todo;
  });

  todos = updatedTodos;

  res.send({
    status: "success",
    message: "Todo Succesfully Updated",
    data: {
      todo: {
        id,
        ...body,
      },
    },
  });
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;

  const newTodos = todos.filter((todo) => todo.id == id);

  todos = newTodos;

  res.send({
    status: "success",
    message: "Todo Succesfully Deleted",
  });
};
