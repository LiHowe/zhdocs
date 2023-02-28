export const testData = {
  root: {
    name: "root",
    children: [
      {
        name: "child-1",
        children: [
          {
            name: "child-1-1",
          },
          {
            name: "child-1-2",
            children: [
              {
                name: "child-1-2-1",
              },
            ],
          },
        ],
      },
      {
        name: "child-2",
      },
      {
        name: "child-3",
      },
      {
        name: "child-4",
        children: [
          {
            name: "child-4-1",
          },
          {
            name: "child-4-2",
          },
        ],
      },
    ],
  },
  links: [
    {
      source: "child-1-1",
      name: "special link",
      target: "child-2",
    },
  ],
};
